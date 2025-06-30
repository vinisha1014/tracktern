import { Navbar } from '@/components/dashboard/navbar'
import { Sidebar } from '@/components/dashboard/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      
      {/* Navigation */}
      <Navbar />
      
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-72 lg:flex-col">
          <div className="flex flex-col flex-grow">
            <Sidebar />
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 relative overflow-y-auto">
            {/* Content Container */}
            <div className="container-padding section-padding">
              <div className="max-w-7xl mx-auto">
                {/* Content Wrapper */}
                <div className="animate-slide-up">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}