# 🛠️ Tracktern Setup Guide

## Quick Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following:

```env
# Database (Supabase or PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/tracktern"

# Clerk Authentication (Get from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_key_here"
CLERK_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Vercel Blob Storage (Get from https://vercel.com)
BLOB_READ_WRITE_TOKEN="vercel_blob_your_token_here"

# GitHub AI Token (Get from https://github.com/settings/tokens)
GITHUB_TOKEN="ghp_your_github_token_here"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create and apply database migrations
npx prisma migrate dev --name init

# Optional: View your database
npx prisma studio
```

### 3. Development
```bash
# Install dependencies (if not done already)
npm install

# Start development server
npm run dev
```

## API Keys Setup

### 🔐 Clerk (Authentication)
1. Go to [clerk.com](https://clerk.com)
2. Create account and new application
3. Copy publishable key and secret key from dashboard
4. Configure redirect URLs in Clerk dashboard
5. **Set up webhook** (important for user sync):
   - Go to Webhooks in Clerk dashboard
   - Add endpoint: `your-domain.com/api/webhooks/clerk`
   - Subscribe to: `user.created`, `user.updated`, `user.deleted`
   - Copy webhook secret

### 🗄️ Supabase (Database)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string and replace password

### 📁 Vercel Blob (File Storage)
1. Go to [vercel.com](https://vercel.com)
2. Create project
3. Go to Storage → Create Database → Blob
4. Copy the `BLOB_READ_WRITE_TOKEN`

### 🤖 GitHub AI Models (AI Features)
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Create API key
3. Add billing information for usage
4. Copy the API key

## Testing

To test without full setup:
1. Set up only Clerk authentication (required for build)
2. Use placeholder values for other services
3. Features will be limited but app will run

## Troubleshooting

### Build Errors
- Ensure Clerk environment variables are set
- Run `npx prisma generate` to create database client

### Database Errors
- Check DATABASE_URL format
- Ensure database exists and is accessible
- Run migrations with `npx prisma migrate dev`

### Authentication Errors
- Verify Clerk keys are correct
- Check redirect URLs match your configuration

## Production Deployment

1. Set up production database
2. Configure environment variables in deployment platform
3. Run `npx prisma migrate deploy` for production migration
4. Deploy to Vercel, Netlify, or preferred platform 