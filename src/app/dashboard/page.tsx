import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { UpcomingReminders } from '@/components/dashboard/upcoming-reminders'
import { WeeklyProgress } from '@/components/dashboard/weekly-progress'
import { KanbanBoard } from '@/components/dashboard/kanban-board'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Briefcase, 
  Clock,
  Sparkles,
  ArrowRight,
  Award,
  Zap,
  BarChart3,
  Users,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data - replace with real data fetching
  const stats = {
    totalApplications: 24,
    activeApplications: 8,
    interviews: 3,
    offers: 1,
    successRate: 75
  }

  const todayTasks = [
    { task: 'Follow up with Google recruiter', priority: 'high', time: '2:00 PM' },
    { task: 'Prepare for Microsoft interview', priority: 'high', time: '4:30 PM' },
    { task: 'Submit application to Meta', priority: 'medium', time: '6:00 PM' }
  ]

  const quickStats = [
    { label: 'Response Rate', value: '68%', change: '+12%', positive: true },
    { label: 'Avg. Response Time', value: '5 days', change: '-2 days', positive: true },
    { label: 'Interview Conversion', value: '25%', change: '+5%', positive: true }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John! 👋</h1>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              <CheckCircle className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
          <p className="text-lg text-gray-600">
            You're making great progress! Keep up the momentum to land your dream internship.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline" className="bg-white/50 border-gray-200 hover:bg-blue-50">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-blue-200/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Total Applications</CardTitle>
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">{stats.totalApplications}</div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+3 this week</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-gray-600">Goal: 30 applications this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-green-50 via-white to-emerald-50 border border-green-200/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Success Rate</CardTitle>
              <Target className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.successRate}%</div>
            <p className="text-xs text-green-600 mt-1">↗ Above average</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-purple-200/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Interviews</CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.interviews}</div>
            <p className="text-xs text-purple-600 mt-1">2 scheduled</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-orange-50 via-white to-yellow-50 border border-orange-200/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Offers</CardTitle>
              <Award className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.offers}</div>
            <p className="text-xs text-orange-600 mt-1">🎉 Congratulations!</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                    <Badge variant={stat.positive ? "default" : "destructive"} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Dashboard Stats */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>Application Analytics</span>
                  </CardTitle>
                  <CardDescription>Track your progress and performance</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/analytics">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DashboardStats />
            </CardContent>
          </Card>

          {/* Kanban Board Preview */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                    <span>Application Pipeline</span>
                  </CardTitle>
                  <CardDescription>Track applications across different stages</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/internships">
                    Manage All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="max-h-96 overflow-hidden">
              <KanbanBoard />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Reminders */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg bg-gradient-to-br from-yellow-50 via-white to-orange-50 border border-yellow-200/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span>Today's Tasks</span>
                <Badge className="bg-orange-100 text-orange-700 border border-orange-200">
                  {todayTasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg border border-orange-100">
                  <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-600">{task.time}</p>
                  </div>
                  {task.priority === 'high' && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Calendar className="h-4 w-4 mr-2" />
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <QuickActions />
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Upcoming</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UpcomingReminders />
            </CardContent>
          </Card>

          {/* AI Suggestion Card */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Suggestion</h3>
                  <p className="text-white/80 text-sm">Powered by your data</p>
                </div>
              </div>
              <p className="text-sm text-white/90 mb-4">
                Based on your application pattern, consider applying to 3 more SaaS companies this week to optimize your success rate.
              </p>
              <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Zap className="h-4 w-4 mr-2" />
                Generate Insights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Your latest internship application activities</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  )
} 