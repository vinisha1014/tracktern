"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Shield, Key, Download, Trash2 } from 'lucide-react'

export function AccountSettings() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }))
  }

  const handleChangePassword = () => {
    console.log('Changing password')
    setPasswords({ current: '', new: '', confirm: '' })
  }

  const handleExportData = () => {
    console.log('Exporting data')
  }

  const handleDeleteAccount = () => {
    console.log('Deleting account')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Account & Security
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </h4>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleChangePassword}
                disabled={!passwords.current || !passwords.new || passwords.new !== passwords.confirm}
              >
                Update Password
              </Button>
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Data Management
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    Export Data
                  </h5>
                  <p className="text-xs text-gray-500">
                    Download all your application data
                  </p>
                </div>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Account Status
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Account Active
                  </span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                  Your account is in good standing
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-red-600 dark:text-red-400">
              Danger Zone
            </h4>
            
            <div className="p-3 border border-red-200 dark:border-red-800 rounded-lg">
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Delete Account
              </h5>
              <p className="text-xs text-gray-500 mb-3">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Yes, delete my account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 