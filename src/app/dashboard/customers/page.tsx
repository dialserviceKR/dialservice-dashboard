'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge, getStatusType } from '@/components/ui/status-badge'

// Types
type TransactionType = 'ë§¤ì' | 'ë§¤ì¶' | 'ìë°©í¥'
type CustomerStatus = 'íì±' | 'ë¹íì±' | 'ê±°ëì¤ë¨'

interface Customer {
  id: string
  ê±°ëì²ëª: string
  ëíì: string
  ì°ë½ì²: string
  ì´ë©ì¼: string
  ì£¼ì: string
  ê±°ëì í: TransactionType
  ìí: CustomerStatus
  ë±ë¡ì¼: string
  ë©ëª¨?: string
}

interface FormData {
  ê±°ëì²ëª: string
  ëíì: string
  ì°ë½ì²: string
  ì´ë©ì¼: string
  ì£¼ì: string
  ê±°ëì í: TransactionType
  ìí: CustomerStatus
  ë©ëª¨: string
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    ê±°ëì²ëª: 'ABC ë¬¼ë¥ íì¬',
    ëíì: 'ê¹ì² ì',
    ì°ë½ì²: '010-1234-5678',
    ì´ë©ì¼: 'contact@abclogistics.co.kr',
    ì£¼ì: 'ìì¸ì ê°ë¨êµ¬ íí¤ëë¡ 123',
    ê±°ëì í: 'ë§¤ì',
    ìí: 'íì±',
    ë±ë¡ì¼: '2024-01-15',
    ë©ëª¨: 'ì 1í ì ê¸° ë°°ì¡'
  },
  {
    id: '2',
    ê±°ëì²ëª: 'XYZ ì ì¡°ìì²´',
    ëíì: 'ì´ìí¬',
    ì°ë½ì²: '02-9876-5432',
    ì´ë©ì¼: 'info@xyzmanufacturing.com',
    ì£¼ì: 'ê²½ê¸°ë ííì ê³´ë¨ë¡ 456',
    ê±°ëì í: 'ë§¤ì¶',
    ìí: 'íì±',
    ë±ë¡ì¼: '2024-01-20',
    ë©ëª¨: 'ê¸°ì  ì§ì íì'
  }
]

const TRANSACTION_TYPES: TransactionType[] = ['ë§¤ì', 'ë§¤ì¶', 'ìë°©í¥']
const CUSTOMER_STATUSES: CustomerStatus[] = ['íì±', 'ë¹íì±', 'ê±°ëì¤ë¨']

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    ê±°ëì²ëª: '',
    ëíì: '',
    ì°ë½ì²: '',
    ì´ë©ì¼: '',
    ì£¼ì: '',
    ê±°ëì í: 'ë§¤ì',
    ìí: 'íì±',
    ë©ëª¨: ''
  })

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      ê±°ëì²ëª: '',
      ëíì: '',
      ì°ë½ì²: '',
      ì´ë©ì¼: '',
      ì£¼ì : '',
      ê±°ëì í: 'ë§¤ì',
      ìí: 'íì±',
      ë©ëª¨: ''
    })
    setIsModalOpen(true)
  }

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id)
    setFormData({
      ê±°ëì²ëª: customer.ê±°ëì²ëª,
      ëíì: customer.ëíì,
      ì°ë½ì²: customer.ì°ë½ì²,
      ì´ë©ì¼: customer.ì´ë©ì¼,
      ì£¼ì: customer.ì£¼ì,
      ê±°ëì í: customer.ê±°ëì í,
      ìí: customer.ìí,
      ë©ëª¨: customer.ë©ëª¨ || ''
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingId) {
      setCustomers(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c))
    } else {
      const newCustomer: Customer = {
        id: String(Date.now()),
        ...formData,
        ë±ë¡ì¼: new Date().toISOString().split('T')[0]
      }
      setCustomers(prev => [newCustomer, ...prev])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (customer: Customer) => {
    if (confirm(`â${customer.ê±°ëì²ëª}â ê±°ëì²ì ì­ì íìê² ìµëê¹?`)) {
      setCustomers(prev => prev.filter(c => c.id !== customer.id))
    }
  }

  const columns = [
    { key: 'ê±°ëì²ëª' as const, label: 'ê±°ëì²ëª' },
    { key: 'ëíì' as const, label: 'ëíì' },
    { key: 'ì°ë½ì²' as const, label: 'ì°ë½ì²' },
    { key: 'ê±°ëì í' as const, label: 'ê±°ëì í' },
    { key: 'ìí' as const, label: 'ìí', render: (c: Customer) => <StatusBadge status={c.ìí} type={getStatusType(c.ìí)} /> }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ê±°ëì² ê´ë¦¬</h1>
        <p className="text-gray-600">ê±°ëì² ì ë³´ë¥¼ ê´ë¦¬í©ëë¤</p>
      </div>
      <DataTable<Customer>
        columns={columns}
        data={customers}
        title="ê±°ëì² ëª©ë¡"
        addButtonText="ê±°ëì² ì¶ê°"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'ê±°ëì² ìì ' : 'ê±°ëì² ì¶ê°'} size="lg">
        <div className="space-y-4">
          <input name="ê±°ëì²ëª" value={formData.ê±°ëì²ëª} onChange={e => setFormData({ ...formData, ê±°ëì²ëª: e.target.value })} placeholder="ê±°ëì²ëª" className="w-full px-4 py-2 border rounded-lg" />
          <input name="ëíì" value={formData.ëíì} onChange={e => setFormData({ ...formData, ëíì: e.target.value })} placeholder="ëíì" className="w-full px-4 py-2 border rounded-lg" />
          <input name="ì°ë½ì²" value={formData.ì°ë½ì²} onChange={e => setFormData({ ...formData, ì°ë½ì²: e.target.value })} placeholder="ì°ë½ì²" className="w-full px-4 py-2 border rounded-lg" />
          <input name="ì´ë©ì¼" value={formData.ì´ë©ì¼} onChange={e => setFormData({ ...formData, ì´ë©ì¼: e.target.value })} placeholder="ì´ë©ì¼" className="w-full px-4 py-2 border rounded-lg" />
          <input name="ì£¼ì" value={formData.ì£¼ì} onChange={e => setFormData({ ...formData, ì£¼ì: e.target.value })} placeholder="ì£¼ì" className="w-full px-4 py-2 border rounded-lg" />
          <select name="ê±°ëì í" value={formData.ê±°ëì í} onChange={e => setFormData({ ...formData, ê±°ëì í: e.target.value as TransactionType })} className="w-full px-4 py-2 border rounded-lg">
            {TRANSACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select name="ìí" value={formData.ìí} onChange={e => setFormData({ ...formData, ìí: e.target.value as CustomerStatus })} className="w-full px-4 py-2 border rounded-lg">
            {CUSTOMER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea name="ë©ëª¨" value={formData.ë©ëª¨} onChange={e => setFormData({ ...formData, ë©ëª¨: e.target.value })} placeholder="ë©ëª¨" className="w-full px-4 py-2 border rounded-lg" rows={3} />
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">{editingId ? 'ìì ' : 'ì¶ê°'}</button>
            <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">ì·¨ì</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
