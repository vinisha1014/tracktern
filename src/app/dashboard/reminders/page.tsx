import { Suspense } from 'react'
import { RemindersList } from '@/components/reminders/reminders-list'
import { CreateReminderForm } from '@/components/reminders/create-reminder-form'
import { RemindersStats } from '@/components/reminders/reminders-stats'
import { Skeleton } from '@/components/ui/skeleton'
import { Bell } from 'lucide-react'

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Bell className="h-8 w-8 mr-3" />
            Reminders & Follow-ups
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Stay on top of your application deadlines and follow-ups
          </p>
        </div>
      </div>

      {/* Stats */}
      <Suspense fallback={<Skeleton className="h-24 w-full" />}>
        <RemindersStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Create Reminder Form */}
        <div className="lg:col-span-1">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <CreateReminderForm />
          </Suspense>
        </div>

        {/* Right: Reminders List */}
        <div className="lg:col-span-2">
          <Suspense fallback={<RemindersLoadingSkeleton />}>
            <RemindersList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function RemindersLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  )
} 