"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  TrendingUp
} from 'lucide-react'

interface StatsData {
  totalApplications: number
  inProgress: number
  offers: number
  responseRate: number
  weeklyChange: {
    applications: number
    progress: number
    offers: number
    rate: number
  }
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/internships')
        if (response.ok) {
          const data = await response.json()
          
          const totalApplications = data.totalCount
          const inProgress = data.statusCounts.interviewing
          const offers = data.statusCounts.offer
          const responseRate = totalApplications > 0 
            ? Math.round(((inProgress + offers) / totalApplications) * 100)
            : 0

          // Calculate weekly changes (mock for now - could be enhanced with historical data)
          const weeklyChange = {
            applications: Math.floor(Math.random() * 5) + 1,
            progress: Math.floor(Math.random() * 3),
            offers: Math.floor(Math.random() * 2),
            rate: Math.floor(Math.random() * 10) - 5
          }

          setStats({
            totalApplications,
            inProgress,
            offers,
            responseRate,
            weeklyChange
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statsData = [
    {
      title: 'Total Applications',
      value: stats?.totalApplications.toString() || '0',
      change: `+${stats?.weeklyChange.applications || 0}`,
      changeType: 'positive' as const,
      icon: Briefcase,
      description: 'this week'
    },
    {
      title: 'In Progress',
      value: stats?.inProgress.toString() || '0',
      change: `+${stats?.weeklyChange.progress || 0}`,
      changeType: 'positive' as const,
      icon: Clock,
      description: 'active interviews'
    },
    {
      title: 'Offers Received',
      value: stats?.offers.toString() || '0',
      change: `+${stats?.weeklyChange.offers || 0}`,
      changeType: 'positive' as const,
      icon: CheckCircle,
      description: 'pending decisions'
    },
    {
      title: 'Response Rate',
      value: `${stats?.responseRate || 0}%`,
      change: `${stats?.weeklyChange.rate || 0}%`,
      changeType: (stats?.weeklyChange.rate || 0) >= 0 ? 'positive' as const : 'negative' as const,
      icon: TrendingUp,
      description: 'success rate'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-300">
                <Badge 
                  variant="secondary"
                  className={
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }
                >
                  {stat.change}
                </Badge>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 