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
import { Palette, Save } from 'lucide-react'

export function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    theme: 'system',
    weeklyGoal: '5',
    defaultStatus: 'applied',
    autoFollowUp: true,
    compactView: false,
    showAnalytics: true,
    defaultReminder: '7'
  })

  const handleToggle = (field: string) => {
    setPreferences(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving preferences:', preferences)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Appearance */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Appearance
            </h4>
            
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select 
                value={preferences.theme} 
                onValueChange={(value) => handleSelectChange('theme', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view">Compact View</Label>
                <p className="text-sm text-gray-500">
                  Show more items per page
                </p>
              </div>
              <Switch
                id="compact-view"
                checked={preferences.compactView}
                onCheckedChange={() => handleToggle('compactView')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-analytics">Show Analytics</Label>
                <p className="text-sm text-gray-500">
                  Display charts and insights
                </p>
              </div>
              <Switch
                id="show-analytics"
                checked={preferences.showAnalytics}
                onCheckedChange={() => handleToggle('showAnalytics')}
              />
            </div>
          </div>

          {/* Application Defaults */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Application Defaults
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weekly-goal">Weekly Goal</Label>
                <Select 
                  value={preferences.weeklyGoal} 
                  onValueChange={(value) => handleSelectChange('weeklyGoal', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 applications</SelectItem>
                    <SelectItem value="5">5 applications</SelectItem>
                    <SelectItem value="10">10 applications</SelectItem>
                    <SelectItem value="15">15 applications</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-status">Default Status</Label>
                <Select 
                  value={preferences.defaultStatus} 
                  onValueChange={(value) => handleSelectChange('defaultStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-reminder">Default Follow-up Reminder</Label>
              <Select 
                value={preferences.defaultReminder} 
                onValueChange={(value) => handleSelectChange('defaultReminder', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">1 week</SelectItem>
                  <SelectItem value="14">2 weeks</SelectItem>
                  <SelectItem value="30">1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-follow-up">Auto Follow-up Reminders</Label>
                <p className="text-sm text-gray-500">
                  Automatically create follow-up reminders
                </p>
              </div>
              <Switch
                id="auto-follow-up"
                checked={preferences.autoFollowUp}
                onCheckedChange={() => handleToggle('autoFollowUp')}
              />
            </div>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 