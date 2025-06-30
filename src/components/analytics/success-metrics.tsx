"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target } from 'lucide-react'

export function SuccessMetrics() {
  const [funnelData, setFunnelData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/analytics')
        if (response.ok) {
          const data = await response.json()
          const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-purple-500']
          const processedData = data.funnelData.map((item: any, index: number) => ({
            ...item,
            color: colors[index] || 'bg-gray-500'
          }))
          setFunnelData(processedData)
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
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Success Funnel
          </CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            {funnelData.length > 0 ? funnelData[funnelData.length - 1].percentage : 0}% success rate
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Funnel Visualization */}
          <div className="space-y-3">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stage.stage}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      {stage.count}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({stage.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`${stage.color} h-3 rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                {index < funnelData.length - 1 && (
                  <div className="flex justify-center">
                    <div className="text-xs text-gray-400">↓</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conversion Rates */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Conversion Rates
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {funnelData.length > 1 ? funnelData[1].percentage : 0}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Response Rate</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {funnelData.length > 2 ? Math.round((funnelData[2].count / Math.max(funnelData[1].count, 1)) * 100) : 0}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Interview Conversion</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {funnelData.length > 3 ? Math.round((funnelData[3].count / Math.max(funnelData[2].count, 1)) * 100) : 0}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Final Round Rate</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {funnelData.length > 4 ? Math.round((funnelData[4].count / Math.max(funnelData[3].count, 1)) * 100) : 0}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Offer Conversion</div>
              </div>
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
              🎯 Performance vs Industry
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              {funnelData.length > 1 
                ? `Your ${funnelData[1].percentage}% response rate is ${funnelData[1].percentage > 25 ? 'above' : 'below'} the industry average of 25%.`
                : "Apply to more positions to see your success metrics and compare with industry benchmarks."
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 