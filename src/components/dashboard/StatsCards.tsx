import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckSquare, 
  Clock, 
  Users, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const stats = [
  {
    title: 'Total Tasks',
    value: '142',
    change: '+12%',
    changeType: 'positive' as const,
    icon: CheckSquare,
    description: 'from last month'
  },
  {
    title: 'In Progress',
    value: '23',
    change: '+4%',
    changeType: 'positive' as const,
    icon: Clock,
    description: 'active tasks'
  },
  {
    title: 'Team Members',
    value: '8',
    change: '+2',
    changeType: 'positive' as const,
    icon: Users,
    description: 'new this month'
  },
  {
    title: 'Productivity',
    value: '94%',
    change: '-2%',
    changeType: 'negative' as const,
    icon: TrendingUp,
    description: 'completion rate'
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge 
                variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                className="flex items-center space-x-1"
              >
                {stat.changeType === 'positive' ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                <span>{stat.change}</span>
              </Badge>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </CardContent>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        </Card>
      ))}
    </div>
  )
}