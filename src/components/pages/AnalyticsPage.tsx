import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Target, 
  CheckCircle2,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Download
} from 'lucide-react'

export function AnalyticsPage() {
  const metrics = [
    {
      title: 'Task Completion Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      title: 'Average Response Time',
      value: '2.4h',
      change: '-12%',
      trend: 'down',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Active Projects',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Team Productivity',
      value: '94%',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  const projectPerformance = [
    { name: 'Website Redesign', completed: 75, total: 100, efficiency: 92 },
    { name: 'Mobile App', completed: 45, total: 100, efficiency: 88 },
    { name: 'API Integration', completed: 100, total: 100, efficiency: 95 },
    { name: 'Marketing Campaign', completed: 15, total: 100, efficiency: 78 },
    { name: 'Database Migration', completed: 30, total: 100, efficiency: 65 }
  ]

  const teamStats = [
    { name: 'John Doe', tasksCompleted: 24, efficiency: 95, role: 'Frontend Developer' },
    { name: 'Jane Smith', tasksCompleted: 18, efficiency: 92, role: 'UI/UX Designer' },
    { name: 'Mike Johnson', tasksCompleted: 21, efficiency: 89, role: 'Backend Developer' },
    { name: 'Sarah Wilson', tasksCompleted: 16, efficiency: 87, role: 'Project Manager' },
    { name: 'Alex Brown', tasksCompleted: 19, efficiency: 91, role: 'DevOps Engineer' }
  ]

  const weeklyData = [
    { day: 'Mon', tasks: 12, hours: 8.5 },
    { day: 'Tue', tasks: 15, hours: 9.2 },
    { day: 'Wed', tasks: 8, hours: 7.8 },
    { day: 'Thu', tasks: 18, hours: 9.5 },
    { day: 'Fri', tasks: 14, hours: 8.0 },
    { day: 'Sat', tasks: 6, hours: 4.2 },
    { day: 'Sun', tasks: 3, hours: 2.1 }
  ]

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600'
    if (efficiency >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 90) return 'bg-green-100 text-green-800 border-green-200'
    if (efficiency >= 80) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track performance and productivity metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-600" />
                  )}
                  <span className="text-green-600">{metric.change}</span> from last period
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Tasks completed and hours worked this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{day.day}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Tasks: {day.tasks}</span>
                      <span>Hours: {day.hours}</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Progress value={(day.tasks / 20) * 100} className="h-2" />
                      </div>
                      <div className="flex-1">
                        <Progress value={(day.hours / 10) * 100} className="h-2 bg-blue-100" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Project Performance
            </CardTitle>
            <CardDescription>Progress and efficiency by project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectPerformance.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{project.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={getEfficiencyBadge(project.efficiency)}>
                        {project.efficiency}%
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {project.completed}%
                      </span>
                    </div>
                  </div>
                  <Progress value={project.completed} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance
            </CardTitle>
            <CardDescription>Individual team member statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamStats.map((member) => (
                <div key={member.name} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{member.tasksCompleted}</div>
                      <div className="text-muted-foreground">Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${getEfficiencyColor(member.efficiency)}`}>
                        {member.efficiency}%
                      </div>
                      <div className="text-muted-foreground">Efficiency</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Total Tasks This Month</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-sm text-muted-foreground">On-Time Delivery</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-sm text-muted-foreground">Active Team Members</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Productivity Insights
          </CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">High Performance</span>
              </div>
              <p className="text-sm text-green-700">
                Task completion rate increased by 15% this month. Great job maintaining quality standards.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Time Management</span>
              </div>
              <p className="text-sm text-yellow-700">
                Consider optimizing meeting schedules. 23% of time spent in meetings this week.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Team Collaboration</span>
              </div>
              <p className="text-sm text-blue-700">
                Cross-team collaboration improved by 28%. Keep up the excellent teamwork.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}