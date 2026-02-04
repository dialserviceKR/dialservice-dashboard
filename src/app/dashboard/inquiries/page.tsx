'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge, getStatusType } from '@/components/ui/status-badge'
import { Send } from 'lucide-react'

type InquiryStatus = 'ì ì' | 'ì²ë¦¬ì¤' | 'ëµë³ìë£'

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
