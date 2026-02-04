'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Modal } from '@/components/ui/modal'
import { Package, AlertTriangle } from 'lucide-react'

// ============ Types ============
interface InventoryItem {
  id: string
  품목코드: string
  품목명: string
  카테고리: string
  현재수량: number
  최소수량: number
  단위: string
  단가: number
  위치: string
  최종입고일: string
}

interface FormData {
  품목코드: string
  품목명: string
  카테고리: string
  현재수량: number
  최소수량: number
  단위: string
  단가: number
  위치: string
}

// ============ Mock Data ============
const mockInventory: InventoryItem[] = [
  {
    id: '1',
    품목코드: 'INV-001',
    품목명: '분체도료 (검정)',
    카테고리: '도료',
    현재수량: 50,
    최소수량: 20,
    단위: 'kg',
    단가: 15000,
    위치: 'A-1-01',
    최종입고일: '2025-01-15'
  },
  {
    id: '2',
    품목코드: 'INV-002',
    품목명: '분체도료 (흰색)',
    카테고리: '도료',
    현재수량: 15,
    최소수량: 20,
    단위: 'kg',
    단가: 15000,
    위치: 'A-1-02',
    최종입고일: '2025-01-10'
  },
  {
    id: '3',
    품목코드: 'INV-003',
    품목명: '마스킹 테이프',
    카테고리: '소모품',
    현재수량: 100,
    최소수량: 50,
    단위: '개',
    단가: 2000,
    위치: 'B-2-01',
    최종입고일: '2025-01-20'
  },
  {
    id: '4',
    품목코드: 'INV-004',
    품목명: '연마지 (#120)',
    카테고리: '소모품',
    현재수량: 30,
    최소수량: 50,
    단위: '장',
    단가: 500,
    위치: 'B-2-02',
    최종입고일: '2025-01-18'
  },
  {
    id: '5',
    품목코드: 'INV-005',
    품목명: '행거 후크',
    카테고리: '부자재',
    현재수량: 200,
    최소수량: 100,
    단위: '개',
    단가: 300,
    위치: 'C-1-01',
    최종입고일: '2025-01-25'
  }
]

// ============ Options ============
const categoryOptions = ['도료', '소모품', '부자재', '장비', '기타']
const unitOptions = ['kg', 'g', '개', '장', 'L', 'm', 'set']

