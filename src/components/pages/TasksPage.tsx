import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AddTaskDialog } from '@/components/tasks/AddTaskDialog'
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  User,
  Flag,
  CheckCircle2,
  Circle,
  Clock,
  GripVertical
} from 'lucide-react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Task {
  id: number
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  assignee: string
  dueDate: string
  tags: string[]
}

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Design new landing page',
      description: 'Create a modern, responsive landing page for the new product launch',
      status: 'in-progress',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-01-20',
      tags: ['design', 'frontend']
    },
    {
      id: 2,
      title: 'Review pull requests',
      description: 'Review and approve pending pull requests from the development team',
      status: 'todo',
      priority: 'medium',
      assignee: 'Jane Smith',
      dueDate: '2024-01-21',
      tags: ['code-review', 'development']
    },
    {
      id: 3,
      title: 'Update documentation',
      description: 'Update API documentation with new endpoints and examples',
      status: 'completed',
      priority: 'low',
      assignee: 'Mike Johnson',
      dueDate: '2024-01-19',
      tags: ['documentation', 'api']
    },
    {
      id: 4,
      title: 'Client meeting preparation',
      description: 'Prepare presentation materials for the upcoming client meeting',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sarah Wilson',
      dueDate: '2024-01-20',
      tags: ['meeting', 'presentation']
    },
    {
      id: 5,
      title: 'Database optimization',
      description: 'Optimize database queries to improve application performance',
      status: 'todo',
      priority: 'medium',
      assignee: 'Alex Brown',
      dueDate: '2024-01-22',
      tags: ['database', 'performance']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [activeId, setActiveId] = useState<number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const addTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Math.max(...tasks.map(t => t.id), 0) + 1
    }
    setTasks([newTask, ...tasks])
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
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'todo': return <Circle className="h-4 w-4 text-gray-400" />
      default: return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === 'all') return matchesSearch
    return matchesSearch && task.status === activeTab
  })

  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed')
  }

  const updateTaskStatus = (taskId: number, newStatus: 'todo' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeTask = tasks.find(task => task.id === active.id)
    if (!activeTask) return

    // Check if dropped on a different column or task
    const overData = over.data.current
    if (overData?.type === 'column') {
      const newStatus = overData.status as 'todo' | 'in-progress' | 'completed'
      if (activeTask.status !== newStatus) {
        updateTaskStatus(activeTask.id, newStatus)
      }
    } else if (overData?.type === 'task') {
      // If dropped on another task, move to that task's column
      const overTask = overData.task as Task
      if (activeTask.status !== overTask.status) {
        updateTaskStatus(activeTask.id, overTask.status)
      }
    }
  }

  const activeTask = tasks.find(task => task.id === activeId)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your tasks efficiently</p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <AddTaskDialog onAddTask={addTask} />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Task Views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="w-full justify-start min-w-max">
            <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
            <TabsTrigger value="todo">To Do ({tasksByStatus.todo.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({tasksByStatus['in-progress'].length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({tasksByStatus.completed.length})</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <TaskList tasks={filteredTasks} onStatusChange={updateTaskStatus} />
        </TabsContent>

        <TabsContent value="todo" className="mt-6">
          <TaskList tasks={tasksByStatus.todo} onStatusChange={updateTaskStatus} />
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          <TaskList tasks={tasksByStatus['in-progress']} onStatusChange={updateTaskStatus} />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <TaskList tasks={tasksByStatus.completed} onStatusChange={updateTaskStatus} />
        </TabsContent>
      </Tabs>

      {/* Kanban Board View with Drag and Drop */}
      <Card>
        <CardHeader>
          <CardTitle>Kanban Board</CardTitle>
          <CardDescription>Drag and drop tasks between columns to change their status</CardDescription>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KanbanColumn 
                title="To Do" 
                tasks={tasksByStatus.todo} 
                onStatusChange={updateTaskStatus}
                targetStatus="todo"
              />
              <KanbanColumn 
                title="In Progress" 
                tasks={tasksByStatus['in-progress']} 
                onStatusChange={updateTaskStatus}
                targetStatus="in-progress"
              />
              <KanbanColumn 
                title="Completed" 
                tasks={tasksByStatus.completed} 
                onStatusChange={updateTaskStatus}
                targetStatus="completed"
              />
            </div>
            
            <DragOverlay>
              {activeTask ? (
                <KanbanTaskCard task={activeTask} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  )
}

function TaskList({ tasks, onStatusChange }: { 
  tasks: Task[]
  onStatusChange: (taskId: number, status: 'todo' | 'in-progress' | 'completed') => void 
}) {
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
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'todo': return <Circle className="h-4 w-4 text-gray-400" />
      default: return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <button 
                  onClick={() => {
                    const nextStatus = task.status === 'todo' ? 'in-progress' : 
                                    task.status === 'in-progress' ? 'completed' : 'todo'
                    onStatusChange(task.id, nextStatus)
                  }}
                  className="mt-1"
                >
                  {getStatusIcon(task.status)}
                </button>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <Badge className={getPriorityColor(task.priority)}>
                      <Flag className="h-3 w-3 mr-1" />
                      {task.priority}
                    </Badge>
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function KanbanColumn({ 
  title, 
  tasks, 
  onStatusChange, 
  targetStatus 
}: { 
  title: string
  tasks: Task[]
  onStatusChange: (taskId: number, status: 'todo' | 'in-progress' | 'completed') => void
  targetStatus: 'todo' | 'in-progress' | 'completed'
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${targetStatus}`,
    data: {
      type: 'column',
      status: targetStatus,
    },
  })

  const getColumnColor = (status: string) => {
    switch (status) {
      case 'todo': return 'border-gray-200'
      case 'in-progress': return 'border-blue-200'
      case 'completed': return 'border-green-200'
      default: return 'border-gray-200'
    }
  }

  return (
    <div 
      ref={setNodeRef}
      className={`bg-muted/30 rounded-lg p-4 min-h-[400px] border-2 border-dashed transition-colors ${
        isOver ? 'border-primary bg-primary/5' : getColumnColor(targetStatus)
      }`}
    >
      <h3 className="font-medium mb-4 flex items-center justify-between">
        {title}
        <Badge variant="secondary">{tasks.length}</Badge>
      </h3>
      
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tasks.map((task) => (
            <KanbanTaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-sm">Drop tasks here</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

function KanbanTaskCard({ task, isDragging = false }: { task: Task; isDragging?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  }

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={`cursor-move hover:shadow-md transition-all duration-200 ${
        isDragging ? 'rotate-3 shadow-lg scale-105' : ''
      } ${isSortableDragging ? 'opacity-50' : 'hover:scale-[1.02]'}`}
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm flex-1">{task.title}</h4>
          <GripVertical className="h-4 w-4 text-muted-foreground ml-2 flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between">
          <Badge size="sm" className={
            task.priority === 'high' ? 'bg-red-100 text-red-800' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }>
            {task.priority}
          </Badge>
          
          <div className="text-xs text-muted-foreground">
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          {task.assignee}
        </div>
      </CardContent>
    </Card>
  )
}