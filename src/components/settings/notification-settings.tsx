"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Bell, Save } from 'lucide-react'

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    reminderNotifications: true,
    applicationUpdates: true,
    weeklyDigest: true,
    reminderFrequency: 'daily',
    emailTime: '09:00'
  })

  const handleToggle = (field: string) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving notification settings:', notifications)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* General Notifications */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              General
            </h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive push notifications in browser
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>
          </div>

          {/* Application Notifications */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Applications
            </h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminder-notifications">Reminder Notifications</Label>
                <p className="text-sm text-gray-500">
                  Follow-up and deadline reminders
                </p>
              </div>
              <Switch
                id="reminder-notifications"
                checked={notifications.reminderNotifications}
                onCheckedChange={() => handleToggle('reminderNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="application-updates">Application Updates</Label>
                <p className="text-sm text-gray-500">
                  Status changes and responses
                </p>
              </div>
              <Switch
                id="application-updates"
                checked={notifications.applicationUpdates}
                onCheckedChange={() => handleToggle('applicationUpdates')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-digest">Weekly Digest</Label>
                <p className="text-sm text-gray-500">
                  Summary of your weekly activity
                </p>
              </div>
              <Switch
                id="weekly-digest"
                checked={notifications.weeklyDigest}
                onCheckedChange={() => handleToggle('weeklyDigest')}
              />
            </div>
          </div>

          {/* Timing Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Timing
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
                <Select 
                  value={notifications.reminderFrequency} 
                  onValueChange={(value) => handleSelectChange('reminderFrequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-time">Email Time</Label>
                <Select 
                  value={notifications.emailTime} 
                  onValueChange={(value) => handleSelectChange('emailTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 