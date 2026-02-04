'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge, getStatusType } from '@/components/ui/status-badge'
import { Send } from 'lucide-react'

type InquiryStatus = '신규' | '진행중' | '완료'

interface Inquiry {
  id: string
  inquiryNumber: string
  customerName: string
  title: string
  status: InquiryStatus
  registeredDate: string
  content: string
  adminReply?: string
}

const mockInquiries: Inquiry[] = [
  { id: '1', inquiryNumber: 'INQ-001', customerName: 'ABC 물류', title: '분체도장 견적 문의', status: '신규', registeredDate: '2024-01-15', content: '분체도장 견적 부탁드립니다.' },
  { id: '2', inquiryNumber: 'INQ-002', customerName: '대한 철강', title: '납기 확인 요청', status: '진행중', registeredDate: '2024-01-14', content: '주문 건 납기 확인 부탁드립니다.', adminReply: '확인 중입니다.' },
  { id: '3', inquiryNumber: 'INQ-003', customerName: 'XYZ 제조', title: '색상 샘플 요청', status: '완료', registeredDate: '2024-01-13', content: '색상 샘플 요청드립니다.', adminReply: '샘플 발송 완료하였습니다.' }
]

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [reply, setReply] = useState('')

  const handleView = (inq: Inquiry) => {
    setSelected(inq)
    setReply(inq.adminReply || '')
    setIsOpen(true)
  }

  const handleSaveReply = () => {
    if (selected) {
      setInquiries(inquiries.map(i => i.id === selected.id ? { ...i, adminReply: reply, status: '완료' } : i))
      setIsOpen(false)
    }
  }

  const columns = [
    { key: 'inquiryNumber' as const, label: '문의번호' },
    { key: 'customerName' as const, label: '고객명' },
    { key: 'title' as const, label: '제목' },
    { key: 'status' as const, label: '상태', render: (v: string) => <StatusBadge status={v} type={getStatusType(v)} /> },
    { key: 'registeredDate' as const, label: '등록일' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">문의 관리</h1>
        <p className="text-gray-600 mt-1">고객 문의를 확인하고 답변합니다.</p>
      </div>
      <DataTable<Inquiry> columns={columns} data={inquiries} onView={handleView} searchPlaceholder="문의번호, 고객명 검색..." />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`문의 상세 - ${selected?.inquiryNumber}`} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">고객명:</span><span> {selected.customerName}</span></div>
              <div><span className="font-medium">등록일:</span><span> {selected.registeredDate}</span></div>
              <div><span className="font-medium">상태:</span><span> <StatusBadge status={selected.status} type={getStatusType(selected.status)} /></span></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
              <div className="p-3 bg-gray-50 rounded-lg">{selected.content}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">답변</label>
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="답변을 입력하세요..." />
            </div>
            <div className="flex justify-end">
              <button onClick={handleSaveReply} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Send className="w-4 h-4" /> 답변 저장
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
