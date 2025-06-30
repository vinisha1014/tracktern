"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Link as LinkIcon, 
  Tag,
  X,
  Plus,
  Save,
  ArrowLeft
} from 'lucide-react'
import { InternshipStatus } from '@/types'
import { toast } from 'sonner'

const formSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  status: z.string(),
  dateApplied: z.string().min(1, 'Application date is required'),
  location: z.string().optional(),
  salary: z.string().optional(),
  link: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  tags: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function AddInternshipForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTag, setCurrentTag] = useState('')
  const [tags, setTags] = useState('')

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: '',
      role: '',
      status: InternshipStatus.APPLIED,
      dateApplied: new Date().toISOString().split('T')[0],
      location: '',
      salary: '',
      link: '',
      description: '',
      tags: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Add tags to form data
      const formDataWithTags = {
        ...data,
        tags: tags || '',
        notes: data.description || ''
      }

      const response = await fetch('/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithTags),
      })

      if (!response.ok) {
        throw new Error('Failed to add internship')
      }
      
      toast.success('Internship application added successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error adding internship:', error)
      toast.error('Failed to add internship. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTagsArray = () => {
    return tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
  }

  const addTag = () => {
    if (currentTag.trim()) {
      const currentTags = getTagsArray()
      if (!currentTags.includes(currentTag.trim())) {
        const newTags = [...currentTags, currentTag.trim()]
        setTags(newTags.join(','))
        setCurrentTag('')
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = getTagsArray()
    const newTags = currentTags.filter(tag => tag !== tagToRemove)
    setTags(newTags.join(','))
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span>Internship Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Company and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Company</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Google, Microsoft, Apple" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role/Position</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineering Intern" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={InternshipStatus.APPLIED}>Applied</SelectItem>
                        <SelectItem value={InternshipStatus.INTERVIEWING}>Interviewing</SelectItem>
                        <SelectItem value={InternshipStatus.OFFER}>Offer</SelectItem>
                        <SelectItem value={InternshipStatus.REJECTED}>Rejected</SelectItem>
                        <SelectItem value={InternshipStatus.WITHDRAWN}>Withdrawn</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateApplied"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Date Applied</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location and Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Location</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, CA or Remote" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Salary/Compensation</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $8,000/month or $50/hour" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Job Posting Link */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>Job Posting URL</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Link to the job posting for easy reference
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <div className="space-y-3">
              <Label className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span>Tags</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a tag (e.g., Remote, Full-time, Tech)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTag}
                  disabled={!currentTag.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {getTagsArray().length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {getTagsArray().map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Description/Notes */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description/Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes about the role, requirements, interview process, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Additional details about the internship or application process
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Cancel</span>
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? 'Adding...' : 'Add Internship'}</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 