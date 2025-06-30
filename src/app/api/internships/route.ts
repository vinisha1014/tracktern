import { NextResponse } from 'next/server'
import { ensureUserExists } from '@/lib/user'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Ensure user exists in our database
    const user = await ensureUserExists()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user with internships
    const userWithInternships = await prisma.user.findUnique({
      where: { clerkId: user.clerkId },
      include: {
        internships: {
          include: {
            notes: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!userWithInternships) {
      return NextResponse.json({ 
        internships: [], 
        totalCount: 0,
        statusCounts: {
          applied: 0,
          interviewing: 0,
          offer: 0,
          rejected: 0,
          withdrawn: 0,
        }
      })
    }

    return NextResponse.json({
      internships: userWithInternships.internships,
      totalCount: userWithInternships.internships.length,
      statusCounts: {
        applied: userWithInternships.internships.filter(i => i.status === 'APPLIED').length,
        interviewing: userWithInternships.internships.filter(i => i.status === 'INTERVIEWING').length,
        offer: userWithInternships.internships.filter(i => i.status === 'OFFER').length,
        rejected: userWithInternships.internships.filter(i => i.status === 'REJECTED').length,
        withdrawn: userWithInternships.internships.filter(i => i.status === 'WITHDRAWN').length,
      }
    })
  } catch (error) {
    console.error('Error fetching internships:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Ensure user exists in our database
    const user = await ensureUserExists()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      company, 
      role, 
      status = 'APPLIED', 
      dateApplied, 
      location, 
      salary, 
      link, 
      description, 
      tags,
      notes 
    } = body

    // Validate required fields
    if (!company || !role) {
      return NextResponse.json(
        { error: 'Company and role are required' }, 
        { status: 400 }
      )
    }

    // Create the internship
    const internship = await prisma.internship.create({
      data: {
        userId: user.id,
        company,
        role,
        status,
        dateApplied: dateApplied ? new Date(dateApplied) : new Date(),
        location: location || null,
        salary: salary || null,
        link: link || null,
        description: description || null,
        tags: tags || ''
      },
      include: {
        notes: true
      }
    })

    // Create a note if description/notes provided
    if (notes && notes.trim()) {
      await prisma.note.create({
        data: {
          userId: user.id,
          internshipId: internship.id,
          title: 'Application Notes',
          content: notes
        }
      })
    }

    return NextResponse.json({
      message: 'Internship created successfully',
      internship
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating internship:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 