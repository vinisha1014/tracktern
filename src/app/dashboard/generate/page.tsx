import { Suspense } from 'react'
import { GenerativeUI } from '@/components/ai/generative-ui'
import { DataContext } from '@/components/ai/data-context'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Lightbulb, Code, Palette } from 'lucide-react'

export default function GeneratePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Workspace
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Describe what you want to track or visualize, and I&apos;ll generate custom components for you.
        </p>
      </div>

      {/* User Data Context */}
      <Suspense fallback={<Skeleton className="h-48 w-full" />}>
        <DataContext />
      </Suspense>

      {/* Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-dashed border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <CardTitle className="text-sm">Example Prompts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs space-y-1">
            <p>&quot;Show me my Google internship details&quot;</p>
            <p>&quot;Create a chart of my application statuses&quot;</p>
            <p>&quot;Display all my software engineering roles&quot;</p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm">Data Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs space-y-1">
            <p>&quot;Which companies should I follow up with?&quot;</p>
            <p>&quot;Show my Microsoft interview progress&quot;</p>
            <p>&quot;Create a timeline of my applications&quot;</p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Palette className="h-4 w-4 text-green-500" />
              <CardTitle className="text-sm">Visual Components</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs space-y-1">
            <p>&quot;Compare my Apple and Meta applications&quot;</p>
            <p>&quot;Show my rejected applications analysis&quot;</p>
            <p>&quot;Create a widget for upcoming deadlines&quot;</p>
          </CardContent>
        </Card>
      </div>

      {/* Main AI Interface */}
      <Suspense fallback={<GenerativeUILoadingSkeleton />}>
        <GenerativeUI />
      </Suspense>
    </div>
  )
}

function GenerativeUILoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  )
} 