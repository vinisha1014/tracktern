# 🎯 Tracktern - AI-Powered Internship Tracker

**Tracktern** is a modern, AI-powered internship tracking application built for students. It features a beautiful UI, intelligent tracking, and **Generative UI** capabilities that allow users to create custom components using natural language.

![Tracktern Screenshot](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Tracktern+Dashboard)

## ✨ Features

### 🔮 **Generative UI (Key Feature)**
- **AI Workspace**: Chat interface where users can describe what they want
- **Component Generation**: AI creates custom React components for tracking
- **Live Preview**: See generated components in real-time
- **Save & Reuse**: Save generated components to your dashboard

### 📊 **Core Internship Tracking**
- **Kanban Board**: Visual pipeline of application statuses
- **Smart Dashboard**: Real-time stats and insights
- **Application Management**: Add, edit, and track internships
- **Status Tracking**: Applied → Interviewing → Offer → Rejected

### 🤖 **AI-Powered Features**
- **Smart Suggestions**: AI recommends follow-ups after 7+ days
- **Component Generation**: Create custom UI with natural language
- **Intelligent Reminders**: Get notified about important deadlines

### 📁 **Resume Management**
- **Multiple Resumes**: Upload and manage different versions
- **File Storage**: Powered by Vercel Blob API
- **Quick Access**: Preview, download, and organize resumes

### 🎨 **Modern UI/UX**
- **Beautiful Design**: Clean, modern interface using Tailwind CSS
- **Dark/Light Mode**: Automatic theme switching
- **Responsive**: Works perfectly on mobile and desktop
- **Smooth Animations**: Delightful user experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **File Storage**: Vercel Blob API
- **AI**: Vercel AI SDK + GitHub AI Models (GPT-4o)
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Supabase)
- API keys for required services

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd tracktern
npm install
```

### 2. Environment Setup
Create a `.env.local` file with the following variables:

```env
# Database (Supabase or PostgreSQL)
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# GitHub AI Token (for Generative UI via GitHub Models)
GITHUB_TOKEN="ghp_..."

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 4. Start Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📋 API Keys Setup Guide

### 🔐 **Clerk (Authentication)**
1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the publishable key and secret key
4. Configure redirect URLs in Clerk dashboard

### 🗄️ **Supabase (Database)**
1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to Settings → Database
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your database password

### 📁 **Vercel Blob (File Storage)**
1. Go to [vercel.com](https://vercel.com) and create an account
2. Create a new project
3. Go to Storage → Create Database → Blob
4. Copy the `BLOB_READ_WRITE_TOKEN`

### 🤖 **GitHub AI Models (AI Features)**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Create an API key
3. Add billing information (pay-per-use)
4. Copy the API key

## 🎯 Usage Guide

### Adding Internships
1. Click **"Add Internship"** from sidebar or dashboard
2. Fill in company, role, status, and other details
3. Add tags for easy categorization
4. Include job posting link and notes

### Using AI Workspace
1. Navigate to **"AI Workspace"** in sidebar
2. Describe what you want: *"Create a pie chart of my application statuses"*
3. AI generates a custom React component
4. Preview, copy code, or save to dashboard

### Managing Applications
- **Drag & Drop**: Move applications between status columns
- **Quick Edit**: Click on any application card to edit
- **Smart Reminders**: Get AI suggestions for follow-ups
- **Search**: Find applications quickly using the search bar

## 🗂️ Project Structure

```
tracktern/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── sign-in/           # Authentication pages
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── ai/               # AI/Generative UI components
│   │   └── ui/               # Shadcn UI components
│   ├── lib/                  # Utilities and configurations
│   ├── types/                # TypeScript type definitions
│   └── hooks/                # Custom React hooks
├── prisma/                   # Database schema and migrations
└── public/                   # Static assets
```

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Database Migration
```bash
# Production database setup
npx prisma migrate deploy
npx prisma generate
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help setting up:

1. Check the [Issues](../../issues) page
2. Create a new issue with your question
3. Include error messages and environment details

## 🎉 Acknowledgments

- **Vercel** for the amazing AI SDK and hosting platform
- **Clerk** for seamless authentication
- **Shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ for students landing their dream internships**
