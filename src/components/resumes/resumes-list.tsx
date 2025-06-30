"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Download, 
  Eye, 
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  HardDrive
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Resume {
  id: string
  name: string
  url: string
  uploadedAt: string
  fileSize: number
  isDefault: boolean
}

export function ResumesList() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResumes() {
      try {
        const response = await fetch('/api/resumes')
        if (response.ok) {
          const data = await response.json()
          setResumes(data.resumes)
        }
      } catch (error) {
        console.error('Error fetching resumes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResumes()
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDownload = async (resume: Resume) => {
    try {
      // Use the download endpoint
      const response = await fetch(resume.url)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = resume.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        throw new Error('Download failed')
      }
    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Failed to download file. Please try again.')
    }
  }

  const handlePreview = (resume: Resume) => {
    // For preview, open with preview parameter
    const previewUrl = `${resume.url}?preview=true`
    window.open(previewUrl, '_blank')
  }

  const handleSetDefault = async (resumeId: string) => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, action: 'setDefault' })
      })
      
      if (response.ok) {
        setResumes(resumes.map(resume => ({
          ...resume,
          isDefault: resume.id === resumeId
        })))
      }
    } catch (error) {
      console.error('Error setting default resume:', error)
    }
  }

  const handleDelete = async (resumeId: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      try {
        const response = await fetch('/api/resumes', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeId, action: 'delete' })
        })
        
        if (response.ok) {
          setResumes(resumes.filter(resume => resume.id !== resumeId))
        }
      } catch (error) {
        console.error('Error deleting resume:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No resumes uploaded
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Upload your first resume to get started with applications.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Resumes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div 
              key={resume.id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <FileText className="h-10 w-10 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {resume.name}
                    </h4>
                    {resume.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(resume.uploadedAt)}
                    </span>
                    <span className="flex items-center">
                      <HardDrive className="h-3 w-3 mr-1" />
                      {formatFileSize(resume.fileSize)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview(resume)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(resume)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!resume.isDefault && (
                      <>
                        <DropdownMenuItem onClick={() => handleSetDefault(resume.id)}>
                          Set as Default
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDelete(resume.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 