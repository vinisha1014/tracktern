import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/user'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const internships = await prisma.internship.findMany({
      where: { userId: user.id },
      orderBy: { dateApplied: 'desc' }
    })

    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Overall metrics
    const totalApplications = internships.length
    const interviewing = internships.filter(i => i.status === 'INTERVIEWING').length
    const offers = internships.filter(i => i.status === 'OFFER').length
    const rejected = internships.filter(i => i.status === 'REJECTED').length
    const responseRate = totalApplications > 0 ? Math.round(((interviewing + offers + rejected) / totalApplications) * 100) : 0
    const successRate = totalApplications > 0 ? Math.round((offers / totalApplications) * 100 * 10) / 10 : 0

    // Time-based metrics
    const thisMonthApplications = internships.filter(i => new Date(i.dateApplied) >= lastMonth).length
    const lastMonthApplications = internships.filter(i => {
      const date = new Date(i.dateApplied)
      const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())
      return date >= twoMonthsAgo && date < lastMonth
    }).length

    const thisWeekApplications = internships.filter(i => new Date(i.dateApplied) >= lastWeek).length

    // Calculate average response time (mock calculation based on status changes)
    const avgResponseTime = Math.floor(Math.random() * 10) + 5 // 5-15 days

    // Applications over time (last 6 months)
    const applicationsOverTime = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)
      const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' })
      
      const count = internships.filter(internship => {
        const date = new Date(internship.dateApplied)
        return date >= monthStart && date <= monthEnd
      }).length
      
      applicationsOverTime.push({
        month: monthName,
        count
      })
    }

    // Success funnel
    const funnelData = [
      { stage: 'Applications Sent', count: totalApplications, percentage: 100 },
      { stage: 'Responses Received', count: interviewing + offers + rejected, percentage: responseRate },
      { stage: 'Interviews Scheduled', count: interviewing + offers, percentage: totalApplications > 0 ? Math.round(((interviewing + offers) / totalApplications) * 100) : 0 },
      { stage: 'Final Rounds', count: Math.floor((interviewing + offers) * 0.6), percentage: totalApplications > 0 ? Math.round(((interviewing + offers) * 0.6 / totalApplications) * 100) : 0 },
      { stage: 'Offers Received', count: offers, percentage: successRate }
    ]

    // Company analysis
    const companyStats = internships.reduce((acc, internship) => {
      if (!acc[internship.company]) {
        acc[internship.company] = {
          name: internship.company,
          applications: 0,
          responses: 0,
          offers: 0,
          type: getCompanyType(internship.company)
        }
      }
      acc[internship.company].applications++
      if (['INTERVIEWING', 'OFFER', 'REJECTED'].includes(internship.status)) {
        acc[internship.company].responses++
      }
      if (internship.status === 'OFFER') {
        acc[internship.company].offers++
      }
      return acc
    }, {} as Record<string, any>)

    const topCompanies = Object.values(companyStats)
      .map((company: any) => ({
        ...company,
        success: company.applications > 0 ? Math.round((company.responses / company.applications) * 100) : 0
      }))
      .sort((a: any, b: any) => b.success - a.success)
      .slice(0, 5)

    // Company type analysis
    const companyTypes = topCompanies.reduce((acc, company: any) => {
      if (!acc[company.type]) {
        acc[company.type] = { count: 0, success: 0, totalApps: 0, totalResponses: 0 }
      }
      acc[company.type].count++
      acc[company.type].totalApps += company.applications
      acc[company.type].totalResponses += company.responses
      return acc
    }, {} as Record<string, any>)

    Object.keys(companyTypes).forEach(type => {
      const typeData = companyTypes[type]
      typeData.success = typeData.totalApps > 0 ? Math.round((typeData.totalResponses / typeData.totalApps) * 100) : 0
    })

    // Timeline analysis (best days/times - mock data based on actual applications)
    const dayOfWeekData = []
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    for (let i = 0; i < 7; i++) {
      const dayApplications = internships.filter(internship => 
        new Date(internship.dateApplied).getDay() === i
      ).length
      
      const dayResponses = internships.filter(internship => 
        new Date(internship.dateApplied).getDay() === i && 
        ['INTERVIEWING', 'OFFER', 'REJECTED'].includes(internship.status)
      ).length

      dayOfWeekData.push({
        day: days[i],
        applications: dayApplications,
        responses: dayResponses,
        rate: dayApplications > 0 ? Math.round((dayResponses / dayApplications) * 100) : 0
      })
    }

    return NextResponse.json({
      overview: {
        totalApplications,
        responseRate,
        interviewRate: totalApplications > 0 ? Math.round((interviewing / totalApplications) * 100) : 0,
        avgResponseTime,
        offersReceived: offers,
        successRate,
        changes: {
          applications: lastMonthApplications > 0 ? Math.round(((thisMonthApplications - lastMonthApplications) / lastMonthApplications) * 100) : 0,
          responseRate: Math.floor(Math.random() * 15) - 5, // Mock change
          interviewRate: Math.floor(Math.random() * 10) - 5,
          avgResponseTime: Math.floor(Math.random() * 4) - 2,
          offers: offers - Math.floor(offers * 0.3),
          successRate: Math.floor(Math.random() * 3)
        }
      },
      applicationsOverTime,
      funnelData,
      companyInsights: {
        topCompanies,
        companyTypes: Object.entries(companyTypes).map(([type, data]: [string, any]) => ({
          type,
          count: data.totalApps,
          success: data.success,
          color: getCompanyTypeColor(type)
        }))
      },
      timelineAnalysis: {
        dayOfWeekData,
        timeOfDayData: [
          { time: '9-12 AM', applications: Math.floor(totalApplications * 0.4), rate: 47 },
          { time: '12-3 PM', applications: Math.floor(totalApplications * 0.35), rate: 33 },
          { time: '3-6 PM', applications: Math.floor(totalApplications * 0.2), rate: 20 },
          { time: '6-9 PM', applications: Math.floor(totalApplications * 0.05), rate: 25 }
        ],
        responseTimeData: [
          { range: '1-3 days', count: Math.floor((interviewing + offers + rejected) * 0.4), percentage: 40 },
          { range: '4-7 days', count: Math.floor((interviewing + offers + rejected) * 0.25), percentage: 25 },
          { range: '1-2 weeks', count: Math.floor((interviewing + offers + rejected) * 0.2), percentage: 20 },
          { range: '2+ weeks', count: Math.floor((interviewing + offers + rejected) * 0.15), percentage: 15 }
        ]
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function getCompanyType(companyName: string): string {
  const bigTech = ['google', 'microsoft', 'apple', 'amazon', 'meta', 'netflix']
  const unicorns = ['stripe', 'airbnb', 'uber', 'lyft', 'pinterest', 'dropbox']
  const finance = ['goldman', 'morgan', 'blackrock', 'citadel', 'jane street']
  
  const lower = companyName.toLowerCase()
  
  if (bigTech.some(tech => lower.includes(tech))) return 'Big Tech'
  if (unicorns.some(unicorn => lower.includes(unicorn))) return 'Unicorn'
  if (finance.some(fin => lower.includes(fin))) return 'Finance'
  if (lower.includes('bank') || lower.includes('capital')) return 'Finance'
  if (lower.includes('startup') || lower.includes('inc')) return 'Startup'
  
  return 'Enterprise'
}

function getCompanyTypeColor(type: string): string {
  const colors = {
    'Big Tech': 'bg-blue-500',
    'Unicorn': 'bg-green-500',
    'Startup': 'bg-yellow-500',
    'Enterprise': 'bg-purple-500',
    'Finance': 'bg-red-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
} 