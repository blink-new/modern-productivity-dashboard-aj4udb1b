import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MoreHorizontal,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed'
  assignee: {
    name: string
    avatar: string
    initials: string
  }
  dueDate: string
  completed: boolean
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Design system updates',
    description: 'Update the design system with new components',
    priority: 'high',
    status: 'in-progress',
    assignee: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
    dueDate: 'Today',
    completed: false
  },
  {
    id: '2',
    title: 'User research interviews',
    description: 'Conduct 5 user interviews for the new feature',
    priority: 'medium',
    status: 'todo',
    assignee: { name: 'Mike Johnson', avatar: '', initials: 'MJ' },
    dueDate: 'Tomorrow',
    completed: false
  },
  {
    id: '3',
    title: 'API documentation',
    description: 'Complete API documentation for v2.0',
    priority: 'low',
    status: 'completed',
    assignee: { name: 'Alex Kim', avatar: '', initials: 'AK' },
    dueDate: 'Yesterday',
    completed: true
  },
  {
    id: '4',
    title: 'Mobile app testing',
    description: 'Test the mobile app on different devices',
    priority: 'high',
    status: 'todo',
    assignee: { name: 'Emma Davis', avatar: '', initials: 'ED' },
    dueDate: 'Friday',
    completed: false
  }
]

export function TasksWidget() {
  const [taskList, setTaskList] = useState(tasks)

  const toggleTask = (taskId: string) => {
    setTaskList(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: task.completed ? 'todo' : 'completed' }
        : task
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />
      case 'todo': return <AlertCircle className="w-4 h-4 text-gray-400" />
      default: return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>
              Manage your tasks and track progress
            </CardDescription>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {taskList.map((task) => (
            <div
              key={task.id}
              className={`flex items-center space-x-4 p-4 rounded-lg border transition-all hover:shadow-sm ${
                task.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
              }`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getStatusIcon(task.status)}
                  <h4 className={`text-sm font-medium ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </Badge>
                </div>
                <p className={`text-sm ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={task.assignee.avatar} />
                      <AvatarFallback className="text-xs">
                        {task.assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-500">{task.assignee.name}</span>
                  </div>
                  <span className={`text-xs ${
                    task.dueDate === 'Today' ? 'text-red-600 font-medium' : 
                    task.dueDate === 'Tomorrow' ? 'text-yellow-600' : 'text-gray-500'
                  }`}>
                    Due {task.dueDate}
                  </span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Assign</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}