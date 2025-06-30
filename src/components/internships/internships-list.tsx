"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MoreHorizontal, 
  ExternalLink, 
  Calendar,
  MapPin,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  Briefcase,
  Plus,
  Clock,
  Building2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InternshipStatus } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
  description?: string
  notes: { id: string; content: string; createdAt: string }[]
}

interface InternshipsListProps {
  searchParams: {
    status?: string
    search?: string
    sort?: string
  }
}

export function InternshipsList({ searchParams }: InternshipsListProps) {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch('/api/internships')
        if (response.ok) {
          const data = await response.json()
          let filteredInternships = data.internships || []

          // Filter by status
          if (searchParams.status && searchParams.status !== 'all') {
            filteredInternships = filteredInternships.filter(
              (internship: Internship) => internship.status === (searchParams.status?.toUpperCase() as InternshipStatus)
            )
          }

          // Filter by search term
          if (searchParams.search) {
            const searchTerm = searchParams.search.toLowerCase()
            filteredInternships = filteredInternships.filter(
              (internship: Internship) => 
                internship.company.toLowerCase().includes(searchTerm) ||
                internship.role.toLowerCase().includes(searchTerm)
            )
          }

          // Sort internships
          const sortBy = searchParams.sort || 'newest'
          filteredInternships.sort((a: Internship, b: Internship) => {
            switch (sortBy) {
              case 'oldest':
                return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
              case 'company':
                return a.company.localeCompare(b.company)
              case 'status':
                return a.status.localeCompare(b.status)
              default: // newest
                return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
            }
          })

          setInternships(filteredInternships)
        }
      } catch (error) {
        console.error('Error fetching internships:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [searchParams])

  const getStatusColor = (status: InternshipStatus) => {
    switch (status) {
      case InternshipStatus.APPLIED:
        return 'status-applied'
      case InternshipStatus.INTERVIEWING:
        return 'status-interviewing'
      case InternshipStatus.OFFER:
        return 'status-offer'
      case InternshipStatus.REJECTED:
        return 'status-rejected'
      case InternshipStatus.WITHDRAWN:
        return 'status-withdrawn'
      default:
        return 'status-withdrawn'
    }
  }

  const getStatusIcon = (status: InternshipStatus) => {
    switch (status) {
      case InternshipStatus.APPLIED:
        return <Clock className="h-3 w-3" />
      case InternshipStatus.INTERVIEWING:
        return <Calendar className="h-3 w-3" />
      case InternshipStatus.OFFER:
        return <Building2 className="h-3 w-3" />
      case InternshipStatus.REJECTED:
        return <Eye className="h-3 w-3" />
      case InternshipStatus.WITHDRAWN:
        return <MoreHorizontal className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-card border border-border/50 shadow-sm animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                  <div className="h-8 w-8 bg-muted rounded-lg" />
                </div>
                <div className="h-6 bg-muted rounded w-20" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (internships.length === 0) {
    return (
      <Card className="bg-card border border-border/50 shadow-sm">
        <CardContent className="p-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted/50 rounded-xl flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                No internships found
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                {searchParams.search || searchParams.status 
                  ? "Try adjusting your filters or search terms to find more results."
                  : "Get started by adding your first internship application to begin tracking your journey."
                }
              </p>
            </div>
            <Button asChild className="shadow-sm hover:shadow-md">
              <Link href="/dashboard/internships/new">
                <Plus className="h-4 w-4 mr-2" />
                Add First Internship
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {internships.length} internship{internships.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship, index) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="bg-card border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-bold text-foreground truncate">
                        {internship.company}
                      </CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {internship.role}
                    </p>
                    <Badge 
                      className={cn("text-xs w-fit", getStatusColor(internship.status))}
                    >
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(internship.status)}
                        <span>{internship.status}</span>
                      </span>
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Application
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground/70" />
                      <span>Applied {formatDate(internship.dateApplied)} · {getDaysAgo(internship.dateApplied)}d ago</span>
                    </div>
                    
                    {internship.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground/70" />
                        <span className="truncate">{internship.location}</span>
                      </div>
                    )}
                    
                    {internship.salary && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground/70" />
                        <span>{internship.salary}</span>
                      </div>
                    )}

                    {internship.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {internship.description}
                      </p>
                    )}

                    {internship.tags && internship.tags.trim() && (
                      <div className="flex flex-wrap gap-1.5">
                        {internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-muted/50 border-border/50">
                            {tag}
                          </Badge>
                        ))}
                        {internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).length > 3 && (
                          <Badge variant="outline" className="text-xs bg-muted/50 border-border/50">
                            +{internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="text-xs text-muted-foreground">
                      {internship.notes.length} note{internship.notes.length !== 1 ? 's' : ''}
                    </div>
                    {internship.link && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs h-8 px-3 hover:bg-accent"
                        onClick={() => window.open(internship.link, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Posting
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {internships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                    {internship.company}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {internship.role}
                  </p>
                  <Badge 
                    className={`mt-2 ${getStatusColor(internship.status)}`}
                  >
                    {internship.status}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  Applied {formatDate(internship.dateApplied)} ({getDaysAgo(internship.dateApplied)} days ago)
                </div>
                
                {internship.location && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    {internship.location}
                  </div>
                )}
                
                {internship.salary && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {internship.salary}
                  </div>
                )}

                {internship.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {internship.description}
                  </p>
                )}

                {internship.tags && internship.tags.trim() && (
                  <div className="flex flex-wrap gap-1">
                    {internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{internship.tags.split(',').map(tag => tag.trim()).filter(tag => tag).length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    {internship.notes.length} note{internship.notes.length !== 1 ? 's' : ''}
                  </div>
                  {internship.link && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.open(internship.link, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Posting
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 