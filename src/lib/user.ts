import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function ensureUserExists() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return null
    }

    // Check if user exists in our database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    // If user doesn't exist, create them
    if (!user) {
      const clerkUser = await currentUser()
      
      if (clerkUser) {
        user = await prisma.user.create({
          data: {
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            firstName: clerkUser.firstName || null,
            lastName: clerkUser.lastName || null,
            imageUrl: clerkUser.imageUrl || null,
          }
        })
      }
    }

    return user
  } catch (error) {
    console.error('Error ensuring user exists:', error)
    return null
  }
}

export async function getCurrentUser() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        internships: {
          include: {
            notes: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        resumes: true,
        generatedUIs: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
} 