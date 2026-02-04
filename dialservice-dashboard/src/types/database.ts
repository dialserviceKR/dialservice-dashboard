// 자동 생성된 타입 - Supabase CLI로 재생성 가능
// npx supabase gen types typescript --project-id ajzrcuwnnvsvxvsytqhn > src/types/database.ts

export type Business = {
  id: string
  name: string
  business_number: string | null
  representative_name: string | null
  address: string | null
  phone: string | null
  email: string | null
  logo_url: string | null
  settings: Record<string, unknown>
  is_active: boolean
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  name: string
  phone: string | null
  avatar_url: string | null
  role: 'owner' | 'admin' | 'manager' | 'staff'
  permissions: string[]
  is_active: boolean
  last_login_at: string | null
  created_at: string
  updated_at: string
}

export type Client = {
  id: string
  business_id: string
  name: string
  client_type: 'customer' | 'supplier' | 'both'
  client_code: string | null
  contact_name: string | null
  phone: string | null
  mobile: string | null
  email: string | null
  address: string | null
  business_number: string | null
  customer_grade: string | null
  discount_rate: number
  tags: string[]
  notes: string | null
  is_active: boolean
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type WorkOrder = {
  id: string
  business_id: string
  order_number: string
  client_id: string | null
  status: 'received' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled' | 'invoiced'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  received_date: string | null
  due_date: string | null
  completed_date: string | null
  item_description: string | null
  quantity: number
  unit: string
  unit_price: number | null
  total_amount: number | null
  payment_status: 'unpaid' | 'partial' | 'paid'
  assigned_to: string | null
  tags: string[]
  notes: string | null
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  business_id: string
  project_number: string
  title: string
  description: string | null
  client_id: string | null
  project_type: string | null
  status: 'draft' | 'estimate' | 'contracted' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled' | 'invoiced'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  estimate_amount: number | null
  contract_amount: number | null
  final_amount: number | null
  payment_status: 'unpaid' | 'partial' | 'paid'
  start_date: string | null
  due_date: string | null
  completed_date: string | null
  site_address: string | null
  manager_id: string | null
  tags: string[]
  notes: string | null
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type Inquiry = {
  id: string
  business_id: string
  inquiry_number: string | null
  client_id: string | null
  contact_name: string | null
  contact_phone: string | null
  contact_email: string | null
  company_name: string | null
  channel: 'phone' | 'kakao' | 'email' | 'website' | 'visit' | 'referral'
  inquiry_type: string | null
  title: string | null
  content: string | null
  status: 'new' | 'contacted' | 'quoted' | 'negotiating' | 'converted' | 'lost' | 'closed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  assigned_to: string | null
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type Schedule = {
  id: string
  business_id: string
  title: string
  description: string | null
  schedule_type: 'task' | 'meeting' | 'deadline' | 'delivery' | 'visit' | 'reminder' | 'holiday' | 'other'
  start_date: string
  start_time: string | null
  end_date: string | null
  end_time: string | null
  is_all_day: boolean
  target_type: string | null
  target_id: string | null
  color: string | null
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  assigned_to: string | null
  location: string | null
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type Transaction = {
  id: string
  business_id: string
  transaction_type: 'income' | 'expense'
  category: string | null
  sub_category: string | null
  source_type: string | null
  source_id: string | null
  client_id: string | null
  amount: number
  tax_amount: number
  total_amount: number | null
  transaction_date: string
  payment_status: 'unpaid' | 'partial' | 'paid'
  payment_method: string | null
  description: string | null
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type Expense = {
  id: string
  business_id: string
  project_id: string | null
  work_order_id: string | null
  category_id: string | null
  vendor_name: string | null
  expense_date: string
  amount: number
  tax_amount: number
  payment_method: string | null
  description: string | null
  receipt_image_url: string | null
  ai_extracted_data: Record<string, unknown> | null
  is_verified: boolean
  source: 'manual' | 'receipt_ocr' | 'card_import' | 'bank_import'
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  business_id: string
  source_type: 'work_order' | 'project' | 'sales_order' | 'transaction'
  source_id: string
  client_id: string | null
  payment_type: 'deposit' | 'interim' | 'balance' | 'full' | 'refund'
  payment_order: number | null
  amount: number
  scheduled_date: string | null
  scheduled_amount: number | null
  paid_date: string | null
  paid_amount: number | null
  payment_method: string | null
  status: 'pending' | 'partial' | 'completed' | 'overdue' | 'cancelled'
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type Quote = {
  id: string
  business_id: string
  quote_number: string
  client_id: string | null
  source_type: string | null
  source_id: string | null
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired' | 'revised'
  quote_date: string
  valid_until: string | null
  subtotal: number | null
  discount_amount: number
  supply_amount: number | null
  tax_amount: number | null
  total_amount: number | null
  title: string | null
  description: string | null
  terms: string | null
  pdf_url: string | null
  is_deleted: boolean
  created_at: string
  updated_at: string
}
