"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Check
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

interface Reminder {
  id: string
  title: string
  description: string
  type: 'follow-up' | 'interview' | 'deadline' | 'custom'
  priority: 'low' | 'medium' | 'high'
  dueDate: Date
  company?: string
  isCompleted: boolean
  isOverdue: boolean
  internshipId?: string
}

export function RemindersList() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReminders() {
      try {
        const response = await fetch('/api/reminders')
        if (response.ok) {
          const data = await response.json()
          const processedReminders = data.reminders.map((reminder: any) => ({
            ...reminder,
            dueDate: new Date(reminder.dueDate)
          }))
          setReminders(processedReminders)
        }
      } catch (error) {
        console.error('Error fetching reminders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReminders()
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interview': return Calendar
      case 'follow-up': return Clock
      case 'deadline': return AlertTriangle
      default: return CheckCircle
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

  const handleComplete = (reminderId: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, isCompleted: !reminder.isCompleted }
        : reminder
    ))
  }

  const handleDelete = (reminderId: string) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      setReminders(reminders.filter(reminder => reminder.id !== reminderId))
    }
  }

  const filteredReminders = reminders.filter(reminder => 
    reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reminder.company?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pendingReminders = filteredReminders.filter(r => !r.isCompleted)
  const completedReminders = filteredReminders.filter(r => r.isCompleted)
  const overdueReminders = filteredReminders.filter(r => r.isOverdue && !r.isCompleted)

  const ReminderCard = ({ reminder }: { reminder: Reminder }) => {
    const TypeIcon = getTypeIcon(reminder.type)
    
    return (
      <Card className={`${reminder.isOverdue ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : ''} ${reminder.isCompleted ? 'opacity-60' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="flex-shrink-0 mt-1">
                <TypeIcon className={`h-4 w-4 ${reminder.isOverdue ? 'text-red-500' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`text-sm font-medium ${reminder.isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {reminder.title}
                  </h4>
                  {reminder.company && (
                    <Badge variant="outline" className="text-xs">
                      {reminder.company}
                    </Badge>
                  )}
                </div>
                
                {reminder.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    {reminder.description}
                  </p>
                )}
                
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${getPriorityColor(reminder.priority)}`}>
                    {reminder.priority}
                  </Badge>
                  <span className={`text-xs ${reminder.isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {formatDate(reminder.dueDate)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleComplete(reminder.id)}
                className="h-8 w-8 p-0"
              >
                <Check className={`h-4 w-4 ${reminder.isCompleted ? 'text-green-500' : 'text-gray-400'}`} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleDelete(reminder.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Reminders</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search reminders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              Pending ({pendingReminders.length})
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue ({overdueReminders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedReminders.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-3">
            {pendingReminders.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-2">No pending reminders</h3>
                <p className="text-sm">Apply to more positions to get smart follow-up suggestions.</p>
              </div>
            ) : (
              pendingReminders.map(reminder => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="overdue" className="space-y-3">
            {overdueReminders.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                <p className="text-sm">No overdue reminders. Great job staying on top of your applications!</p>
              </div>
            ) : (
              overdueReminders.map(reminder => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-3">
            {completedReminders.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-2">No completed reminders yet</h3>
                <p className="text-sm">Completed reminders will appear here.</p>
              </div>
            ) : (
              completedReminders.map(reminder => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 