"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  MapPin, 
  Briefcase,
  Plus,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import { InternshipStatus } from '@/types'

interface Internship {
  id: string
  company: string
  role: string
  status: InternshipStatus
  dateApplied: string
  location?: string
  tags: string
}

interface UserData {
  internships: Internship[]
  totalCount: number
  statusCounts: {
    applied: number
    interviewing: number
    offer: number
    rejected: number
    withdrawn: number
  }
}

export function DataContext() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/internships')
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Your Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!userData || userData.totalCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Your Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              No internships added yet. Add some to unlock personalized AI components!
            </p>
            <Button asChild>
              <Link href="/dashboard/internships/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Internship
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Your Data</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchUserData}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {userData.totalCount}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Total Applications
              </div>
            </div>
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">
                {userData.statusCounts.interviewing + userData.statusCounts.offer}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                Active Opportunities
              </div>
            </div>
          </div>

          {/* Recent Internships */}
          <div>
            <h4 className="font-medium text-sm mb-2">Ask me about these internships:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {userData.internships.slice(0, 6).map((internship) => (
                <div key={internship.id} className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {internship.company}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                        {internship.role}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {internship.status}
                        </Badge>
                        {internship.location && (
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {internship.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example Queries */}
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium text-sm mb-2">Try asking:</h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
              <p>&quot;Show me my {userData.internships[0]?.company || 'Google'} application details&quot;</p>
              <p>&quot;Compare my FAANG applications&quot;</p>
              <p>&quot;Which applications need follow-up?&quot;</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 