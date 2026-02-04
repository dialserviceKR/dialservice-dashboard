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
'use client'
  
import { useState } from 'react'
  import { DataTable } from '@/components/ui/data-table'
    import { Modal } from '@/components/ui/modal'
      import { StatusBadge, getStatusType } from '@/components/ui/status-badge'
        
// Types
type TransactionType = '매입' | '매출' | '지급' | '수금'
  type CustomerStatus = '활성' | '비활성' | '휴면'
    
interface Customer {
    id: string
    companyName: string
    contactName: string
    phone: string
    email: string
    address: string
    transactionType: TransactionType
    status: CustomerStatus
    registrationNumber: string
    notes: string
}

interface FormData {
    companyName: string
    contactName: string
    phone: string
    email: string
    address: string
    transactionType: TransactionType
    status: CustomerStatus
    notes: string
}

// Mock data
const mockCustomers: Customer[] = [
  {
        id: '1',
        companyName: 'ABC 물류',
        contactName: '김철수',
        phone: '010-1234-5678',
        email: 'contact@abclogistics.co.kr',
        address: '서울시 강남구 테헤란로 123',
        transactionType: '매출',
        status: '활성',
        registrationNumber: '2024-01-15',
        notes: '주요 거래처'
  },
  {
        id: '2',
        companyName: 'XYZ 제조',
        contactName: '이영희',
        phone: '010-9876-5432',
        email: 'contact@xyzmanufacturing.co.kr',
        address: '경기도 성남시 분당구 판교로 456',
        transactionType: '매입',
        status: '활성',
        registrationNumber: '2023-06-20',
        notes: '분체도장 전문'
  },
  {
        id: '3',
        companyName: '대한 철강',
        contactName: '박민수',
        phone: '010-5555-1234',
        email: 'contact@daehansteel.co.kr',
        address: '인천시 남동구 남동대로 789',
        transactionType: '매출',
        status: '비활성',
        registrationNumber: '2022-11-30',
        notes: ''
  }
  ]
  
const initialFormData: FormData = {
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    address: '',
    transactionType: '매출',
    status: '활성',
    notes: ''
}
  
export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
        const [isModalOpen, setIsModalOpen] = useState(false)
            const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
                const [formData, setFormData] = useState<FormData>(initialFormData)
                  
    const columns = [
      { key: 'companyName' as const, label: '회사명', sortable: true },
      { key: 'contactName' as const, label: '담당자', sortable: true },
      { key: 'phone' as const, label: '연락처' },
      { key: 'email' as const, label: '이메일' },
      { key: 'transactionType' as const, label: '거래유형', sortable: true },
      {
              key: 'status' as const,
              label: '상태',
              sortable: true,
              render: (value: string) => (
                        <StatusBadge status={value} type={getStatusType(value)} />
                      )
      }
        ]
      
    const handleAdd = () => {
          setEditingCustomer(null)
                setFormData(initialFormData)
                      setIsModalOpen(true)
    }
      
    const handleEdit = (customer: Customer) => {
          setEditingCustomer(customer)
                setFormData({
                        companyName: customer.companyName,
                        contactName: customer.contactName,
                        phone: customer.phone,
                        email: customer.email,
                        address: customer.address,
                        transactionType: customer.transactionType,
                        status: customer.status,
                        notes: customer.notes
                })
                      setIsModalOpen(true)
    }
      
    const handleDelete = (customer: Customer) => {
          if (confirm('정말 삭제하시겠습니까?')) {
                  setCustomers(customers.filter(c => c.id !== customer.id))
          }
    }
      
    const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault()
                if (editingCustomer) {
                        setCustomers(customers.map(c =>
                                  c.id === editingCustomer.id
                                    ? { ...c, ...formData }
                                    : c
                                ))
                } else {
                        const newCustomer: Customer = {
                                  id: String(Date.now()),
                                  ...formData,
                                  registrationNumber: new Date().toISOString().split('T')[0]
                        }
                                setCustomers([...customers, newCustomer])
                }
          setIsModalOpen(false)
                setFormData(initialFormData)
    }
      
    return (
          <div className="space-y-6">
                <div className="flex justify-between items-center">
                        <div>
                                  <h1 className="text-2xl font-bold text-gray-900">거래처 관리</h1>h1>
                                  <p className="text-gray-600 mt-1">거래처 정보를 관리합니다.</p>p>
                        </div>div>
                </div>div>
          
                <DataTable
                          data={customers}
                          columns={columns}
                          onAdd={handleAdd}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          searchPlaceholder="회사명, 담당자 검색..."
                        />
          
                <Modal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          title={editingCustomer ? '거래처 수정' : '거래처 등록'}
                          size="lg"
                        >
                        <form onSubmit={handleSubmit} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            회사명 *
                                                            </label>label>
                                                            <input
                                                                              type="text"
                                                                              required
                                                                              value={formData.companyName}
                                                                              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                            />
                                              </div>div>
                                              <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            담당자
                                                            </label>label>
                                                            <input
                                                                              type="text"
                                                                              value={formData.contactName}
                                                                              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                            />
                                              </div>div>
                                              <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            연락처
                                                            </label>label>
                                                            <input
                                                                              type="tel"
                                                                              value={formData.phone}
                                                                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                            />
                                              </div>div>
                                              <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            이메일
                                                            </label>label>
                                                            <input
                                                                              type="email"
                                                                              value={formData.email}
                                                                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                            />
                                              </div>div>
                                              <div className="col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            주소
                                                            </label>label>
                                                            <input
                                                                              type="text"
                                                                              value={formData.address}
                                                                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                            />
                                              </div>div>
                                              <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            거래유형
                                                            </label>label>
                                                            <select
                                                                              value={formData.transactionType}
                                                                              onChange={(e) => setFormData({ ...formData, transactionType: e.target.value as TransactionType })}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                            >
                                                                            <option value="매출">매출</option>option>
                                                                            <option value="매입">매입</option>option>
                                                                            <option value="지급">지급</option>option>
                                                                            <option value="수금">수금</option>option>
                                                            </select>select>
                                              </div>div>
                                              <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            상태
                                                            </label>label>
                                                            <select
                                                                              value={formData.status}
                                                                              onChange={(e) => setFormData({ ...formData, status: e.target.value as CustomerStatus })}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                            >
                                                                            <option value="활성">활성</option>option>
                                                                            <option value="비활성">비활성</option>option>
                                                                            <option value="휴면">휴면</option>option>
                                                            </select>select>
                                              </div>div>
                                              <div className="col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            비고
                                                            </label>label>
                                                            <textarea
                                                                              value={formData.notes}
                                                                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                                              rows={3}
                                                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                            />
                                              </div>div>
                                  </div>div>
                                  <div className="flex justify-end space-x-3 pt-4">
                                              <button
                                                              type="button"
                                                              onClick={() => setIsModalOpen(false)}
                                                              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                                            >
                                                            취소
                                              </button>button>
                                              <button
                                                              type="submit"
                                                              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                                            >
                                                {editingCustomer ? '수정' : '등록'}
                                              </button>button>
                                  </div>div>
                        </form>form>
                </Modal>Modal>
          </div>div>
        )
}</div>ë©ëª¨?: string
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
