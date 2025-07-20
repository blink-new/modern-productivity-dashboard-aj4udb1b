import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity,
  CheckCircle2,
  MessageSquare,
  UserPlus,
  FileText,
  GitCommit
} from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'task_completed' | 'comment' | 'user_joined' | 'file_uploaded' | 'commit'
  user: {
    name: string
    avatar: string
    initials: string
  }
  action: string
  target?: string
  timestamp: string
  details?: string
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'task_completed',
    user: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
    action: 'completed task',
    target: 'Design system updates',
    timestamp: '2 minutes ago'
  },
  {
    id: '2',
    type: 'comment',
    user: { name: 'Mike Johnson', avatar: '', initials: 'MJ' },
    action: 'commented on',
    target: 'Website Redesign',
    timestamp: '15 minutes ago',
    details: 'Looks great! Ready for review.'
  },
  {
    id: '3',
    type: 'user_joined',
    user: { name: 'Emma Davis', avatar: '', initials: 'ED' },
    action: 'joined the team',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'file_uploaded',
    user: { name: 'Alex Kim', avatar: '', initials: 'AK' },
    action: 'uploaded file',
    target: 'wireframes.fig',
    timestamp: '2 hours ago'
  },
  {
    id: '5',
    type: 'commit',
    user: { name: 'John Smith', avatar: '', initials: 'JS' },
    action: 'pushed commit',
    target: 'feat: add user authentication',
    timestamp: '3 hours ago'
  },
  {
    id: '6',
    type: 'task_completed',
    user: { name: 'Lisa Wong', avatar: '', initials: 'LW' },
    action: 'completed task',
    target: 'Brand guidelines review',
    timestamp: '4 hours ago'
  }
]

export function ActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'comment': return <MessageSquare className="w-4 h-4 text-blue-500" />
      case 'user_joined': return <UserPlus className="w-4 h-4 text-purple-500" />
      case 'file_uploaded': return <FileText className="w-4 h-4 text-orange-500" />
      case 'commit': return <GitCommit className="w-4 h-4 text-gray-500" />
      default: return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'task_completed': return 'border-green-200 bg-green-50'
      case 'comment': return 'border-blue-200 bg-blue-50'
      case 'user_joined': return 'border-purple-200 bg-purple-50'
      case 'file_uploaded': return 'border-orange-200 bg-orange-50'
      case 'commit': return 'border-gray-200 bg-gray-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Stay updated with team activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {/* Timeline line */}
              {index < activities.length - 1 && (
                <div className="absolute left-6 top-8 w-px h-8 bg-gray-200" />
              )}
              
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <Avatar className="w-8 h-8">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="text-xs">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={`p-3 rounded-lg border ${getActivityColor(activity.type)}`}>
                    <div className="flex items-start space-x-2">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user.name}</span>
                          {' '}{activity.action}
                          {activity.target && (
                            <span className="font-medium text-gray-700">
                              {' '}{activity.target}
                            </span>
                          )}
                        </p>
                        {activity.details && (
                          <p className="text-sm text-gray-600 mt-1">
                            "{activity.details}"
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}