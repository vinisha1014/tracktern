"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown,
  Target,
  Calendar,
  Clock,
  Award
} from 'lucide-react'

export function AnalyticsOverview() {
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/analytics')
        if (response.ok) {
          const data = await response.json()
          setAnalyticsData(data)
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!analyticsData) {
    return <div>Error loading analytics data</div>
  }

  const metrics = [
    {
      title: 'Total Applications',
      value: analyticsData.overview.totalApplications.toString(),
      change: `${analyticsData.overview.changes.applications >= 0 ? '+' : ''}${analyticsData.overview.changes.applications}%`,
      trend: analyticsData.overview.changes.applications >= 0 ? 'up' : 'down',
      period: 'vs last month',
      icon: Target,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Response Rate',
      value: `${analyticsData.overview.responseRate}%`,
      change: `${analyticsData.overview.changes.responseRate >= 0 ? '+' : ''}${analyticsData.overview.changes.responseRate}%`,
      trend: analyticsData.overview.changes.responseRate >= 0 ? 'up' : 'down',
      period: 'vs last month',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Interview Rate',
      value: `${analyticsData.overview.interviewRate}%`,
      change: `${analyticsData.overview.changes.interviewRate >= 0 ? '+' : ''}${analyticsData.overview.changes.interviewRate}%`,
      trend: analyticsData.overview.changes.interviewRate >= 0 ? 'up' : 'down',
      period: 'vs last month',
      icon: Calendar,
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: 'Avg Response Time',
      value: `${analyticsData.overview.avgResponseTime} days`,
      change: `${analyticsData.overview.changes.avgResponseTime >= 0 ? '+' : ''}${analyticsData.overview.changes.avgResponseTime} days`,
      trend: analyticsData.overview.changes.avgResponseTime <= 0 ? 'up' : 'down', // Lower is better for response time
      period: analyticsData.overview.changes.avgResponseTime <= 0 ? 'improvement' : 'slower',
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Offers Received',
      value: analyticsData.overview.offersReceived.toString(),
      change: `${analyticsData.overview.changes.offers >= 0 ? '+' : ''}${analyticsData.overview.changes.offers}`,
      trend: analyticsData.overview.changes.offers >= 0 ? 'up' : 'down',
      period: 'vs last month',
      icon: Award,
      color: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Success Rate',
      value: `${analyticsData.overview.successRate}%`,
      change: `${analyticsData.overview.changes.successRate >= 0 ? '+' : ''}${analyticsData.overview.changes.successRate}%`,
      trend: analyticsData.overview.changes.successRate >= 0 ? 'up' : 'down',
      period: 'vs last month',
      icon: TrendingUp,
      color: 'text-indigo-600 dark:text-indigo-400'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const isPositive = metric.trend === 'up'
        
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Badge 
                    variant="secondary"
                    className={
                      isPositive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }
                  >
                    <div className="flex items-center space-x-1">
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </Badge>
                  <span className="text-gray-500 text-xs">{metric.period}</span>
                </div>
              </div>
            </CardContent>
            
            {/* Gradient background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 dark:to-gray-900/50 pointer-events-none" />
          </Card>
        )
      })}
    </div>
  )
} 