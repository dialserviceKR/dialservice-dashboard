'use client'

import { useState } from 'react'
import { User, Building, Bell, Shield, Palette, Database } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company')
  const [saved, setSaved] = useState(false)

  const [companySettings, setCompanySettings] = useState({
    회사명: '다이얼서비스',
    대표자: '홍길동',
    사업자번호: '123-45-67890',
    전화번호: '02-1234-5678',
    팩스번호: '02-1234-5679',
    이메일: 'info@dialservice.kr',
    주소: '서울시 강남구 테헤란로 123',
    업태: '제조업',
    종목: '분체도장, 금속가공'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    이메일알림: true,
    SMS알림: false,
    작업완료알림: true,
    납기임박알림: true,
    재고부족알림: true,
    신규문의알림: true
  })

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompanySettings(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'company', label: '회사 정보', icon: Building },
    { id: 'profile', label: '내 프로필', icon: User },
    { id: 'notifications', label: '알림 설정', icon: Bell },
    { id: 'security', label: '보안', icon: Shield },
    { id: 'appearance', label: '화면 설정', icon: Palette },
    { id: 'data', label: '데이터 관리', icon: Database }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">설정</h1>
        <p className="mt-1 text-gray-600">시스템 설정을 관리하세요</p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 bg-white rounded-lg shadow p-4">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ' + (activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50')}>
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow">
          {activeTab === 'company' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">회사 정보</h2>
              <div className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">회사명</label><input type="text" name="회사명" value={companySettings.회사명} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">대표자</label><input type="text" name="대표자" value={companySettings.대표자} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">사업자번호</label><input type="text" name="사업자번호" value={companySettings.사업자번호} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label><input type="text" name="전화번호" value={companySettings.전화번호} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">팩스번호</label><input type="text" name="팩스번호" value={companySettings.팩스번호} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">이메일</label><input type="email" name="이메일" value={companySettings.이메일} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">주소</label><input type="text" name="주소" value={companySettings.주소} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">업태</label><input type="text" name="업태" value={companySettings.업태} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">종목</label><input type="text" name="종목" value={companySettings.종목} onChange={handleCompanyChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                </div>
                <div className="pt-4"><button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{saved ? '저장됨!' : '저장'}</button></div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">내 프로필</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center"><User className="h-12 w-12 text-gray-400" /></div>
                <div><button className="px-4 py-2 border rounded-lg hover:bg-gray-50">사진 변경</button></div>
              </div>
              <div className="space-y-4 max-w-md">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">이름</label><input type="text" defaultValue="관리자" className="w-full px-3 py-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">이메일</label><input type="email" defaultValue="admin@dialservice.kr" className="w-full px-3 py-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label><input type="text" defaultValue="010-1234-5678" className="w-full px-3 py-2 border rounded-lg" /></div>
                <div className="pt-4"><button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{saved ? '저장됨!' : '저장'}</button></div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">알림 설정</h2>
              <div className="space-y-4 max-w-md">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b">
                    <span className="font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <button onClick={() => handleNotificationChange(key)} className={'w-12 h-6 rounded-full transition-colors ' + (value ? 'bg-blue-600' : 'bg-gray-300')}>
                      <div className={'w-5 h-5 bg-white rounded-full shadow transform transition-transform ' + (value ? 'translate-x-6' : 'translate-x-0.5')} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">보안</h2>
              <div className="space-y-6 max-w-md">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">비밀번호 변경</h3>
                  <p className="text-sm text-gray-500 mb-4">정기적으로 비밀번호를 변경하여 계정을 보호하세요.</p>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">비밀번호 변경</button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">2단계 인증</h3>
                  <p className="text-sm text-gray-500 mb-4">추가 보안을 위해 2단계 인증을 설정하세요.</p>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">설정하기</button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">로그인 기록</h3>
                  <p className="text-sm text-gray-500 mb-4">최근 로그인 활동을 확인하세요.</p>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">기록 보기</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">화면 설정</h2>
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">테마</label>
                  <div className="flex gap-4">
                    <button className="flex-1 p-4 border-2 border-blue-500 rounded-lg bg-white"><div className="text-center"><div className="w-8 h-8 bg-gray-100 rounded mx-auto mb-2" /><span className="text-sm">라이트</span></div></button>
                    <button className="flex-1 p-4 border rounded-lg bg-gray-800 text-white"><div className="text-center"><div className="w-8 h-8 bg-gray-600 rounded mx-auto mb-2" /><span className="text-sm">다크</span></div></button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">언어</label>
                  <select className="w-full px-3 py-2 border rounded-lg"><option value="ko">한국어</option><option value="en">English</option></select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">데이터 관리</h2>
              <div className="space-y-6 max-w-md">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">데이터 내보내기</h3>
                  <p className="text-sm text-gray-500 mb-4">모든 데이터를 Excel 형식으로 내보냅니다.</p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">내보내기</button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">데이터 백업</h3>
                  <p className="text-sm text-gray-500 mb-4">마지막 백업: 2025년 2월 1일</p>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">지금 백업</button>
                </div>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-medium text-red-900 mb-2">데이터 삭제</h3>
                  <p className="text-sm text-red-600 mb-4">모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.</p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">데이터 삭제</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
