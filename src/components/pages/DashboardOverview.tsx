import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Users,
  Calendar,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react'

export function DashboardOverview() {
  const stats = [
    {
      title: 'Total Tasks',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: CheckSquare,
      color: 'text-blue-600'
    },
    {
      title: 'In Progress',
      value: '8',
      change: '+4%',
      trend: 'up',
      icon: Clock,
      color: 'text-amber-600'
    },
    {
      title: 'Completed',
      value: '16',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  const recentTasks = [
    { id: 1, title: 'Design new landing page', status: 'In Progress', priority: 'High', dueDate: 'Today' },
    { id: 2, title: 'Review pull requests', status: 'Pending', priority: 'Medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Update documentation', status: 'Completed', priority: 'Low', dueDate: 'Yesterday' },
    { id: 4, title: 'Client meeting preparation', status: 'In Progress', priority: 'High', dueDate: 'Today' },
  ]

  const projects = [
    { id: 1, name: 'Website Redesign', progress: 75, team: 5, dueDate: '2024-02-15' },
    { id: 2, name: 'Mobile App', progress: 45, team: 3, dueDate: '2024-03-01' },
    { id: 3, name: 'API Integration', progress: 90, team: 2, dueDate: '2024-01-30' },
  ]

  const upcomingEvents = [
    { id: 1, title: 'Team Standup', time: '9:00 AM', type: 'meeting' },
    { id: 2, title: 'Project Review', time: '2:00 PM', type: 'review' },
    { id: 3, title: 'Client Call', time: '4:30 PM', type: 'call' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Your latest task updates</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Due {task.dueDate}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Upcoming events and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Projects Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Track your active projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{project.name}</h4>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="mb-3" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{project.team} team members</span>
                  <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}