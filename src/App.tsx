import { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { DashboardOverview } from './components/pages/DashboardOverview'
import { TasksPage } from './components/pages/TasksPage'
import { ProjectsPage } from './components/pages/ProjectsPage'
import { CalendarPage } from './components/pages/CalendarPage'
import { AnalyticsPage } from './components/pages/AnalyticsPage'
import { SettingsPage } from './components/pages/SettingsPage'

export type Page = 'dashboard' | 'tasks' | 'projects' | 'calendar' | 'analytics' | 'settings'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />
      case 'tasks':
        return <TasksPage />
      case 'projects':
        return <ProjectsPage />
      case 'calendar':
        return <CalendarPage />
      case 'analytics':
        return <AnalyticsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App