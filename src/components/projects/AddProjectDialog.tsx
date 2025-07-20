import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, X } from 'lucide-react'

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

interface AddProjectDialogProps {
  onAddProject: (project: Omit<Project, 'id' | 'progress' | 'tasksTotal' | 'tasksCompleted' | 'spent'>) => void
}

export function AddProjectDialog({ onAddProject }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'planning' | 'active' | 'completed' | 'on-hold'>('planning')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [budget, setBudget] = useState('')
  const [teamMembers, setTeamMembers] = useState<{ name: string; initials: string }[]>([])
  const [newMemberName, setNewMemberName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) return

    const newProject: Omit<Project, 'id' | 'progress' | 'tasksTotal' | 'tasksCompleted' | 'spent'> = {
      name: name.trim(),
      description: description.trim(),
      status,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      budget: budget ? parseInt(budget) : 0,
      team: teamMembers
    }

    onAddProject(newProject)
    
    // Reset form
    setName('')
    setDescription('')
    setStatus('planning')
    setStartDate('')
    setEndDate('')
    setBudget('')
    setTeamMembers([])
    setNewMemberName('')
    setOpen(false)
  }

  const addTeamMember = () => {
    if (newMemberName.trim()) {
      const initials = newMemberName.trim()
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
      
      setTeamMembers([...teamMembers, { 
        name: newMemberName.trim(), 
        initials 
      }])
      setNewMemberName('')
    }
  }

  const removeMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTeamMember()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Project</span>
          <span className="sm:hidden">New</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Start a new project and set up your team.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: 'planning' | 'active' | 'completed' | 'on-hold') => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team Members</Label>
            <div className="flex gap-2">
              <Input
                id="team"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add team member..."
              />
              <Button type="button" variant="outline" onClick={addTeamMember}>
                Add
              </Button>
            </div>
            {teamMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {teamMembers.map((member, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {member.name}
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setOpen(false)
                // Reset form on cancel
                setName('')
                setDescription('')
                setStatus('planning')
                setStartDate('')
                setEndDate('')
                setBudget('')
                setTeamMembers([])
                setNewMemberName('')
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}