// ============ Main Component ============
export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    품목코드: '',
    품목명: '',
    카테고리: '',
    현재수량: 0,
    최소수량: 0,
    단위: '',
    단가: 0,
    위치: ''
  })

  const formatCurrency = (n: number) => n.toLocaleString('ko-KR') + '원'
  const isLowStock = (item: InventoryItem) => item.현재수량 < item.최소수량
  const lowStockCount = inventory.filter(isLowStock).length

  const resetForm = () => {
    setFormData({ 품목코드: '', 품목명: '', 카테고리: '', 현재수량: 0, 최소수량: 0, 단위: '', 단가: 0, 위치: '' })
    setEditingId(null)
  }

  const handleAdd = () => { resetForm(); setIsModalOpen(true) }

  const handleEdit = (item: InventoryItem) => {
    setFormData({ 품목코드: item.품목코드, 품목명: item.품목명, 카테고리: item.카테고리, 현재수량: item.현재수량, 최소수량: item.최소수량, 단위: item.단위, 단가: item.단가, 위치: item.위치 })
    setEditingId(item.id)
    setIsModalOpen(true)
  }

  const handleDelete = (item: InventoryItem) => {
    if (window.confirm(item.품목명 + '을(를) 삭제하시겠습니까?')) {
      setInventory(prev => prev.filter(i => i.id !== item.id))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: ['현재수량', '최소수량', '단가'].includes(name) ? parseInt(value, 10) || 0 : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.품목코드.trim()) return alert('품목코드를 입력해주세요.')
    if (!formData.품목명.trim()) return alert('품목명을 입력해주세요.')
    if (!formData.카테고리) return alert('카테고리를 선택해주세요.')
    if (!formData.단위) return alert('단위를 선택해주세요.')

    if (editingId) {
      setInventory(prev => prev.map(item => item.id === editingId ? { ...item, ...formData } : item))
    } else {
      const newItem: InventoryItem = { id: String(Math.max(...inventory.map(i => parseInt(i.id, 10)), 0) + 1), ...formData, 최종입고일: new Date().toISOString().split('T')[0] }
      setInventory(prev => [newItem, ...prev])
    }
    setIsModalOpen(false)
    resetForm()
  }

  const columns = [
    { key: '품목코드' as const, label: '품목코드' },
    { key: '품목명' as const, label: '품목명', render: (item: InventoryItem) => (<div className="flex items-center gap-2">{isLowStock(item) && <AlertTriangle className="h-4 w-4 text-red-500" />}<span className={isLowStock(item) ? 'text-red-600 font-medium' : ''}>{item.품목명}</span></div>) },
    { key: '카테고리' as const, label: '카테고리' },
    { key: '현재수량' as const, label: '현재수량', render: (item: InventoryItem) => (<span className={isLowStock(item) ? 'text-red-600 font-bold' : ''}>{item.현재수량} {item.단위}</span>) },
    { key: '최소수량' as const, label: '최소수량', render: (item: InventoryItem) => item.최소수량 + ' ' + item.단위 },
    { key: '단가' as const, label: '단가', render: (item: InventoryItem) => formatCurrency(item.단가) },
    { key: '위치' as const, label: '위치' },
    { key: '최종입고일' as const, label: '최종입고일', render: (item: InventoryItem) => new Date(item.최종입고일).toLocaleDateString('ko-KR') }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">재고관리</h1>
        <p className="mt-1 text-gray-600">원자재 및 소모품 재고를 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-blue-50 text-blue-900 border-blue-200">
          <p className="text-sm font-medium opacity-75">전체 품목</p>
          <p className="text-3xl font-bold mt-2">{inventory.length}</p>
        </div>
        <div className={'rounded-lg border p-4 ' + (lowStockCount > 0 ? 'bg-red-50 text-red-900 border-red-200' : 'bg-green-50 text-green-900 border-green-200')}>
          <p className="text-sm font-medium opacity-75">재고 부족</p>
          <p className="text-3xl font-bold mt-2">{lowStockCount}</p>
        </div>
        <div className="rounded-lg border p-4 bg-green-50 text-green-900 border-green-200">
          <p className="text-sm font-medium opacity-75">총 재고가치</p>
          <p className="text-xl font-bold mt-2">{formatCurrency(inventory.reduce((sum, i) => sum + i.현재수량 * i.단가, 0))}</p>
        </div>
        <div className="rounded-lg border p-4 bg-purple-50 text-purple-900 border-purple-200">
          <p className="text-sm font-medium opacity-75">카테고리</p>
          <p className="text-3xl font-bold mt-2">{new Set(inventory.map(i => i.카테고리)).size}</p>
        </div>
      </div>

      {lowStockCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">재고 부족 알림</span>
          </div>
          <p className="mt-1 text-red-600 text-sm">{lowStockCount}개 품목의 재고가 최소 수량 이하입니다.</p>
        </div>
      )}

      <DataTable<InventoryItem>
        columns={columns}
        data={inventory}
        title="재고 목록"
        addButtonText="품목 추가"
        searchPlaceholder="품목코드, 품목명 검색..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm() }} title={editingId ? '품목 수정' : '품목 추가'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">품목코드 <span className="text-red-500">*</span></label><input type="text" name="품목코드" value={formData.품목코드} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">품목명 <span className="text-red-500">*</span></label><input type="text" name="품목명" value={formData.품목명} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">카테고리 <span className="text-red-500">*</span></label><select name="카테고리" value={formData.카테고리} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg"><option value="">선택</option>{categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">단위 <span className="text-red-500">*</span></label><select name="단위" value={formData.단위} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg"><option value="">선택</option>{unitOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">현재수량</label><input type="number" name="현재수량" value={formData.현재수량} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">최소수량</label><input type="number" name="최소수량" value={formData.최소수량} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">단가</label><input type="number" name="단가" value={formData.단가} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">위치</label><input type="text" name="위치" value={formData.위치} onChange={handleChange} placeholder="예: A-1-01" className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={() => { setIsModalOpen(false); resetForm() }} className="px-4 py-2 border rounded-lg hover:bg-gray-50">취소</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingId ? '수정' : '추가'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
