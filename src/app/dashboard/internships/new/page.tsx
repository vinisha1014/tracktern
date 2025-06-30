import { AddInternshipForm } from '@/components/internships/add-internship-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Lightbulb } from 'lucide-react'

export default function AddInternshipPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Plus className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add New Internship
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Track a new internship application and monitor its progress.
        </p>
      </div>

      {/* Tips Card */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
            <Lightbulb className="h-5 w-5" />
            <span className="text-sm">Pro Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <p>• Add detailed notes about the role and requirements</p>
          <p>• Include the job posting link for easy reference</p>
          <p>• Use tags to categorize applications (Remote, Full-time, etc.)</p>
          <p>• Set reminders for follow-ups and deadlines</p>
        </CardContent>
      </Card>

      {/* Form */}
      <AddInternshipForm />
    </div>
  )
} 