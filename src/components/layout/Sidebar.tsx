'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Package,
  Calendar,
  Receipt,
  Settings,
  MessageSquare,
  ClipboardList
} from 'lucide-react'

const menuItems = [
  { name: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { name: '문의관리', href: '/dashboard/inquiries', icon: MessageSquare },
  { name: '작업관리', href: '/dashboard/works', icon: ClipboardList },
  { name: '프로젝트', href: '/dashboard/projects', icon: Briefcase },
  { name: '거래처', href: '/dashboard/customers', icon: Users },
  { name: '견적서', href: '/dashboard/quotes', icon: FileText },
  { name: '재고관리', href: '/dashboard/inventory', icon: Package },
  { name: '일정', href: '/dashboard/schedule', icon: Calendar },
  { name: '회계', href: '/dashboard/accounting', icon: Receipt },
  { name: '설정', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">DIAL Service</h1>
        <p className="text-gray-400 text-sm">대시보드</p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">버전 1.0.0</p>
          <p className="text-xs text-gray-500">© 2025 DIAL Service</p>
        </div>
      </div>
    </aside>
  )
}
