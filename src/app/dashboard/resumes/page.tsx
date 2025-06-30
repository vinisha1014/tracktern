import { Suspense } from 'react'
import { ResumesList } from '@/components/resumes/resumes-list'
import { ResumeUpload } from '@/components/resumes/resume-upload'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText } from 'lucide-react'

export default function ResumesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="h-8 w-8 mr-3" />
            Resume Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Upload and manage different versions of your resume
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <ResumeUpload />
      </Suspense>

      {/* Resumes List */}
      <Suspense fallback={<ResumesLoadingSkeleton />}>
        <ResumesList />
      </Suspense>
    </div>
  )
}

function ResumesLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  )
} 