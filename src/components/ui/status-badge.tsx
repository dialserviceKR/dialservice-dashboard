interface StatusBadgeProps {
  status: string
  type?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

const statusColors = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800'
}

export function StatusBadge({ status, type = 'default' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[type]}`}>
      {status}
    </span>
  )
}

// ìíë³ íì ë§¤í
export function getStatusType(status: string): StatusBadgeProps['type'] {
  const statusMap: Record<string, StatusBadgeProps['type']> = {
    // ìì ìí
    'ëê¸°': 'warning',
    'ì§íì¤': 'info',
    'ìë£': 'success',
    'ì·¨ì': 'error',
    // ë¬¸ì ìí
    'ì ì': 'info',
    'ì²ë¦¬ì¤': 'warning',
    'ëµë³ìë£': 'success',
    // ê²¬ì  ìí
    'ìì±ì¤': 'warning',
    'ë°ì¡': 'info',
    'ì¹ì¸': 'success',
    'ê±°ì ': 'error',
    // ì¬ê³  ìí
    'ì ì': 'success',
    'ë¶ì¡±': 'warning',
    'íì ': 'error',
    // ê¸°ë³¸
    'íì±': 'success',
    'ë¹íì±': 'default'
  }
  return statusMap[status] || 'default'
}
