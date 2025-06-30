"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Plus
} from 'lucide-react'
import Link from 'next/link'

interface Reminder {
  id: string
  type: 'follow-up' | 'interview' | 'deadline' | 'custom'
  title: string
  description: string
  dueDate: Date
  priority: 'high' | 'medium' | 'low'
  company?: string
  isOverdue: boolean
}

export function UpcomingReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReminders() {
      try {
        const response = await fetch('/api/internships')
        if (response.ok) {
          const data = await response.json()
          
          // Generate smart reminders based on application data
          const generatedReminders: Reminder[] = []
          
          data.internships?.forEach((internship: { id: string; company: string; role: string; status: string; dateApplied: string }) => {
            const appliedDate = new Date(internship.dateApplied)
            const daysSinceApplied = Math.floor((Date.now() - appliedDate.getTime()) / (1000 * 60 * 60 * 24))
            
            // Follow-up reminder after 7 days
            if (daysSinceApplied >= 7 && internship.status === 'APPLIED') {
              const followUpDate = new Date(appliedDate)
              followUpDate.setDate(followUpDate.getDate() + 7)
              
              generatedReminders.push({
                id: `followup-${internship.id}`,
                type: 'follow-up',
                title: `Follow up with ${internship.company}`,
                description: `It's been ${daysSinceApplied} days since you applied`,
                dueDate: followUpDate,
                priority: daysSinceApplied > 14 ? 'high' : 'medium',
                company: internship.company,
                isOverdue: daysSinceApplied > 7
              })
            }
            
            // Mock upcoming interviews for interviewing status
            if (internship.status === 'INTERVIEWING') {
              const interviewDate = new Date()
              interviewDate.setDate(interviewDate.getDate() + Math.floor(Math.random() * 7) + 1)
              
              generatedReminders.push({
                id: `interview-${internship.id}`,
                type: 'interview',
                title: `${internship.company} Interview`,
                description: `Technical interview for ${internship.role}`,
                dueDate: interviewDate,
                priority: 'high',
                company: internship.company,
                isOverdue: false
              })
            }
          })
          
          // Sort by due date
          generatedReminders.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
          setReminders(generatedReminders.slice(0, 5)) // Show top 5
        }
      } catch (error) {
        console.error('Error fetching reminders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReminders()
  }, [])

  const formatDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interview': return Calendar
      case 'follow-up': return Clock
      case 'deadline': return AlertCircle
      default: return CheckCircle
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Upcoming Reminders</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/reminders">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {reminders.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <Clock className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No upcoming reminders</p>
            <p className="text-xs mt-1">Stay on top of your applications!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => {
              const TypeIcon = getTypeIcon(reminder.type)
              return (
                <div 
                  key={reminder.id} 
                  className={`p-3 rounded-lg border-l-4 ${
                    reminder.isOverdue ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2 flex-1">
                      <TypeIcon className="h-4 w-4 mt-0.5 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {reminder.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {reminder.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getPriorityColor(reminder.priority)}`}
                          >
                            {reminder.priority}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatDate(reminder.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            
            <Button asChild variant="outline" size="sm" className="w-full mt-3">
              <Link href="/dashboard/reminders">
                View All Reminders
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 