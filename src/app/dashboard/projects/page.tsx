'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge, getStatusType } from '@/components/ui/status-badge'

type ProjectStatus = '계획' | '진행중' | '완료' | '보류'

interface Project {
  id: string
  프로젝트명: string
  거래처: string
  시작일: string
  종료예정일: string
  진행률: number
  상태: ProjectStatus
  담당자: string
}

const mockProjects: Project[] = [
  { id: '1', 프로젝트명: '신규 공장 설비', 거래처: 'ABC Corp', 시작일: '2025-01-01', 종료예정일: '2025-06-30', 진행률: 35, 상태: '진행중', 담당자: '김철수' },
  { id: '2', 프로젝트명: '제품 리뉴얼', 거래처: 'XYZ Ltd', 시작일: '2025-02-01', 종료예정일: '2025-04-30', 진행률: 10, 상태: '계획', 담당자: '이영희' },
  { id: '3', 프로젝트명: '시스템 업그레이드', 거래처: 'Tech Inc', 시작일: '2024-10-01', 종료예정일: '2025-01-31', 진행률: 100, 상태: '완료', 담당자: '박지민' }
]

const statusOptions: ProjectStatus[] = ['계획', '진행중', '완료', '보류']

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ 프로젝트명: '', 거래처: '', 시작일: '', 종료예정일: '', 진행률: 0, 상태: '계획' as ProjectStatus, 담당자: '' })

  const handleAdd = () => { setEditingId(null); setForm({ 프로젝트명: '', 거래처: '', 시작일: '', 종료예정일: '', 진행률: 0, 상태: '계획', 담당자: '' }); setIsOpen(true) }
  const handleEdit = (p: Project) => { setEditingId(p.id); setForm({ 프로젝트명: p.프로젝트명, 거래처: p.거래처, 시작일: p.시작일, 종료예정일: p.종료예정일, 진행률: p.진행률, 상태: p.상태, 담당자: p.담당자 }); setIsOpen(true) }
  const handleSave = () => {
    if (editingId) { setProjects(projects.map(p => p.id === editingId ? { ...p, ...form } : p)) }
    else { setProjects([{ id: String(Date.now()), ...form }, ...projects]) }
    setIsOpen(false)
  }
  const handleDelete = (p: Project) => { if (confirm(`"${p.프로젝트명}" 삭제?`)) setProjects(projects.filter(x => x.id !== p.id)) }

  const columns = [
    { key: '프로젝트명' as const, label: '프로젝트명' },
    { key: '거래처' as const, label: '거래처' },
    { key: '시작일' as const, label: '시작일' },
    { key: '종료예정일' as const, label: '종료예정일' },
    { key: '진행률' as const, label: '진행률', render: (p: Project) => (
      <div className="flex items-center gap-2">
        <div className="w-20 bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${p.진행률}%` }} />
        </div>
        <span className="text-sm">{p.진행률}%</span>
      </div>
    )},
    { key: '상태' as const, label: '상태', render: (p: Project) => <StatusBadge status={p.상태} type={getStatusType(p.상태)} /> },
    { key: '담당자' as const, label: '담당자' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">프로젝트 관리</h1>
        <p className="text-gray-600">설치/디자인 프로젝트를 관리합니다</p>
      </div>
      <DataTable<Project> columns={columns} data={projects} title="프로젝트 목록" addButtonText="프로젝트 추가" onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? '프로젝트 수정' : '프로젝트 추가'} size="lg">
        <div className="space-y-4">
          <input value={form.프로젝트명} onChange={e => setForm({ ...form, 프로젝트명: e.target.value })} placeholder="프로젝트명" className="w-full px-4 py-2 border rounded-lg" />
          <input value={form.거래처} onChange={e => setForm({ ...form, 거래처: e.target.value })} placeholder="거래처" className="w-full px-4 py-2 border rounded-lg" />
          <input value={form.담당자} onChange={e => setForm({ ...form, 담당자: e.target.value })} placeholder="담당자" className="w-full px-4 py-2 border rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={form.시작일} onChange={e => setForm({ ...form, 시작일: e.target.value })} className="px-4 py-2 border rounded-lg" />
            <input type="date" value={form.종료예정일} onChange={e => setForm({ ...form, 종료예정일: e.target.value })} className="px-4 py-2 border rounded-lg" />
          </div>
          <input type="number" value={form.진행률} onChange={e => setForm({ ...form, 진행률: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })} placeholder="진행률 (%)" min="0" max="100" className="w-full px-4 py-2 border rounded-lg" />
          <select value={form.상태} onChange={e => setForm({ ...form, 상태: e.target.value as ProjectStatus })} className="w-full px-4 py-2 border rounded-lg">
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">{editingId ? '수정' : '추가'}</button>
            <button onClick={() => setIsOpen(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">취소</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
