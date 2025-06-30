import { Suspense } from 'react'
import { InternshipsList } from '@/components/internships/internships-list'
import { InternshipsFilters } from '@/components/internships/internships-filters'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Briefcase, Plus, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  searchParams: Promise<{
    status?: string
    search?: string
    sort?: string
  }>
}

export default async function InternshipsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-sm">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Internships</h1>
                <p className="text-muted-foreground text-sm">
                  Manage and track all your internship applications
                </p>
              </div>
            </div>
          </div>
          <Button asChild className="shadow-sm hover:shadow-md">
            <Link href="/dashboard/internships/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Internship
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border/50 rounded-lg p-4 shadow-soft">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 shadow-soft">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950/50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Interviews Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 shadow-soft">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">53%</p>
                <p className="text-xs text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Suspense fallback={<Skeleton className="h-16 w-full rounded-lg" />}>
        <InternshipsFilters />
      </Suspense>

      {/* Internships List */}
      <Suspense fallback={<InternshipsLoadingSkeleton />}>
        <InternshipsList searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  )
}

function InternshipsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
                 <div key={i} className="bg-card border border-border/50 rounded-lg p-6 space-y-4 shadow-sm">
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
} 