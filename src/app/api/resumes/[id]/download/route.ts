import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/user'
import { prisma } from '@/lib/prisma'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params
    
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - please sign in' }, { status: 401 })
    }

    // Find the resume
    const resume = await prisma.resume.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // Check if file exists
    const filePath = join(process.cwd(), 'uploads', 'resumes', `${resume.id}-${resume.filename}`)
    
    try {
      const fileBuffer = await readFile(filePath)
      
      // Determine content type based on file extension
      const extension = resume.filename.toLowerCase().split('.').pop()
      let contentType = 'application/octet-stream'
      
      switch (extension) {
        case 'pdf':
          contentType = 'application/pdf'
          break
        case 'doc':
          contentType = 'application/msword'
          break
        case 'docx':
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          break
      }

      // Check if it's a preview request
      const isPreview = request.nextUrl.searchParams.get('preview') === 'true'
      
      const response = new NextResponse(fileBuffer)
      response.headers.set('Content-Type', contentType)
      response.headers.set('Content-Length', fileBuffer.length.toString())
      
      if (isPreview) {
        // For preview, set inline disposition
        response.headers.set('Content-Disposition', `inline; filename="${resume.filename}"`)
      } else {
        // For download, set attachment disposition
        response.headers.set('Content-Disposition', `attachment; filename="${resume.filename}"`)
      }
      
      return response
      
    } catch (fileError) {
      console.error('File not found:', filePath)
      return NextResponse.json({ error: 'File not found on server' }, { status: 404 })
    }

  } catch (error) {
    console.error('Error serving resume file:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 