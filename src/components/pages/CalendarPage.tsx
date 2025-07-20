import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  Video,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Event {
  id: number
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  type: 'meeting' | 'task' | 'reminder' | 'call'
  attendees?: string[]
  location?: string
}

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Standup',
      description: 'Daily team standup meeting',
      date: new Date(),
      startTime: '09:00',
      endTime: '09:30',
      type: 'meeting',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Project Review',
      description: 'Review project progress and milestones',
      date: new Date(),
      startTime: '14:00',
      endTime: '15:00',
      type: 'meeting',
      attendees: ['Sarah Wilson', 'Alex Brown'],
      location: 'Virtual'
    },
    {
      id: 3,
      title: 'Client Call',
      description: 'Discuss project requirements with client',
      date: new Date(),
      startTime: '16:30',
      endTime: '17:30',
      type: 'call',
      attendees: ['Client Team'],
      location: 'Zoom'
    },
    {
      id: 4,
      title: 'Design Review',
      description: 'Review new design mockups',
      date: new Date(Date.now() + 86400000), // Tomorrow
      startTime: '10:00',
      endTime: '11:00',
      type: 'meeting',
      attendees: ['Design Team'],
      location: 'Design Studio'
    },
    {
      id: 5,
      title: 'Code Review',
      description: 'Review pull requests and code quality',
      date: new Date(Date.now() + 86400000), // Tomorrow
      startTime: '15:00',
      endTime: '16:00',
      type: 'task',
      attendees: ['Dev Team']
    }
  ])

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'task': return 'bg-green-100 text-green-800 border-green-200'
      case 'call': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'reminder': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="h-3 w-3" />
      case 'task': return <Clock className="h-3 w-3" />
      case 'call': return <Video className="h-3 w-3" />
      case 'reminder': return <CalendarIcon className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  const todayEvents = events.filter(event => 
    event.date.toDateString() === new Date().toDateString()
  )

  const selectedDateEvents = selectedDate ? events.filter(event => 
    event.date.toDateString() === selectedDate.toDateString()
  ) : []

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <div className="flex items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">New Event</span>
                <span className="sm:hidden">New</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Add a new event to your calendar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Event title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Event description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Event location" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Event</Button>
            </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentMonth(new Date())}
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Events</CardTitle>
            <CardDescription>
              {todayEvents.length} events scheduled for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No events scheduled for today
                </p>
              ) : (
                todayEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <Badge size="sm" className={getEventTypeColor(event.type)}>
                          {getEventTypeIcon(event.type)}
                          <span className="ml-1 capitalize">{event.type}</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.startTime} - {event.endTime}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Selected Date Events */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'Select a Date'}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length} events on this date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDateEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No events scheduled for this date
                </p>
              ) : (
                selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className={getEventTypeColor(event.type)}>
                        {getEventTypeIcon(event.type)}
                        <span className="ml-1 capitalize">{event.type}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center gap-2 col-span-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.attendees.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next 5 upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="text-center min-w-[3rem]">
                    <div className="text-sm font-medium">
                      {event.date.getDate()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{event.title}</h4>
                      <Badge size="sm" className={getEventTypeColor(event.type)}>
                        {getEventTypeIcon(event.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.startTime}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}