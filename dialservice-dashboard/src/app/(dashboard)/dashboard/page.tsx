import {
  ClipboardList,
  Briefcase,
  Users,
  Receipt,
  TrendingUp,
  AlertCircle,
  Calendar,
} from 'lucide-react'

// 통계 카드 컴포넌트
function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string
  value: string | number
  change?: string
  icon: React.ElementType
  color: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-gray-500">오늘의 현황을 확인하세요</p>
      </div>

      {/* 알림 배너 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600" />
        <p className="text-yellow-800">
          이번 달 데이터 업로드가 필요합니다. (카드매입내역, 세금계산서)
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="진행중인 작업"
          value={12}
          change="+3 이번 주"
          icon={ClipboardList}
          color="bg-blue-500"
        />
        <StatCard
          title="진행중인 프로젝트"
          value={5}
          icon={Briefcase}
          color="bg-purple-500"
        />
        <StatCard
          title="거래처"
          value={48}
          change="+2 이번 달"
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="이번 달 매출"
          value="₩12,450,000"
          change="+15%"
          icon={Receipt}
          color="bg-orange-500"
        />
      </div>

      {/* 하단 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 작업 */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">최근 작업</h2>
          <div className="space-y-3">
            {[
              { id: 'WO-2025-0042', client: 'A사', status: '진행중', date: '2025-02-04' },
              { id: 'WO-2025-0041', client: 'B사', status: '완료', date: '2025-02-03' },
              { id: 'WO-2025-0040', client: 'C사', status: '대기', date: '2025-02-02' },
            ].map((work) => (
              <div
                key={work.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{work.id}</p>
                  <p className="text-sm text-gray-500">{work.client}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      work.status === '진행중'
                        ? 'bg-blue-100 text-blue-700'
                        : work.status === '완료'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {work.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{work.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오늘의 일정 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">오늘의 일정</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[
              { time: '10:00', title: 'A사 현장 방문', type: 'visit' },
              { time: '14:00', title: 'B사 견적 미팅', type: 'meeting' },
              { time: '16:00', title: 'C사 납품 마감', type: 'deadline' },
            ].map((schedule, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-sm text-gray-500 w-12">{schedule.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{schedule.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
