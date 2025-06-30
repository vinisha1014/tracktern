"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building } from 'lucide-react'

export function CompanyInsights() {
  const [companyData, setCompanyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/analytics')
        if (response.ok) {
          const data = await response.json()
          setCompanyData(data.companyInsights)
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
            <Building className="h-5 w-5 mr-2" />
            Company Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!companyData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Company Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No company data available yet. Apply to companies to see insights.
          </div>
        </CardContent>
      </Card>
    )
  }

  const { topCompanies, companyTypes } = companyData

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Company Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Company Type Performance */}
          {companyTypes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Performance by Company Type
              </h4>
              <div className="space-y-3">
                {companyTypes.map((type: any) => (
                  <div key={type.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${type.color || 'bg-gray-400'}`} />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {type.type}
                        </div>
                        <div className="text-xs text-gray-500">
                          {type.count} applications
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={type.success > 40 ? 
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 
                        type.success > 20 ? 
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }
                    >
                      {type.success}% success
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Performing Companies */}
          {topCompanies.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Top Companies by Response Rate
              </h4>
              <div className="space-y-2">
                {topCompanies.slice(0, 3).map((company: any, index: number) => (
                  <div key={company.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {company.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {company.applications} applications • {company.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {company.success}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {company.offers} offer{company.offers !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Distribution */}
          {companyTypes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Application Distribution
              </h4>
              <div className="space-y-2">
                {companyTypes.map((type: any) => {
                  const totalApplications = companyTypes.reduce((sum: number, t: any) => sum + t.count, 0)
                  const percentage = totalApplications > 0 ? (type.count / totalApplications) * 100 : 0
                  return (
                    <div key={type.type} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">{type.type}</span>
                        <span className="text-gray-500">{percentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${type.color || 'bg-gray-400'} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Insights */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              💡 Recommendation
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {companyTypes.length > 0 
                ? (() => {
                    const bestType = companyTypes.reduce((prev: any, current: any) => (prev.success > current.success) ? prev : current)
                    return `${bestType.type} companies show the highest success rate (${bestType.success}%). Consider targeting more companies in this category.`
                  })()
                : "Apply to more companies to see personalized recommendations based on your success rates."
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 