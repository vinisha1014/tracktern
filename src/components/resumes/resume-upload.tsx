"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Upload, 
  FileText, 
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadState {
  file: File | null
  uploading: boolean
  progress: number
  error: string | null
  success: boolean
}

export function ResumeUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    uploading: false,
    progress: 0,
    error: null,
    success: false
  })

  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please upload a PDF or Word document',
        file: null
      }))
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadState(prev => ({
        ...prev,
        error: 'File size must be less than 5MB',
        file: null
      }))
      return
    }

    setUploadState(prev => ({
      ...prev,
      file,
      error: null,
      success: false
    }))
  }

  const handleUpload = async () => {
    if (!uploadState.file) return

    setUploadState(prev => ({
      ...prev,
      uploading: true,
      progress: 0,
      error: null
    }))

    try {
      const formData = new FormData()
      formData.append('file', uploadState.file)

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }))
      }, 200)

      // Make the actual API call
      const response = await fetch('/api/resumes', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      clearInterval(uploadInterval)

      setUploadState(prev => ({
        ...prev,
        uploading: false,
        progress: 100,
        success: true,
        file: null
      }))

    } catch {
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        error: 'Upload failed. Please try again.',
        progress: 0
      }))
    }
  }

  const resetUpload = () => {
    setUploadState({
      file: null,
      uploading: false,
      progress: 0,
      error: null,
      success: false
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600",
              "hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('resume-file-input')?.click()}
          >
            <div className="space-y-2">
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Drop your resume here
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  or click to browse files
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Supports PDF, DOC, DOCX up to 5MB
              </p>
            </div>
          </div>

          {/* Hidden File Input */}
          <Input
            id="resume-file-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            className="hidden"
          />

          {/* File Preview */}
          {uploadState.file && (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {uploadState.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadState.file.size)}
                  </p>
                </div>
              </div>
              {!uploadState.uploading && (
                <Button variant="ghost" size="sm" onClick={resetUpload}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Upload Progress */}
          {uploadState.uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadState.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadState.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {uploadState.error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-700 dark:text-red-400">
                {uploadState.error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {uploadState.success && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-700 dark:text-green-400">
                Resume uploaded successfully!
              </p>
            </div>
          )}

          {/* Upload Button */}
          {uploadState.file && !uploadState.uploading && !uploadState.success && (
            <Button onClick={handleUpload} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Resume
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 