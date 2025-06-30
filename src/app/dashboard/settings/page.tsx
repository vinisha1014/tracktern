import { Suspense } from 'react'
import { ProfileSettings } from '@/components/settings/profile-settings'
import { NotificationSettings } from '@/components/settings/notification-settings'
import { PreferencesSettings } from '@/components/settings/preferences-settings'
import { AccountSettings } from '@/components/settings/account-settings'
import { Skeleton } from '@/components/ui/skeleton'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Settings className="h-8 w-8 mr-3" />
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <ProfileSettings />
          </Suspense>

          {/* Notification Settings */}
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <NotificationSettings />
          </Suspense>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Preferences */}
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <PreferencesSettings />
          </Suspense>

          {/* Account Settings */}
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <AccountSettings />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 