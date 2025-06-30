"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { 
  Plus, 
  FileText, 
  MessageSquare, 
  Calendar,
  Clock
} from 'lucide-react'

// Mock data - this will be replaced with real data
const recentActivities = [
  {
    id: '1',
    type: 'application',
    title: 'Applied to Google Software Engineering Intern',
    description: 'Submitted application with resume and cover letter',
    timestamp: new Date('2024-01-15T10:30:00'),
    icon: Plus,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    type: 'interview',
    title: 'Interview scheduled with Microsoft',
    description: 'Technical interview scheduled for Jan 20th at 2:00 PM',
    timestamp: new Date('2024-01-14T14:15:00'),
    icon: Calendar,
    color: 'bg-green-500'
  },
  {
    id: '3',
    type: 'note',
    title: 'Added note to Apple application',
    description: 'Noted contact information for hiring manager',
    timestamp: new Date('2024-01-13T16:45:00'),
    icon: FileText,
    color: 'bg-purple-500'
  },
  {
    id: '4',
    type: 'follow-up',
    title: 'Follow-up reminder for Meta application',
    description: 'AI suggested following up on application from 2 weeks ago',
    timestamp: new Date('2024-01-12T09:20:00'),
    icon: MessageSquare,
    color: 'bg-orange-500'
  },
  {
    id: '5',
    type: 'application',
    title: 'Applied to Netflix Data Science Intern',
    description: 'Application submitted through company portal',
    timestamp: new Date('2024-01-11T11:10:00'),
    icon: Plus,
    color: 'bg-blue-500'
  }
]

export function RecentActivity() {
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${activity.color}`}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 