"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Calendar } from 'lucide-react'

export function ApplicationsChart() {
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/analytics')
        if (response.ok) {
          const data = await response.json()
          setChartData(data.applicationsOverTime)
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
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!chartData) {
    return <div>Error loading chart data</div>
  }

  const months = chartData.map((item: any) => item.month)
  const data = chartData.map((item: any) => item.count)
  const maxValue = Math.max(...data, 1) // Ensure at least 1 to avoid division by zero

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Applications Over Time
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            <TrendingUp className="h-3 w-3 mr-1" />
            {data.length > 1 && data[data.length - 1] > data[data.length - 2] ? '+' : ''}
            {data.length > 1 ? Math.round(((data[data.length - 1] - data[data.length - 2]) / Math.max(data[data.length - 2], 1)) * 100) : 0}% this month
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-48 space-x-2">
            {months.map((month, index) => {
              const height = (data[index] / maxValue) * 100
              return (
                <div key={month} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t">
                      <div 
                        className="bg-blue-500 rounded-t transition-all duration-500 ease-out"
                        style={{ height: `${height * 1.6}px` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    {month}
                  </div>
                  <div className="text-xs text-gray-500">
                    {data[index]}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Chart Legend */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-300">Applications</span>
                </div>
                <p className="text-xs text-gray-500 ml-5">
                  Total applications sent each month
                </p>
              </div>
              <div className="space-y-1">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {data.reduce((sum, val) => sum + val, 0)}
                  </div>
                  <div className="text-xs text-gray-500">Total applications</div>
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              📈 Key Insight
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {maxValue > 0 
                ? `You've sent ${data.reduce((sum: number, val: number) => sum + val, 0)} applications over the past 6 months. ${months[data.indexOf(maxValue)]} shows your highest activity with ${maxValue} applications!`
                : "Start tracking your applications to see insights and trends over time."
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 