import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react'

interface Event {
  id: string
  title: string
  time: string
  type: 'meeting' | 'deadline' | 'reminder'
  location?: string
}

const events: Event[] = [
  {
    id: '1',
    title: 'Team Standup',
    time: '9:00 AM',
    type: 'meeting',
    location: 'Conference Room A'
  },
  {
    id: '2',
    title: 'Design Review',
    time: '2:00 PM',
    type: 'meeting',
    location: 'Zoom'
  },
  {
    id: '3',
    title: 'Project Deadline',
    time: '5:00 PM',
    type: 'deadline'
  },
  {
    id: '4',
    title: 'Client Call',
    time: '4:00 PM',
    type: 'meeting',
    location: 'Phone'
  }
]

export function CalendarWidget() {
  const [currentDate] = useState(new Date())
  
  const today = new Date()
  const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentDay = today.getDate()
  const currentWeekday = today.toLocaleString('default', { weekday: 'long' })

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'deadline': return 'bg-red-100 text-red-800'
      case 'reminder': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return '👥'
      case 'deadline': return '⏰'
      case 'reminder': return '🔔'
      default: return '📅'
    }
  }

  // Generate calendar days for current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const days = getDaysInMonth(currentDate)
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Calendar
            </CardTitle>
            <CardDescription>
              {currentWeekday}, {currentMonth} {currentDay}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-center text-sm py-1 cursor-pointer rounded transition-colors ${
                  day === currentDay
                    ? 'bg-primary text-white font-medium'
                    : day
                    ? 'hover:bg-gray-100 text-gray-900'
                    : 'text-gray-300'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Today's Events */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Today's Schedule
          </h4>
          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 rounded-lg border hover:shadow-sm transition-shadow"
              >
                <div className="text-lg">{getEventTypeIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="text-sm font-medium text-gray-900 truncate">
                      {event.title}
                    </h5>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getEventTypeColor(event.type)}`}
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}