import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/internships(.*)',
  '/resumes(.*)',
  '/generate(.*)',
])

const isProtectedAPIRoute = createRouteMatcher([
  '/api/internships(.*)',
  '/api/resumes(.*)',
  '/api/notes(.*)',
  '/api/generate(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // For page routes, redirect to sign-in if not authenticated
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
  
  // For API routes, let the route handler deal with authentication
  // and return proper JSON responses instead of redirecting
  if (isProtectedAPIRoute(req)) {
    // Just ensure the auth object is available, but don't redirect
    // The API route will check authentication and return 401 if needed
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
} 