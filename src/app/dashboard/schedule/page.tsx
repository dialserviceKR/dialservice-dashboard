'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react'
import { Modal } from '@/components/ui/modal'

// ============ Types ============
type EventType = '작업' | '미팅' | '납품' | '기타'

interface ScheduleEvent {
  id: string
  제목: string
  날짜: string
  시작시간: string
  종료시간: string
  유형: EventType
  장소: string
  메모: string
}

// ============ Mock Data ============
const mockEvents: ScheduleEvent[] = [
  { id: '1', 제목: 'ABC Manufacturing 작업', 날짜: '2025-02-05', 시작시간: '09:00', 종료시간: '17:00', 유형: '작업', 장소: '공장', 메모: '분체도장 100개' },
  { id: '2', 제목: 'XYZ Corp 미팅', 날짜: '2025-02-07', 시작시간: '14:00', 종료시간: '15:30', 유형: '미팅', 장소: '회의실', 메모: '신규 프로젝트 논의' },
  { id: '3', 제목: 'Tech Solutions 납품', 날짜: '2025-02-10', 시작시간: '10:00', 종료시간: '12:00', 유형: '납품', 장소: '고객사', 메모: '강철 판금 75개 납품' },
  { id: '4', 제목: 'Industrial Group 견적 미팅', 날짜: '2025-02-12', 시작시간: '11:00', 종료시간: '12:00', 유형: '미팅', 장소: '사무실', 메모: '' },
  { id: '5', 제목: '설비 점검', 날짜: '2025-02-15', 시작시간: '08:00', 종료시간: '10:00', 유형: '기타', 장소: '공장', 메모: '정기 점검' }
]

const eventTypeColors: Record<EventType, string> = {
  '작업': 'bg-blue-100 text-blue-800 border-blue-300',
  '미팅': 'bg-green-100 text-green-800 border-green-300',
  '납품': 'bg-purple-100 text-purple-800 border-purple-300',
  '기타': 'bg-gray-100 text-gray-800 border-gray-300'
}

const eventTypes: EventType[] = ['작업', '미팅', '납품', '기타']

// ============ Main Component ============
export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1))
  const [events, setEvents] = useState<ScheduleEvent[]>(mockEvents)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ 제목: '', 날짜: '', 시작시간: '09:00', 종료시간: '18:00', 유형: '작업' as EventType, 장소: '', 메모: '' })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const formatDateStr = (y: number, m: number, d: number) => {
    return y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0')
  }

  const getEventsForDate = (day: number) => {
    const dateStr = formatDateStr(year, month, day)
    return events.filter(e => e.날짜 === dateStr)
  }

  const handleDateClick = (day: number) => {
    const dateStr = formatDateStr(year, month, day)
    setSelectedDate(dateStr)
    setFormData({ ...formData, 날짜: dateStr })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const handleEventClick = (event: ScheduleEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    setFormData({ 제목: event.제목, 날짜: event.날짜, 시작시간: event.시작시간, 종료시간: event.종료시간, 유형: event.유형, 장소: event.장소, 메모: event.메모 })
    setEditingId(event.id)
    setIsModalOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.제목.trim()) return alert('제목을 입력해주세요.')
    if (!formData.날짜) return alert('날짜를 선택해주세요.')

    if (editingId) {
      setEvents(prev => prev.map(ev => ev.id === editingId ? { ...ev, ...formData } : ev))
    } else {
      const newEvent: ScheduleEvent = { id: String(Date.now()), ...formData }
      setEvents(prev => [...prev, newEvent])
    }
    setIsModalOpen(false)
    resetForm()
  }

  const handleDelete = () => {
    if (editingId && window.confirm('이 일정을 삭제하시겠습니까?')) {
      setEvents(prev => prev.filter(ev => ev.id !== editingId))
      setIsModalOpen(false)
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({ 제목: '', 날짜: '', 시작시간: '09:00', 종료시간: '18:00', 유형: '작업', 장소: '', 메모: '' })
    setEditingId(null)
    setSelectedDate(null)
  }

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">일정관리</h1>
          <p className="mt-1 text-gray-600">작업 및 미팅 일정을 관리하세요</p>
        </div>
        <button onClick={() => { resetForm(); setFormData(prev => ({ ...prev, 날짜: formatDateStr(year, month, new Date().getDate()) })); setIsModalOpen(true) }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />일정 추가
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="h-5 w-5" /></button>
          <h2 className="text-xl font-semibold">{year}년 {monthNames[month]}</h2>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="h-5 w-5" /></button>
        </div>

        <div className="grid grid-cols-7">
          {weekDays.map(day => (
            <div key={day} className={'py-3 text-center text-sm font-medium ' + (day === '일' ? 'text-red-500' : day === '토' ? 'text-blue-500' : 'text-gray-500')}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 border-t">
          {days.map((day, idx) => {
            const dayEvents = day ? getEventsForDate(day) : []
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
            const dayOfWeek = idx % 7
            return (
              <div key={idx} onClick={() => day && handleDateClick(day)} className={'min-h-[100px] p-2 border-b border-r cursor-pointer hover:bg-gray-50 ' + (!day ? 'bg-gray-50' : '')}>
                {day && (
                  <>
                    <div className={'text-sm font-medium mb-1 ' + (isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : 'text-gray-900')}>{day}</div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <div key={event.id} onClick={(e) => handleEventClick(event, e)} className={'text-xs px-1 py-0.5 rounded border truncate ' + eventTypeColors[event.유형]}>{event.제목}</div>
                      ))}
                      {dayEvents.length > 3 && <div className="text-xs text-gray-500">+{dayEvents.length - 3}개 더보기</div>}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-gray-900 mb-3">이번 달 일정</h3>
        <div className="space-y-2">
          {events.filter(e => e.날짜.startsWith(year + '-' + String(month + 1).padStart(2, '0'))).sort((a, b) => a.날짜.localeCompare(b.날짜)).map(event => (
            <div key={event.id} onClick={(e) => handleEventClick(event, e)} className={'flex items-center gap-4 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ' + eventTypeColors[event.유형]}>
              <div className="flex-1">
                <p className="font-medium">{event.제목}</p>
                <div className="flex items-center gap-4 text-sm opacity-75 mt-1">
                  <span>{new Date(event.날짜).toLocaleDateString('ko-KR')}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{event.시작시간} - {event.종료시간}</span>
                  {event.장소 && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.장소}</span>}
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-white bg-opacity-50">{event.유형}</span>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm() }} title={editingId ? '일정 수정' : '새 일정'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">제목 <span className="text-red-500">*</span></label><input type="text" name="제목" value={formData.제목} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">날짜 <span className="text-red-500">*</span></label><input type="date" name="날짜" value={formData.날짜} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">유형</label><select name="유형" value={formData.유형} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">{eventTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">시작시간</label><input type="time" name="시작시간" value={formData.시작시간} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">종료시간</label><input type="time" name="종료시간" value={formData.종료시간} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">장소</label><input type="text" name="장소" value={formData.장소} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">메모</label><textarea name="메모" value={formData.메모} onChange={handleChange} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="flex justify-between pt-4 border-t">
            {editingId && <button type="button" onClick={handleDelete} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">삭제</button>}
            <div className="flex gap-3 ml-auto">
              <button type="button" onClick={() => { setIsModalOpen(false); resetForm() }} className="px-4 py-2 border rounded-lg hover:bg-gray-50">취소</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingId ? '수정' : '추가'}</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
