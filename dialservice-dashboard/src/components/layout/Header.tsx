'use client'

import { Bell, Search, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      {/* 검색 */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="검색..."
          className="flex-1 outline-none text-sm"
        />
      </div>

      {/* 우측 메뉴 */}
      <div className="flex items-center gap-4">
        {/* 알림 */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* 프로필 */}
        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium">관리자</span>
        </button>
      </div>
    </header>
  )
}
