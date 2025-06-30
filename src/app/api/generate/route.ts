import OpenAI from "openai"
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GitHub AI configuration (exactly like your working sample)
const token = process.env.GITHUB_TOKEN 
const endpoint = "https://models.github.ai/inference"
const modelName = "openai/gpt-4o"

const client = new OpenAI({ baseURL: endpoint, apiKey: token })

export async function POST(req: Request) {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth()
    
    if (!userId) {
      return new Response(JSON.stringify({ 
        error: 'Unauthorized', 
        message: 'Please sign in to use AI features'
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get user from our database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    // Create user if they don't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: 'user@example.com' // This will be updated by webhook
        }
      })
    }

    const body = await req.json()
    
    const { messages } = body
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ 
        error: 'Bad Request', 
        message: 'Invalid messages format'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const lastMessage = messages[messages.length - 1]

    // Fetch user's internship data for context
    let userContext = ""
    
    try {
      const userWithData = await prisma.user.findUnique({
        where: { clerkId: userId },
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

      if (userWithData && userWithData.internships.length > 0) {
        userContext = `

IMPORTANT: The user has the following REAL internship data that you should use when generating components:

USER'S INTERNSHIPS:
${userWithData.internships.map((internship, index) => `
${index + 1}. ${internship.company} - ${internship.role}
   Status: ${internship.status}
   Applied: ${internship.dateApplied.toLocaleDateString()}
   Location: ${internship.location || 'Not specified'}
   Salary: ${internship.salary || 'Not specified'}
   Tags: ${internship.tags || 'None'}
   Notes: ${internship.notes.length} notes
   Link: ${internship.link || 'None'}
`).join('')}

STATISTICS:
- Total Applications: ${userWithData.internships.length}
- Applied: ${userWithData.internships.filter(i => i.status === 'APPLIED').length}
- Interviewing: ${userWithData.internships.filter(i => i.status === 'INTERVIEWING').length}
- Offers: ${userWithData.internships.filter(i => i.status === 'OFFER').length}
- Rejected: ${userWithData.internships.filter(i => i.status === 'REJECTED').length}

When the user asks about their internships, use this REAL data instead of mock data. Make the components dynamic and relevant to their actual applications.`
      } else {
        userContext = `

NOTE: The user has no internship data yet. Use realistic sample data for demonstration, but mention that they can add real internships to see their actual data.`
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      userContext = "\n\nNOTE: Using sample data for demonstration."
    }

    const systemPrompt = `You are an AI assistant that selects pre-built components for internship tracking based on user requests.

AVAILABLE COMPONENTS:
1. "applicationCard" - Shows detailed info for a single internship application
2. "applicationsOverview" - Chart showing application status breakdown  
3. "companyTable" - Table view of multiple applications
4. "quickStats" - Dashboard with key metrics/statistics
5. "recentList" - List of recent applications

CRITICAL: Return ONLY valid JSON in this EXACT format:
{
  "component": "componentName",
  "title": "Component Title", 
  "description": "Brief description"
} 

SELECTION RULES:

- For specific company requests (e.g., "show my Google application"): use "applicationCard"
- For overview/charts/analytics requests: use "applicationsOverview" or "quickStats"  
- For viewing multiple applications: use "companyTable" or "recentList"
- For stats/metrics requests: use "quickStats"
- For recent activity: use "recentList"

USER REQUEST EXAMPLES:
- "Show my Google application" → "applicationCard"
- "Application overview" → "applicationsOverview"  
- "View all applications" → "companyTable"
- "Quick stats" → "quickStats"
- "Recent applications" → "recentList"

${userContext}

The user's request: "${lastMessage.content}"

REMEMBER: Return ONLY the JSON object, no markdown code blocks, no explanations.`

    // Get complete response first (non-streaming to avoid format issues)
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((message: { role: string; content: string }) => ({
          role: message.role as "user" | "assistant" | "system",
          content: message.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 2000,
      model: modelName,
      stream: false, // Non-streaming to avoid format issues
    })

    const fullContent = response.choices[0].message.content || ""

    // Return in a format that useChat can handle
    return new Response(fullContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error in generate API:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error', 
      message: (error as Error).message,
      details: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 