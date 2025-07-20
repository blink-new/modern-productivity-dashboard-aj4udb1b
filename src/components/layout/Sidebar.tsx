import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderOpen, 
  Calendar, 
  BarChart3, 
  Settings,
  X,
  User,
  LogOut
} from 'lucide-react'
import type { Page } from '@/App'

interface SidebarProps {
  currentPage: Page
  onPageChange: (page: Page) => void
  isOpen: boolean
  onToggle: () => void
}

const navigation = [
  { name: 'Dashboard', page: 'dashboard' as Page, icon: LayoutDashboard },
  { name: 'Tasks', page: 'tasks' as Page, icon: CheckSquare },
  { name: 'Projects', page: 'projects' as Page, icon: FolderOpen },
  { name: 'Calendar', page: 'calendar' as Page, icon: Calendar },
  { name: 'Analytics', page: 'analytics' as Page, icon: BarChart3 },
  { name: 'Settings', page: 'settings' as Page, icon: Settings },
]

function SidebarContent({ currentPage, onPageChange }: { currentPage: Page; onPageChange: (page: Page) => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">ProductivePro</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.page}
                variant={currentPage === item.page ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  currentPage === item.page && "bg-primary/10 text-primary hover:bg-primary/15"
                )}
                onClick={() => onPageChange(item.page)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full h-auto p-3 justify-start">
              <div className="flex items-center space-x-3 w-full">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">JD</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onPageChange('settings')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPageChange('settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export function Sidebar({ currentPage, onPageChange, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r">
          <SidebarContent currentPage={currentPage} onPageChange={onPageChange} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="left" className="p-0 w-64">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-full flex-col bg-card">
            <SidebarContent currentPage={currentPage} onPageChange={onPageChange} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}