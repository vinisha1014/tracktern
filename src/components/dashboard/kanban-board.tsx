"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MoreHorizontal, 
  ExternalLink, 
  Calendar,
  MapPin,
  DollarSign,
  Plus
} from 'lucide-react'
import { InternshipStatus } from '@/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Internship {
  id: string
  company: string
  role: string
  status: InternshipStatus
  dateApplied: string
  location?: string
  salary?: string
  tags: string
  link?: string
}

const statusConfig = {
  [InternshipStatus.APPLIED]: {
    title: 'Applied',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-700 dark:text-blue-300'
  },
  [InternshipStatus.INTERVIEWING]: {
    title: 'Interviewing', 
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    textColor: 'text-yellow-700 dark:text-yellow-300'
  },
  [InternshipStatus.OFFER]: {
    title: 'Offer',
    color: 'bg-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-700 dark:text-green-300'
  },
  [InternshipStatus.REJECTED]: {
    title: 'Rejected',
    color: 'bg-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-700 dark:text-red-300'
  },
  [InternshipStatus.WITHDRAWN]: {
    title: 'Withdrawn',
    color: 'bg-gray-500',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20',
    textColor: 'text-gray-700 dark:text-gray-300'
  }
}

export function KanbanBoard() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch('/api/internships')
        if (response.ok) {
          const data = await response.json()
          setInternships(data.internships || [])
        }
      } catch (error) {
        console.error('Error fetching internships:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [])

  const getInternshipsByStatus = (status: InternshipStatus) => {
    return internships.filter(internship => internship.status === status)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-80">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {Object.values(InternshipStatus).map((status: InternshipStatus) => {
        const statusInternships = getInternshipsByStatus(status)
        const config = statusConfig[status]
        
        return (
          <div key={status} className="flex-shrink-0 w-80">
            <div className={cn(
              "rounded-lg p-4 mb-4",
              config.bgColor
            )}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={cn("w-3 h-3 rounded-full", config.color)} />
                  <h3 className={cn("font-semibold", config.textColor)}>
                    {config.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {statusInternships.length}
                  </Badge>
                </div>
                {status === InternshipStatus.APPLIED && (
                  <Button asChild size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Link href="/dashboard/internships/new">
                      <Plus className="h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                {statusInternships.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No applications yet</p>
                    {status === InternshipStatus.APPLIED && (
                      <Button asChild size="sm" variant="outline" className="mt-2">
                        <Link href="/dashboard/internships/new">
                          <Plus className="h-3 w-3 mr-1" />
                          Add First Application
                        </Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  statusInternships.map((internship) => (
                    <Card key={internship.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
                              {internship.company}
                            </CardTitle>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {internship.role}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            Applied {formatDate(internship.dateApplied)}
                          </div>
                          
                          {internship.location && (
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="h-3 w-3 mr-1" />
                              {internship.location}
                            </div>
                          )}
                          
                          {internship.salary && (
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {internship.salary}
                            </div>
                          )}
                          
                          {internship.tags && internship.tags.trim() && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          {internship.link && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full text-xs mt-2"
                              onClick={() => window.open(internship.link, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Posting
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 