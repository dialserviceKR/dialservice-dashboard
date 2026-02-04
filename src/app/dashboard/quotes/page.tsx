'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge, getStatusType } from '@/components/ui/status-badge'

type QuoteStatus = '작성중' | '발송' | '승인' | '거절'

interface Quote {
  id: string
  견적번호: string
  거래처: string
  제목: string
  총액: number
  상태: QuoteStatus
  작성일: string
  유효기간: string
}

const mockQuotes: Quote[] = [
  { id: '1', 견적번호: 'QT-2025-001', 거래처: 'ABC Corp', 제목: '분체도장 작업 견적', 총액: 5000000, 상태: '발송', 작성일: '2025-02-01', 유효기간: '2025-03-01' },
  { id: '2', 견적번호: 'QT-2025-002', 거래처: 'XYZ Ltd', 제목: '설치 프로젝트 견적', 총액: 12000000, 상태: '승인', 작성일: '2025-01-28', 유효기간: '2025-02-28' },
  { id: '3', 견적번호: 'QT-2025-003', 거래처: 'Tech Inc', 제목: '부품 공급 견적', 총액: 3500000, 상태: '작성중', 작성일: '2025-02-04', 유효기간: '2025-03-04' }
]

const statusOptions: QuoteStatus[] = ['작성중', '발송', '승인', '거절']

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ 견적번호: '', 거래처: '', 제목: '', 총액: 0, 상태: '작성중' as QuoteStatus, 작성일: '', 유효기간: '' })

  const handleAdd = () => { setEditingId(null); setForm({ 견적번호: '', 거래처: '', 제목: '', 총액: 0, 상태: '작성중', 작성일: '', 유효기간: '' }); setIsOpen(true) }
  const handleEdit = (q: Quote) => { setEditingId(q.id); setForm({ 견적번호: q.견적번호, 거래처: q.거래처, 제목: q.제목, 총액: q.총액, 상태: q.상태, 작성일: q.작성일, 유효기간: q.유효기간 }); setIsOpen(true) }
  const handleSave = () => {
    if (editingId) { setQuotes(quotes.map(q => q.id === editingId ? { ...q, ...form } : q)) }
    else { setQuotes([{ id: String(Date.now()), ...form }, ...quotes]) }
    setIsOpen(false)
  }
  const handleDelete = (q: Quote) => { if (confirm(`"${q.견적번호}" 삭제?`)) setQuotes(quotes.filter(x => x.id !== q.id)) }

  const formatCurrency = (n: number) => n.toLocaleString('ko-KR') + '원'

  const columns = [
    { key: '견적번호' as const, label: '견적번호' },
    { key: '거래처' as const, label: '거래처' },
    { key: '제목' as const, label: '제목' },
    { key: '총액' as const, label: '총액', render: (q: Quote) => <span className="font-medium">{formatCurrency(q.총액)}</span> },
    { key: '상태' as const, label: '상태', render: (q: Quote) => <StatusBadge status={q.상태} type={getStatusType(q.상태)} /> },
    { key: '작성일' as const, label: '작성일' },
    { key: '유효기간' as const, label: '유효기간' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">견적서 관리</h1>
        <p className="text-gray-600">견적서를 작성하고 관리합니다</p>
      </div>
      <DataTable<Quote> columns={columns} data={quotes} title="견적서 목록" addButtonText="견적서 추가" onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? '견적서 수정' : '견적서 작성'} size="lg">
        <div className="space-y-4">
          <input value={form.견적번호} onChange={e => setForm({ ...form, 견적번호: e.target.value })} placeholder="견적번호" className="w-full px-4 py-2 border rounded-lg" />
          <input value={form.거래처} onChange={e => setForm({ ...form, 거래처: e.target.value })} placeholder="거래처" className="w-full px-4 py-2 border rounded-lg" />
          <input value={form.제목} onChange={e => setForm({ ...form, 제목: e.target.value })} placeholder="견적 제목" className="w-full px-4 py-2 border rounded-lg" />
          <input type="number" value={form.총액} onChange={e => setForm({ ...form, 총액: parseInt(e.target.value) || 0 })} placeholder="총액" className="w-full px-4 py-2 border rounded-lg" />
          <select value={form.상태} onChange={e => setForm({ ...form, 상태: e.target.value as QuoteStatus })} className="w-full px-4 py-2 border rounded-lg">
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={form.작성일} onChange={e => setForm({ ...form, 작성일: e.target.value })} className="px-4 py-2 border rounded-lg" />
            <input type="date" value={form.유효기간} onChange={e => setForm({ ...form, 유효기간: e.target.value })} className="px-4 py-2 border rounded-lg" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">{editingId ? '수정' : '저장'}</button>
            <button onClick={() => setIsOpen(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">취소</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
