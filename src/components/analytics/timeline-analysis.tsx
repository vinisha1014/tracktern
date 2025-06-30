"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

export function TimelineAnalysis() {
  const [timelineData, setTimelineData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/analytics')
        if (response.ok) {
          const data = await response.json()
          setTimelineData(data.timelineAnalysis)
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Timeline Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!timelineData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Timeline Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No timeline data available yet. Apply to more positions to see insights.
          </div>
        </CardContent>
      </Card>
    )
  }

  const { dayOfWeekData, timeOfDayData, responseTimeData } = timelineData
  const maxDayApplications = Math.max(...dayOfWeekData.map((d: any) => d.applications), 1)
  const maxTimeApplications = Math.max(...timeOfDayData.map((d: any) => d.applications), 1)
  const bestDay = dayOfWeekData.reduce((prev: any, current: any) => (prev.rate > current.rate) ? prev : current, { day: '', rate: 0 })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Timeline Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Best Days to Apply */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Best Days to Apply
              </h4>
              {bestDay.rate > 0 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  {bestDay.day}: {bestDay.rate}% response rate
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {dayOfWeekData.map((day: any) => (
                <div key={day.day} className="text-center">
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {day.day}
                  </div>
                  <div className="space-y-1">
                    <div 
                      className="bg-blue-200 dark:bg-blue-800 rounded"
                      style={{ height: `${(day.applications / maxDayApplications) * 40 + 10}px` }}
                    />
                    <div className="text-xs text-gray-500">
                      {day.applications}
                    </div>
                    <div className={`text-xs font-medium ${
                      day.rate > 35 ? 'text-green-600' : 
                      day.rate > 20 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {day.rate}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Times to Apply */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Best Times to Apply
            </h4>
            <div className="space-y-2">
              {timeOfDayData.map((timeSlot: any) => (
                <div key={timeSlot.time} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 text-sm text-gray-600 dark:text-gray-300">
                      {timeSlot.time}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full"
                          style={{ width: `${(timeSlot.applications / maxTimeApplications) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {timeSlot.applications}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        timeSlot.rate > 40 ? 'border-green-300 text-green-700' :
                        timeSlot.rate > 25 ? 'border-yellow-300 text-yellow-700' :
                        'border-red-300 text-red-700'
                      }`}
                    >
                      {timeSlot.rate}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Response Time Distribution
            </h4>
            <div className="space-y-2">
              {responseTimeData.map((range: any) => (
                <div key={range.range} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-20 text-sm text-gray-600 dark:text-gray-300">
                      {range.range}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${range.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {range.count}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ({range.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                🎯 Optimal Time
              </h5>
              <p className="text-sm text-green-700 dark:text-green-300">
                {bestDay.rate > 0 && timeOfDayData.length > 0
                  ? (() => {
                      const bestTime = timeOfDayData.reduce((prev: any, current: any) => (prev.rate > current.rate) ? prev : current)
                      return `${bestDay.day} ${bestTime.time} shows the highest response rate at ${bestTime.rate}%.`
                    })()
                  : "Apply to more positions to discover your optimal application times."
                }
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h5 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                ⚡ Quick Responses
              </h5>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {responseTimeData.length > 0 
                  ? `${responseTimeData[0].percentage}% of responses come within ${responseTimeData[0].range.toLowerCase()}. Follow up after a week.`
                  : "Track more applications to see response time patterns."
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 