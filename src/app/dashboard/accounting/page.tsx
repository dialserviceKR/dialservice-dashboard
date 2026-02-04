'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react'

// ============ Types ============
type TransactionType = '수입' | '지출'
type TransactionCategory = '매출' | '임가공비' | '재료비' | '인건비' | '임대료' | '공과금' | '기타'

interface Transaction {
  id: string
  날짜: string
  유형: TransactionType
  카테고리: TransactionCategory
  거래처: string
  내용: string
  금액: number
  메모: string
}

// ============ Mock Data ============
const mockTransactions: Transaction[] = [
  { id: '1', 날짜: '2025-02-01', 유형: '수입', 카테고리: '매출', 거래처: 'ABC Manufacturing', 내용: '분체도장 작업비', 금액: 2500000, 메모: 'WO-20250201-001' },
  { id: '2', 날짜: '2025-02-02', 유형: '지출', 카테고리: '재료비', 거래처: '도료상사', 내용: '분체도료 구매', 금액: 500000, 메모: '검정, 흰색 각 20kg' },
  { id: '3', 날짜: '2025-02-03', 유형: '수입', 카테고리: '매출', 거래처: 'XYZ Corp', 내용: '알루미늄 프레임 도장', 금액: 1800000, 메모: '' },
  { id: '4', 날짜: '2025-02-05', 유형: '지출', 카테고리: '공과금', 거래처: '한국전력', 내용: '전기요금', 금액: 350000, 메모: '1월분' },
  { id: '5', 날짜: '2025-02-05', 유형: '지출', 카테고리: '인건비', 거래처: '', 내용: '급여', 금액: 3000000, 메모: '직원 2명' },
  { id: '6', 날짜: '2025-02-10', 유형: '수입', 카테고리: '임가공비', 거래처: 'Tech Solutions', 내용: '외주 임가공', 금액: 800000, 메모: '' },
  { id: '7', 날짜: '2025-02-12', 유형: '지출', 카테고리: '임대료', 거래처: '건물주', 내용: '공장 임대료', 금액: 1500000, 메모: '2월분' }
]

const categoryOptions: TransactionCategory[] = ['매출', '임가공비', '재료비', '인건비', '임대료', '공과금', '기타']

