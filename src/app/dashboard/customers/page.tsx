'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge, getStatusType } from '@/components/ui/status-badge'

// Types
type TransactionType = '매입' | '매출' | '지급' | '수급'
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
    registrationNumber: '2023-05-20',
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
      render: (value: string) => {
        return <StatusBadge status={value} type={getStatusType(value)} />
      }
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
          <h1 className="text-2xl font-bold text-gray-900">거래처 관리</h1>
          <p className="text-gray-600 mt-1">거래처 정보를 관리합니다.</p>
        </div>
      </div>

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
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                담당자
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연락처
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                거래유형
              </label>
              <select
                value={formData.transactionType}
                onChange={(e) => setFormData({ ...formData, transactionType: e.target.value as TransactionType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="매출">매출</option>
                <option value="매입">매입</option>
                <option value="지급">지급</option>
                <option value="수급">수급</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상태
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CustomerStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="활성">활성</option>
                <option value="비활성">비활성</option>
                <option value="휴면">휴면</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                비고
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {editingCustomer ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
