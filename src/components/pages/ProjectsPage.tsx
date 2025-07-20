import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AddProjectDialog } from '@/components/projects/AddProjectDialog'
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react'

interface Project {
  id: number
  name: string
  description: string
  status: 'planning' | 'active' | 'completed' | 'on-hold'
  progress: number
  startDate: string
  endDate: string
  team: { name: string; initials: string }[]
  tasksTotal: number
  tasksCompleted: number
  budget: number
  spent: number
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'active',
      progress: 75,
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      team: [
        { name: 'John Doe', initials: 'JD' },
        { name: 'Jane Smith', initials: 'JS' },
        { name: 'Mike Johnson', initials: 'MJ' },
        { name: 'Sarah Wilson', initials: 'SW' },
        { name: 'Alex Brown', initials: 'AB' }
      ],
      tasksTotal: 24,
      tasksCompleted: 18,
      budget: 50000,
      spent: 37500
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android platforms',
      status: 'active',
      progress: 45,
      startDate: '2024-01-15',
      endDate: '2024-03-01',
      team: [
        { name: 'Emily Davis', initials: 'ED' },
        { name: 'Tom Wilson', initials: 'TW' },
        { name: 'Lisa Chen', initials: 'LC' }
      ],
      tasksTotal: 32,
      tasksCompleted: 14,
      budget: 75000,
      spent: 33750
    },
    {
      id: 3,
      name: 'API Integration',
      description: 'Integration with third-party APIs and internal system connections',
      status: 'completed',
      progress: 100,
      startDate: '2023-12-01',
      endDate: '2024-01-30',
      team: [
        { name: 'David Lee', initials: 'DL' },
        { name: 'Anna Taylor', initials: 'AT' }
      ],
      tasksTotal: 16,
      tasksCompleted: 16,
      budget: 25000,
      spent: 24000
    },
    {
      id: 4,
      name: 'Marketing Campaign',
      description: 'Q1 digital marketing campaign across multiple channels',
      status: 'planning',
      progress: 15,
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      team: [
        { name: 'Rachel Green', initials: 'RG' },
        { name: 'Mark Thompson', initials: 'MT' },
        { name: 'Sophie Miller', initials: 'SM' }
      ],
      tasksTotal: 28,
      tasksCompleted: 4,
      budget: 40000,
      spent: 6000
    },
    {
      id: 5,
      name: 'Database Migration',
      description: 'Migration from legacy database to modern cloud infrastructure',
      status: 'on-hold',
      progress: 30,
      startDate: '2024-01-10',
      endDate: '2024-03-15',
      team: [
        { name: 'Chris Anderson', initials: 'CA' },
        { name: 'Maya Patel', initials: 'MP' }
      ],
      tasksTotal: 20,
      tasksCompleted: 6,
      budget: 35000,
      spent: 10500
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const addProject = (newProjectData: Omit<Project, 'id' | 'progress' | 'tasksTotal' | 'tasksCompleted' | 'spent'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      progress: 0,
      tasksTotal: 0,
      tasksCompleted: 0,
      spent: 0
    }
    setProjects([newProject, ...projects])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'on-hold': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <TrendingUp className="h-4 w-4" />
      case 'completed': return <CheckCircle2 className="h-4 w-4" />
      case 'planning': return <Target className="h-4 w-4" />
      case 'on-hold': return <Clock className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    planning: projects.filter(p => p.status === 'planning').length
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track your project portfolio</p>
        </div>
        <div className="flex items-center justify-end">
          <AddProjectDialog onAddProject={addProject} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{projectStats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{projectStats.completed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planning</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{projectStats.planning}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status: {statusFilter === 'all' ? 'All' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('planning')}>Planning</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('on-hold')}>On Hold</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Status and Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                  </Badge>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Tasks Progress */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tasks</span>
                <span className="font-medium">
                  {project.tasksCompleted}/{project.tasksTotal}
                </span>
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium">
                  ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                </span>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(project.startDate).toLocaleDateString()}
                </div>
                <span>→</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(project.endDate).toLocaleDateString()}
                </div>
              </div>

              {/* Team */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Team</span>
                </div>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 4).map((member, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                      <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.team.length > 4 && (
                    <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">+{project.team.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}