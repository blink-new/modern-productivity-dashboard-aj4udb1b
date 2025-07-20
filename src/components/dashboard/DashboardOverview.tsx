import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  CheckSquare, 
  Clock, 
  Users, 
  TrendingUp,
  Plus,
  MoreHorizontal,
  Calendar,
  Target,
  Activity
} from 'lucide-react'
import { StatsCards } from './StatsCards'
import { TasksWidget } from './TasksWidget'
import { ProjectsWidget } from './ProjectsWidget'
import { CalendarWidget } from './CalendarWidget'
import { ActivityFeed } from './ActivityFeed'
import { AnalyticsChart } from './AnalyticsChart'

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Good morning, John! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks and Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Analytics Chart */}
          <AnalyticsChart />
          
          {/* Tasks Widget */}
          <TasksWidget />
        </div>

        {/* Right Column - Calendar and Activity */}
        <div className="space-y-6">
          {/* Calendar Widget */}
          <CalendarWidget />
          
          {/* Projects Widget */}
          <ProjectsWidget />
          
          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>

      {/* Quick Actions Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <CheckSquare className="w-6 h-6 mb-2" />
              Create Task
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              Invite Team
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="w-6 h-6 mb-2" />
              View Reports
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              Schedule Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}