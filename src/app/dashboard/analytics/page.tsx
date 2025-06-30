import { Suspense } from 'react'
import { AnalyticsOverview } from '@/components/analytics/analytics-overview'
import { ApplicationsChart } from '@/components/analytics/applications-chart'
import { CompanyInsights } from '@/components/analytics/company-insights'
import { TimelineAnalysis } from '@/components/analytics/timeline-analysis'
import { SuccessMetrics } from '@/components/analytics/success-metrics'
import { Skeleton } from '@/components/ui/skeleton'
import { BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="h-8 w-8 mr-3" />
            Analytics & Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Analyze your internship application performance and trends
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <AnalyticsOverview />
      </Suspense>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Over Time */}
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <ApplicationsChart />
        </Suspense>

        {/* Success Metrics */}
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <SuccessMetrics />
        </Suspense>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Analysis */}
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <CompanyInsights />
        </Suspense>

        {/* Timeline Analysis */}
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <TimelineAnalysis />
        </Suspense>
      </div>
    </div>
  )
} 