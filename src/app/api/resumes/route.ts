import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/user'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { uploadedAt: 'desc' }
    })

    const transformedResumes = resumes.map(resume => ({
      id: resume.id,
      name: resume.filename,
      url: resume.url,
      uploadedAt: resume.uploadedAt.toISOString(),
      fileSize: resume.fileSize,
      isDefault: resume.isDefault
    }))

    return NextResponse.json({
      resumes: transformedResumes,
      totalCount: resumes.length
    })
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF and Word documents are allowed.' }, { status: 400 })
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Create resume record first to get ID
    const existingResumesCount = await prisma.resume.count({
      where: { userId: user.id }
    })
    
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        filename: file.name,
        url: '', // Will be updated after file is saved
        fileSize: file.size,
        isDefault: existingResumesCount === 0
      }
    })

    try {
      // Ensure uploads directory exists
      const uploadsDir = join(process.cwd(), 'uploads', 'resumes')
      await mkdir(uploadsDir, { recursive: true })
      
      // Save file to disk with resume ID as prefix
      const fileName = `${resume.id}-${file.name}`
      const filePath = join(uploadsDir, fileName)
      
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)
      
      // Update resume with correct URL
      const fileUrl = `/api/resumes/${resume.id}/download`
      await prisma.resume.update({
        where: { id: resume.id },
        data: { url: fileUrl }
      })
      
      // Update local resume object
      resume.url = fileUrl
      
    } catch (fileError) {
      // If file save fails, clean up the database record
      await prisma.resume.delete({ where: { id: resume.id } })
      throw fileError
    }

    return NextResponse.json({
      message: 'Resume uploaded successfully',
      resume: {
        id: resume.id,
        name: resume.filename,
        url: resume.url,
        uploadedAt: resume.uploadedAt.toISOString(),
        fileSize: resume.fileSize,
        isDefault: resume.isDefault
      }
    })
  } catch (error) {
    console.error('Error uploading resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { resumeId, action, data } = body

    switch (action) {
      case 'setDefault':
        // Remove default from all resumes
        await prisma.resume.updateMany({
          where: { userId: user.id },
          data: { isDefault: false }
        })
        
        // Set the selected resume as default
        await prisma.resume.update({
          where: { id: resumeId, userId: user.id },
          data: { isDefault: true }
        })
        break
        
      case 'rename':
        await prisma.resume.update({
          where: { id: resumeId, userId: user.id },
          data: { filename: data.filename }
        })
        break
        
      case 'delete':
        await prisma.resume.delete({
          where: { id: resumeId, userId: user.id }
        })
        break
    }

    return NextResponse.json({ message: 'Resume updated successfully' })
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 