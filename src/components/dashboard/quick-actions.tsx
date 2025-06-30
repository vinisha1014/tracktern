"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Upload, 
  Sparkles 
} from 'lucide-react'

export function QuickActions() {
  return (
    <div className="flex items-center space-x-3">
      <Button variant="outline" size="sm" asChild>
        <Link href="/dashboard/resumes">
          <Upload className="h-4 w-4 mr-2" />
          Upload Resume
        </Link>
      </Button>
      
      <Button variant="outline" size="sm" asChild>
        <Link href="/dashboard/generate">
          <Sparkles className="h-4 w-4 mr-2" />
          AI Workspace
        </Link>
      </Button>
      
      <Button size="sm" asChild>
        <Link href="/dashboard/internships/new">
          <Plus className="h-4 w-4 mr-2" />
          Add Internship
        </Link>
      </Button>
    </div>
  )
} 