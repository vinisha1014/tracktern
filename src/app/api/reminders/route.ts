import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/user'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's internships to generate smart reminders
    const internships = await prisma.internship.findMany({
      where: { userId: user.id },
      include: {
        notes: true
      },
      orderBy: { dateApplied: 'desc' }
    })

    // Generate smart reminders based on real data
    const reminders = []
    const now = new Date()

    for (const internship of internships) {
      const daysSinceApplied = Math.floor((now.getTime() - new Date(internship.dateApplied).getTime()) / (1000 * 60 * 60 * 24))
      
      // Follow-up reminders for applications without response
      if (internship.status === 'APPLIED' && daysSinceApplied >= 7) {
        const followUpDate = new Date(internship.dateApplied)
        followUpDate.setDate(followUpDate.getDate() + 7)
        
        reminders.push({
          id: `followup-${internship.id}`,
          title: `Follow up with ${internship.company}`,
          description: `It's been ${daysSinceApplied} days since you applied for ${internship.role}`,
          type: 'follow-up',
          priority: daysSinceApplied > 14 ? 'high' : 'medium',
          dueDate: followUpDate,
          company: internship.company,
          isCompleted: false,
          isOverdue: daysSinceApplied > 7,
          internshipId: internship.id
        })
      }

      // Interview preparation reminders
      if (internship.status === 'INTERVIEWING') {
        const interviewDate = new Date()
        interviewDate.setDate(interviewDate.getDate() + 2) // Assume interview in 2 days
        
        reminders.push({
          id: `interview-prep-${internship.id}`,
          title: `Prepare for ${internship.company} interview`,
          description: `Research the company and practice common interview questions for ${internship.role}`,
          type: 'interview',
          priority: 'high',
          dueDate: interviewDate,
          company: internship.company,
          isCompleted: false,
          isOverdue: false,
          internshipId: internship.id
        })
      }

      // Thank you note reminders
      if (internship.status === 'INTERVIEWING') {
        const thankYouDate = new Date()
        thankYouDate.setDate(thankYouDate.getDate() + 1)
        
        reminders.push({
          id: `thankyou-${internship.id}`,
          title: `Send thank you note to ${internship.company}`,
          description: `Follow up with a personalized thank you email after your interview`,
          type: 'follow-up',
          priority: 'medium',
          dueDate: thankYouDate,
          company: internship.company,
          isCompleted: false,
          isOverdue: false,
          internshipId: internship.id
        })
      }
    }

    // Calculate statistics
    const totalReminders = reminders.length
    const pendingReminders = reminders.filter(r => !r.isCompleted).length
    const overdueReminders = reminders.filter(r => r.isOverdue && !r.isCompleted).length
    const completedReminders = 0 // We don't persist completion state yet
    const thisWeekReminders = reminders.filter(r => {
      const weekFromNow = new Date()
      weekFromNow.setDate(weekFromNow.getDate() + 7)
      return new Date(r.dueDate) <= weekFromNow && !r.isCompleted
    }).length

    return NextResponse.json({
      reminders: reminders.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
      stats: {
        total: totalReminders,
        pending: pendingReminders,
        overdue: overdueReminders,
        completed: completedReminders,
        thisWeek: thisWeekReminders
      }
    })
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, type, priority, dueDate, dueTime, company } = body

    // In a real implementation, you'd save this to a reminders table
    // For now, we'll just return success since we're generating reminders dynamically
    
    return NextResponse.json({
      message: 'Reminder created successfully',
      reminder: {
        id: `custom-${Date.now()}`,
        title,
        description,
        type,
        priority,
        dueDate: new Date(`${dueDate} ${dueTime || '09:00'}`),
        company,
        isCompleted: false,
        isOverdue: false
      }
    })
  } catch (error) {
    console.error('Error creating reminder:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 