'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge, getStatusType } from '@/components/ui/status-badge'

type WorkStatus = '대기' | '진행중' | '완료'

interface WorkOrder {
  id: string
  작업번호: string
  거래처: string
  제품명: string
  수량: number
  색상: string
  작업상태: WorkStatus
  납기일: string
}

const mockWorks: WorkOrder[] = [
  { id: '1', 작업번호: 'WO-001', 거래처: 'ABC Manufacturing', 제품명: '금속 부품', 수량: 100, 색상: '검정색', 작업상태: '진행중', 납기일: '2025-02-15' },
  { id: '2', 작업번호: 'WO-002', 거래처: 'XYZ Corp', 제품명: '알루미늄 프레임', 수량: 50, 색상: '흰색', 작업상태: '대기', 납기일: '2025-02-20' },
  { id: '3', 작업번호: 'WO-003', 거래처: 'Tech Solutions', 제품명: '강철 패널', 수량: 75, 색상: '회색', 작업상태: '완료', 납기일: '2025-01-31' }
]

const colorOptions = ['검정색', '흰색', '회색', '은색', '빨강색', '파랑색']
const statusOptions: WorkStatus[] = ['대기', '진행중', '완료']

export default function WorksPage() {
  const [works, setWorks] = useState<WorkOrder[]>(mockWorks)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ 작업번호: '', 거래처: '', 제품명: '', 수량: 0, 색상: '검정색', 작업상태: '대기' as WorkStatus, 납기일: '' })

  const handleAdd = () => { setEditingId(null); setForm({ 작업번호: '', 거래처: '', 제품명: '', 수량: 0, 색상: '검정색', 작업상태: '대기', 납기일: '' }); setIsOpen(true) }
  const handleEdit = (w: WorkOrder) => { setEditingId(w.id); setForm({ 작업번호: w.작업번호, 거래처: w.거래처, 제품명: w.제품명, 수량: w.수량, 색상: w.색상, 작업상태: w.작업상태, 납기일: w.납기일 }); setIsOpen(true) }
  const handleSave = () => {
    if (editingId) { setWorks(works.map(w => w.id === editingId ? { ...w, ...form } : w)) }
    else { setWorks([{ id: String(Date.now()), ...form }, ...works]) }
    setIsOpen(false)
  }
  const handleDelete = (w: WorkOrder) => { if (confirm(`"${w.작업번호}" 삭제하시겠습니까?`)) setWorks(works.filter(x => x.id !== w.id)) }

  const columns = [
    { key: '작업번호' as const, label: '작업번호' },
    { key: '거래처' as const, label: '거래처' },
    { key: '제품명' as const, label: '제품명' },
    { key: '수량' as const, label: '수량' },
    { key: '색상' as const, label: '색상' },
    { key: '작업상태' as const, label: '상태', render: (w: WorkOrder) => <StatusBadge status={w.작업상태} type={getStatusType(w.작업상태)} /> },
    { key: '납기일' as const, label: '납기일' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">작업 관리</h1>
        <p className="text-gray-600">분체도장 작업을 관리합니다</p>
      </div>
      <DataTable<WorkOrder> columns={columns} data={works} title="작업 목록" addButtonText="작업 추가" onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? '작업 수정' : '작업 추가'} size="lg">
        <div className="space-y-4">
          <input name="작업번호" value={form.작업번호} onChange={e => setForm({ ...form, 작업번호: e.target.value })} placeholder="작업번호" className="w-full px-4 py-2 border rounded-lg" />
          <input name="거래처" value={form.거래처} onChange={e => setForm({ ...form, 거래처: e.target.value })} placeholder="거래처" className="w-full px-4 py-2 border rounded-lg" />
          <input name="제품명" value={form.제품명} onChange={e => setForm({ ...form, 제품명: e.target.value })} placeholder="제품명" className="w-full px-4 py-2 border rounded-lg" />
          <input name="수량" type="number" value={form.수량} onChange={e => setForm({ ...form, 수량: parseInt(e.target.value) || 0 })} placeholder="수량" className="w-full px-4 py-2 border rounded-lg" />
          <select name="색상" value={form.색상} onChange={e => setForm({ ...form, 색상: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
            {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select name="작업상태" value={form.작업상태} onChange={e => setForm({ ...form, 작업상태: e.target.value as WorkStatus })} className="w-full px-4 py-2 border rounded-lg">
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input name="납기일" type="date" value={form.납기일} onChange={e => setForm({ ...form, 납기일: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">{editingId ? '수정' : '추가'}</button>
            <button onClick={() => setIsOpen(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">취소</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
