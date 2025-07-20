import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { 
  FolderOpen,
  Users,
  Calendar,
  MoreHorizontal
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  progress: number
  status: 'active' | 'completed' | 'on-hold'
  dueDate: string
  team: Array<{
    name: string
    avatar: string
    initials: string
  }>
  color: string
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website',
    progress: 75,
    status: 'active',
    dueDate: 'Dec 15, 2024',
    team: [
      { name: 'Sarah Chen', avatar: '', initials: 'SC' },
      { name: 'Mike Johnson', avatar: '', initials: 'MJ' },
      { name: 'Alex Kim', avatar: '', initials: 'AK' }
    ],
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'iOS and Android app development',
    progress: 45,
    status: 'active',
    dueDate: 'Jan 30, 2025',
    team: [
      { name: 'Emma Davis', avatar: '', initials: 'ED' },
      { name: 'John Smith', avatar: '', initials: 'JS' }
    ],
    color: 'bg-green-500'
  },
  {
    id: '3',
    name: 'Brand Guidelines',
    description: 'New brand identity and guidelines',
    progress: 100,
    status: 'completed',
    dueDate: 'Nov 20, 2024',
    team: [
      { name: 'Lisa Wong', avatar: '', initials: 'LW' }
    ],
    color: 'bg-purple-500'
  }
]

export function ProjectsWidget() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'on-hold': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <FolderOpen className="w-5 h-5 mr-2" />
              Active Projects
            </CardTitle>
            <CardDescription>
              Track project progress and deadlines
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full ${project.color} mt-2`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {project.name}
                      </h4>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {project.description}
                    </p>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-medium text-gray-900">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    {/* Team and Due Date */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1">
                        <div className="flex -space-x-1">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="w-6 h-6 border-2 border-white">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="text-xs">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                              <span className="text-xs text-gray-600">
                                +{project.team.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {project.team.length} member{project.team.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{project.dueDate}</span>
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
            View All Projects
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}