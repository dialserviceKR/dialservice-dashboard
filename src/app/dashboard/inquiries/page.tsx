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
  { id: '3', inquiryNumber: 'INQ-003', customerName: 'XYZ 제조', title: '색상 샘플 요청', status: '완료', registeredDate: '2024-01-13', content: '색상 샘플 요청드립니다.', adminReply: '샘플 발송 완료되었습니다.' }
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
                        <h1 className="text-2xl font-bold text-gray-900">문의 관리</h1>h1>
                        <p className="text-gray-600 mt-1">고객 문의를 확인하고 답변합니다.</p>p>
                </div>div>
                <DataTable data={inquiries} columns={columns} onEdit={handleView} searchPlaceholder="문의번호, 고객명 검색..." />
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="문의 상세" size="lg">
                  {selected && (
                      <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div><span className="font-medium">문의번호:</span>span> {selected.inquiryNumber}</div>div>
                                                <div><span className="font-medium">고객명:</span>span> {selected.customerName}</div>div>
                                                <div><span className="font-medium">등록일:</span>span> {selected.registeredDate}</div>div>
                                                <div><span className="font-medium">상태:</span>span> <StatusBadge status={selected.status} type={getStatusType(selected.status)} /></div>div>
                                  </div>div>
                                  <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>label>
                                                <div className="p-3 bg-gray-50 rounded-lg">{selected.content}</div>div>
                                  </div>div>
                                  <div> 
                                                <label className="block text-sm font-medium text-gray-700 mb-1">답변</label>label>
                                                <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="답변을 입력하세요..." />
                                  </div>div>
                                  <div className="flex justify-end">
                                                <button onClick={handleSaveReply} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                                <Send className="w-4 h-4" /> 답변 저장
                                                </button>button>
                                  </div>div>
                      </div>div>
                        )}
                </Modal>Modal>
          </div>div>
        )
}</div>customerName: string
  title: string
  status: InquiryStatus
  registeredDate: string
  content: string
  adminReply?: string
}

const mockInquiries: Inquiry[] = [
  { id: '1', inquiryNumber: 'INQ-001', customerName: 'ê¹ì² ì', title: 'ë°°ì¡ë¬¸ì', status: 'ì ì', registeredDate: '2024-01-15', content: 'ìí ë°°ì¡ ë¬¸ì' },
  { id: '2', inquiryNumber: 'INQ-002', customerName: 'ì´ìí¬ ', title: 'ìíë¬¸ì', status: 'ì²ë¦¬ì¤', registeredDate: '2024-01-14', content: 'ë°ì ìíì í ì§ì´ ììµëë¤.', adminReply: 'ë¸¶ë¡ìì¼ ë´ì íì¸ í ì°ë½íê² ìµëë¤.' },
  { id: '3', inquiryNumber: 'INQ-003', customerName: 'ë°ë¯¼ì', title: 'ê¸°ì ë¬¸ì', status: 'ëµë³ìë£', registeredDate: '2024-01-13', content: 'í¸íì± ë¬¸ì', adminReply: 'ìëë¡ì´ë ì§ìë©ëë¤.' }
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
      setInquiries(inquiries.map(i => i.id === selected.id ? { ...i, adminReply: reply, status: 'ëµë³ìë£' } : i))
      setIsOpen(false)
    }
  }

  const columns = [
    { key: 'inquiryNumber', label: 'ë¬¸ìë²í¸' },
    { key: 'customerName', label: 'ê³ ê°ëª' },
    { key: 'title', label: 'ì ëª©' },
    { key: 'status', label: 'ìí', render: (i: Inquiry) => <StatusBadge status={i.status} type={getStatusType(i.status)} /> },
    { key: 'registeredDate', label: 'ë±ë¡ì' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ë¬¸ì ê´ë¦¬</h1>
        <p className="text-gray-600">ê³ ê° ë¬¸ìì¬í­ì ê´ë¦¬í©ëë¤</p>
      </div>
      <DataTable<Inquiry> columns={columns} data={inquiries} onView={handleView} title="ë¬¸ì ëª©ë¡" />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`ë¬¸ì ìì¸ - ${selected?.inquiryNumber}`} size="lg">
        {selected && (
          <div className="space-y-4">
            <div><strong>ê³ ê°: </strong>{selected.customerName}</div>
            <div><strong>ë´ì©: </strong>{selected.content}</div>
            <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="ëµë³ ìì±..." rows={4} className="w-full px-3 py-2 border rounded-lg" />
            <button onClick={handleSaveReply} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"><Send className="h-4 w-4" />ëµë³ ì ì¥</button>
          </div>
        )}
      </Modal>
    </div>
  )
}
