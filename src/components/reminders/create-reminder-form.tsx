"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Plus } from 'lucide-react'

interface ReminderForm {
  title: string
  description: string
  type: string
  priority: string
  dueDate: string
  dueTime: string
  company: string
}

export function CreateReminderForm() {
  const [form, setForm] = useState<ReminderForm>({
    title: '',
    description: '',
    type: '',
    priority: 'medium',
    dueDate: '',
    dueTime: '',
    company: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setForm({
          title: '',
          description: '',
          type: '',
          priority: 'medium',
          dueDate: '',
          dueTime: '',
          company: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error creating reminder:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateForm = (field: keyof ReminderForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Create Reminder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Follow up with Google"
              value={form.title}
              onChange={(e) => updateForm('title', e.target.value)}
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={form.type} onValueChange={(value) => updateForm('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select reminder type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="deadline">Application Deadline</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              placeholder="Company name"
              value={form.company}
              onChange={(e) => updateForm('company', e.target.value)}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={form.priority} onValueChange={(value) => updateForm('priority', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date & Time */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={form.dueDate}
                onChange={(e) => updateForm('dueDate', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueTime">Time</Label>
              <Input
                id="dueTime"
                type="time"
                value={form.dueTime}
                onChange={(e) => updateForm('dueTime', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional notes or details..."
              value={form.description}
              onChange={(e) => updateForm('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Calendar className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Creating...' : 'Create Reminder'}
          </Button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="text-sm text-green-600 dark:text-green-400 text-center">
              Reminder created successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="text-sm text-red-600 dark:text-red-400 text-center">
              Failed to create reminder. Please try again.
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
} 