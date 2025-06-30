import { prisma } from './prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function seedData(userId: string) {
  try {
    // Check if user already has data
    const existingInternships = await prisma.internship.count({
      where: { userId }
    })

    if (existingInternships > 0) {
      console.log('User already has data, skipping seed')
      return
    }

    // Create sample internships
    const sampleInternships = [
      {
        userId,
        company: 'Google',
        role: 'Software Engineer Intern',
        status: 'INTERVIEWING',
        dateApplied: new Date('2024-12-15'),
        location: 'Mountain View, CA',
        tags: 'Tech,AI/ML',
        notes: 'Completed phone screen, waiting for onsite interview'
      },
      {
        userId,
        company: 'Microsoft',
        role: 'Product Manager Intern',
        status: 'APPLIED',
        dateApplied: new Date('2024-12-20'),
        location: 'Redmond, WA',
        tags: 'Product,Cloud',
        notes: 'Applied through university career portal'
      },
      {
        userId,
        company: 'Stripe',
        role: 'Software Engineer Intern',
        status: 'OFFER',
        dateApplied: new Date('2024-12-10'),
        location: 'San Francisco, CA',
        tags: 'Fintech,Backend',
        notes: 'Received offer! Need to respond by end of week'
      },
      {
        userId,
        company: 'Meta',
        role: 'Data Science Intern',
        status: 'REJECTED',
        dateApplied: new Date('2024-12-01'),
        location: 'Menlo Park, CA',
        tags: 'Data Science,Analytics',
        notes: 'Rejected after final round interview'
      },
      {
        userId,
        company: 'Apple',
        role: 'iOS Developer Intern',
        status: 'APPLIED',
        dateApplied: new Date('2024-12-25'),
        location: 'Cupertino, CA',
        tags: 'Mobile,iOS',
        notes: 'Just submitted application'
      }
    ]

    // Create internships
    for (const internship of sampleInternships) {
      await prisma.internship.create({
        data: internship
      })
    }

    // Create sample resumes with actual files
    const uploadsDir = join(process.cwd(), 'uploads', 'resumes')
    await mkdir(uploadsDir, { recursive: true })

    const sampleResumeContent1 = `SOFTWARE ENGINEER INTERN RESUME

Jane Smith
Email: jane.smith@university.edu
Phone: (555) 123-4567
GitHub: github.com/janesmith

EDUCATION
Bachelor of Science in Computer Science
Top University (Expected May 2025)
GPA: 3.9/4.0

TECHNICAL SKILLS
- Languages: Python, JavaScript, TypeScript, Java, C++
- Frontend: React, Next.js, Vue.js, HTML/CSS, Tailwind
- Backend: Node.js, Express, Django, Flask
- Databases: PostgreSQL, MySQL, MongoDB, Redis
- Cloud: AWS, GCP, Docker, Kubernetes
- Tools: Git, Webpack, Jest, Prisma

EXPERIENCE
Software Engineer Intern
Google (Summer 2024)
- Built React components for Google Workspace dashboard
- Optimized API endpoints, reducing response time by 40%
- Collaborated with senior engineers on authentication system
- Wrote comprehensive unit tests with 95% coverage

Full Stack Developer
Startup Accelerator (Part-time, 2023-2024)
- Developed MVP for fintech startup using Next.js and Prisma
- Implemented user authentication and payment processing
- Deployed application on Vercel with PostgreSQL database

PROJECTS
Tracktern - AI-Powered Internship Tracker
- Built full-stack application with generative UI features
- Integrated OpenAI API for smart recommendations
- Used Next.js, Prisma, Clerk Auth, and Tailwind CSS

Real-time Chat Application
- WebSocket-based chat with React and Socket.io
- Implemented message encryption and file sharing
- Supports 1000+ concurrent users

ACHIEVEMENTS
- Google Code Jam Top 100 (2024)
- Winner, University Hackathon (2024)
- Open Source Contributor (React ecosystem)
- Dean's List (4 consecutive semesters)`

    const sampleResumeContent2 = `PRODUCT MANAGER INTERN RESUME

Alex Johnson
Email: alex.johnson@business.edu
Phone: (555) 987-6543
LinkedIn: linkedin.com/in/alexjohnson

EDUCATION
Bachelor of Business Administration
Business School (Expected Dec 2025)
Major: Information Systems, Minor: Computer Science
GPA: 3.8/4.0

RELEVANT COURSEWORK
- Product Management Fundamentals
- Data Analytics & Business Intelligence
- Software Engineering Principles
- User Experience Design

EXPERIENCE
Product Management Intern
Microsoft (Summer 2024)
- Led cross-functional team of 8 engineers and designers
- Conducted user research resulting in 25% feature adoption increase
- Created product roadmaps and managed sprint planning
- Analyzed user metrics using Azure Analytics

Business Analyst Intern
Local Tech Company (Summer 2023)
- Gathered requirements from stakeholders for new features
- Created wireframes and user stories for development team
- Conducted A/B tests resulting in 15% conversion improvement

PROJECTS
Student Management System
- Led team of 5 to build university course management platform
- Defined product requirements and user acceptance criteria
- Coordinated with development team using Agile methodology

Market Research: EdTech Apps
- Analyzed competitive landscape of educational technology
- Conducted surveys with 500+ students
- Presented findings to university administration

SKILLS
- Product Tools: Figma, Miro, Jira, Confluence
- Analytics: Google Analytics, Mixpanel, SQL
- Technical: Basic Python, HTML/CSS, API understanding
- Soft Skills: Leadership, Communication, Problem-solving

ACHIEVEMENTS
- Product Management Certificate (Google)
- Case Competition Winner (2024)
- Student Government Vice President`

    // Create actual resume files and database records
    const resumes = [
      {
        filename: 'Software_Engineer_Resume_2024.txt',
        content: sampleResumeContent1,
        isDefault: true
      },
      {
        filename: 'Product_Manager_Resume.txt', 
        content: sampleResumeContent2,
        isDefault: false
      }
    ]

    for (const resumeData of resumes) {
      // Create database record first
      const resume = await prisma.resume.create({
        data: {
          userId,
          filename: resumeData.filename,
          url: '', // Will be updated after file is saved
          fileSize: Buffer.byteLength(resumeData.content, 'utf8'),
          isDefault: resumeData.isDefault
        }
      })

      // Save file to disk
      const fileName = `${resume.id}-${resumeData.filename}`
      const filePath = join(uploadsDir, fileName)
      await writeFile(filePath, resumeData.content, 'utf8')

      // Update database with correct URL
      const fileUrl = `/api/resumes/${resume.id}/download`
      await prisma.resume.update({
        where: { id: resume.id },
        data: { url: fileUrl }
      })
    }

    console.log('Sample data created successfully!')
    
  } catch (error) {
    console.error('Error seeding data:', error)
    throw error
  }
}

export async function clearUserData(userId: string) {
  try {
    await prisma.internship.deleteMany({
      where: { userId }
    })
    
    await prisma.resume.deleteMany({
      where: { userId }
    })
    
    await prisma.note.deleteMany({
      where: { userId }
    })
    
    console.log('User data cleared successfully!')
  } catch (error) {
    console.error('Error clearing data:', error)
    throw error
  }
} 