// ============ Main Component ============
export default function AccountingPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<'전체' | TransactionType>('전체')
  const [formData, setFormData] = useState({ 날짜: '', 유형: '수입' as TransactionType, 카테고리: '매출' as TransactionCategory, 거래처: '', 내용: '', 금액: 0, 메모: '' })

  const formatCurrency = (n: number) => n.toLocaleString('ko-KR') + '원'

  const totalIncome = transactions.filter(t => t.유형 === '수입').reduce((sum, t) => sum + t.금액, 0)
  const totalExpense = transactions.filter(t => t.유형 === '지출').reduce((sum, t) => sum + t.금액, 0)
  const balance = totalIncome - totalExpense

  const filteredTransactions = filterType === '전체' ? transactions : transactions.filter(t => t.유형 === filterType)

  const resetForm = () => {
    setFormData({ 날짜: new Date().toISOString().split('T')[0], 유형: '수입', 카테고리: '매출', 거래처: '', 내용: '', 금액: 0, 메모: '' })
    setEditingId(null)
  }

  const handleAdd = () => { resetForm(); setIsModalOpen(true) }

  const handleEdit = (item: Transaction) => {
    setFormData({ 날짜: item.날짜, 유형: item.유형, 카테고리: item.카테고리, 거래처: item.거래처, 내용: item.내용, 금액: item.금액, 메모: item.메모 })
    setEditingId(item.id)
    setIsModalOpen(true)
  }

  const handleDelete = (item: Transaction) => {
    if (window.confirm('이 거래를 삭제하시겠습니까?')) {
      setTransactions(prev => prev.filter(t => t.id !== item.id))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === '금액' ? parseInt(value, 10) || 0 : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.날짜) return alert('날짜를 입력해주세요.')
    if (!formData.내용.trim()) return alert('내용을 입력해주세요.')
    if (formData.금액 <= 0) return alert('금액을 입력해주세요.')

    if (editingId) {
      setTransactions(prev => prev.map(t => t.id === editingId ? { ...t, ...formData } : t))
    } else {
      const newTransaction: Transaction = { id: String(Date.now()), ...formData }
      setTransactions(prev => [newTransaction, ...prev])
    }
    setIsModalOpen(false)
    resetForm()
  }

  const columns = [
    { key: '날짜' as const, label: '날짜', render: (item: Transaction) => new Date(item.날짜).toLocaleDateString('ko-KR') },
    { key: '유형' as const, label: '유형', render: (item: Transaction) => (<span className={'px-2 py-1 rounded text-sm ' + (item.유형 === '수입' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>{item.유형}</span>) },
    { key: '카테고리' as const, label: '카테고리' },
    { key: '거래처' as const, label: '거래처', render: (item: Transaction) => item.거래처 || '-' },
    { key: '내용' as const, label: '내용' },
    { key: '금액' as const, label: '금액', render: (item: Transaction) => (<span className={item.유형 === '수입' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{item.유형 === '수입' ? '+' : '-'}{formatCurrency(item.금액)}</span>) }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">회계관리</h1>
        <p className="mt-1 text-gray-600">수입 및 지출 내역을 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-green-50 text-green-900 border-green-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium opacity-75">총 수입</p>
            <TrendingUp className="h-5 w-5 opacity-50" />
          </div>
          <p className="text-2xl font-bold mt-2">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="rounded-lg border p-4 bg-red-50 text-red-900 border-red-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium opacity-75">총 지출</p>
            <TrendingDown className="h-5 w-5 opacity-50" />
          </div>
          <p className="text-2xl font-bold mt-2">{formatCurrency(totalExpense)}</p>
        </div>
        <div className={'rounded-lg border p-4 ' + (balance >= 0 ? 'bg-blue-50 text-blue-900 border-blue-200' : 'bg-orange-50 text-orange-900 border-orange-200')}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium opacity-75">잔액</p>
            <DollarSign className="h-5 w-5 opacity-50" />
          </div>
          <p className="text-2xl font-bold mt-2">{formatCurrency(balance)}</p>
        </div>
        <div className="rounded-lg border p-4 bg-purple-50 text-purple-900 border-purple-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium opacity-75">거래 건수</p>
            <CreditCard className="h-5 w-5 opacity-50" />
          </div>
          <p className="text-2xl font-bold mt-2">{transactions.length}건</p>
        </div>
      </div>

      <div className="flex gap-2">
        {(['전체', '수입', '지출'] as const).map(type => (
          <button key={type} onClick={() => setFilterType(type)} className={'px-4 py-2 rounded-lg font-medium transition-colors ' + (filterType === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}>{type}</button>
        ))}
      </div>

      <DataTable<Transaction>
        columns={columns}
        data={filteredTransactions.sort((a, b) => b.날짜.localeCompare(a.날짜))}
        title="거래 내역"
        addButtonText="거래 추가"
        searchPlaceholder="거래처, 내용 검색..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm() }} title={editingId ? '거래 수정' : '거래 추가'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">날짜 <span className="text-red-500">*</span></label><input type="date" name="날짜" value={formData.날짜} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">유형 <span className="text-red-500">*</span></label><select name="유형" value={formData.유형} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg"><option value="수입">수입</option><option value="지출">지출</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label><select name="카테고리" value={formData.카테고리} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">{categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">거래처</label><input type="text" name="거래처" value={formData.거래처} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">내용 <span className="text-red-500">*</span></label><input type="text" name="내용" value={formData.내용} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">금액 <span className="text-red-500">*</span></label><input type="number" name="금액" value={formData.금액} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">메모</label><textarea name="메모" value={formData.메모} onChange={handleChange} rows={2} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={() => { setIsModalOpen(false); resetForm() }} className="px-4 py-2 border rounded-lg hover:bg-gray-50">취소</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingId ? '수정' : '추가'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
