"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Target,
  Award
} from 'lucide-react'

interface WeeklyData {
  applicationsThisWeek: number
  interviewsThisWeek: number
  responsesThisWeek: number
  weeklyGoal: number
  weeklyProgress: number
  trend: 'up' | 'down' | 'steady'
  topCompanies: string[]
}

export function WeeklyProgress() {
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeeklyData() {
      try {
        const response = await fetch('/api/internships')
        if (response.ok) {
          const data = await response.json()
          
          // Calculate weekly statistics
          const oneWeekAgo = new Date()
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
          
          const thisWeekApplications = data.internships?.filter((internship: { dateApplied: string }) => {
            const appliedDate = new Date(internship.dateApplied)
            return appliedDate >= oneWeekAgo
          }) || []
          
          const applicationsThisWeek = thisWeekApplications.length
          const interviewsThisWeek = data.statusCounts.interviewing || 0
          const responsesThisWeek = (data.statusCounts.interviewing + data.statusCounts.offer) || 0
          
          const weeklyGoal = 5 // Could be user-configurable
          const weeklyProgress = Math.min((applicationsThisWeek / weeklyGoal) * 100, 100)
          
          // Determine trend (mock calculation)
          const trend = applicationsThisWeek >= 3 ? 'up' : applicationsThisWeek >= 1 ? 'steady' : 'down'
          
          // Get top companies from this week
          const topCompanies = thisWeekApplications
            .map((app: { company: string }) => app.company)
            .slice(0, 3)
          
          setWeeklyData({
            applicationsThisWeek,
            interviewsThisWeek,
            responsesThisWeek,
            weeklyGoal,
            weeklyProgress,
            trend,
            topCompanies
          })
        }
      } catch (error) {
        console.error('Error fetching weekly data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeeklyData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weeklyData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Calendar className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getTrendIcon = () => {
    switch (weeklyData.trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <div className="w-4 h-4 bg-yellow-500 rounded-full" />
    }
  }

  const getTrendColor = () => {
    switch (weeklyData.trend) {
      case 'up': return 'text-green-600 dark:text-green-400'
      case 'down': return 'text-red-600 dark:text-red-400'
      default: return 'text-yellow-600 dark:text-yellow-400'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">This Week</span>
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={`text-sm ${getTrendColor()}`}>
              {weeklyData.trend === 'up' ? 'Great momentum!' : 
               weeklyData.trend === 'down' ? 'Keep pushing!' : 'Steady pace'}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Goal Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Weekly Goal
            </span>
            <span className="font-medium">
              {weeklyData.applicationsThisWeek}/{weeklyData.weeklyGoal} applications
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${weeklyData.weeklyProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {weeklyData.weeklyProgress >= 100 ? 'Goal achieved! 🎉' : 
             `${Math.ceil(weeklyData.weeklyGoal - weeklyData.applicationsThisWeek)} more to reach your goal`}
          </p>
        </div>

        {/* Weekly Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
              {weeklyData.applicationsThisWeek}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              Applications
            </div>
          </div>
          
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-lg font-bold text-green-700 dark:text-green-300">
              {weeklyData.interviewsThisWeek}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">
              Interviews
            </div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
              {weeklyData.responsesThisWeek}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              Responses
            </div>
          </div>
        </div>

        {/* Top Companies This Week */}
        {weeklyData.topCompanies.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium">
              <Award className="h-4 w-4 mr-1" />
              Companies Applied To
            </div>
            <div className="flex flex-wrap gap-1">
              {weeklyData.topCompanies.map((company, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {company}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Motivation Message */}
        <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {weeklyData.applicationsThisWeek >= weeklyData.weeklyGoal ? 
              "Excellent work this week! 🚀" :
              weeklyData.applicationsThisWeek >= 3 ? 
              "You're on track! Keep it up! 💪" :
              "Let's boost those applications! 📈"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 