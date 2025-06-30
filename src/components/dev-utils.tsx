"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Trash2, Download } from 'lucide-react'

export function DevUtils() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleSeedData = async () => {
    setIsSeeding(true)
    setStatus(null)
    
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' })
      })
      
      const data = await response.json()
      setStatus(data.message || 'Data seeded successfully!')
      
      // Refresh the page to see new data
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      setStatus('Failed to seed data')
    } finally {
      setIsSeeding(false)
    }
  }

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
      return
    }
    
    setIsClearing(true)
    setStatus(null)
    
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' })
      })
      
      const data = await response.json()
      setStatus(data.message || 'Data cleared successfully!')
      
      // Refresh the page to see changes
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      setStatus('Failed to clear data')
    } finally {
      setIsClearing(false)
    }
  }

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <Card className="border-dashed border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10">
      <CardHeader>
        <CardTitle className="text-yellow-800 dark:text-yellow-200 flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Development Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          These tools help you test the application with sample data.
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleSeedData}
            disabled={isSeeding}
            size="sm"
            variant="outline"
            className="border-yellow-300 text-yellow-800 hover:bg-yellow-100"
          >
            <Download className="h-4 w-4 mr-2" />
            {isSeeding ? 'Seeding...' : 'Add Sample Data'}
          </Button>
          
          <Button
            onClick={handleClearData}
            disabled={isClearing}
            size="sm"
            variant="outline"
            className="border-red-300 text-red-800 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isClearing ? 'Clearing...' : 'Clear All Data'}
          </Button>
        </div>
        
        {status && (
          <div className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
            {status}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 