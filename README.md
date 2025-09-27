# Next.js project structure

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jengiskhannkkus-projects/v0-next-js-project-structure)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/IjMmxmxQzh6)

## Overview

This is a modern Next.js application built with:
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Material-UI (MUI)** for components
- **Framer Motion** for animations
- **Redux Toolkit** for state management
- **Supabase** for authentication and database

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### 1. Clone and Install
\`\`\`bash
git clone <your-repo-url>
cd your-project-name
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 2. Environment Variables
Create a `.env.local` file in the project root:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: For development redirects
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### 3. Get Your Supabase Credentials
1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Database Setup
Run the SQL script to create necessary tables:
\`\`\`sql
-- Copy and run the contents of scripts/001_create_profiles.sql in your Supabase SQL editor
\`\`\`

### 5. Run Development Server
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
├── components/            
│   ├── layout/            # Layout components (Container, Grid, Flex)
│   ├── navigation/        # Navbar and mobile navigation
│   ├── providers/         # Redux and theme providers
│   └── ui/               # Reusable UI components
├── lib/
│   ├── redux/            # Redux store, slices, and hooks
│   ├── supabase/         # Supabase client configuration
│   └── utils.ts          # Utility functions
├── scripts/              # Database migration scripts
└── .env.local           # Environment variables (create this)
\`\`\`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Theme** - Theme switching with MUI
- **Authentication** - Complete auth flow with Supabase
- **State Management** - Redux Toolkit with TypeScript
- **Animations** - Smooth transitions with Framer Motion
- **Modern UI** - Material-UI components with custom styling

## Deployment

Your project is live at:
**[https://vercel.com/jengiskhannkkus-projects/v0-next-js-project-structure](https://vercel.com/jengiskhannkkus-projects/v0-next-js-project-structure)**

Continue building your app on:
**[https://v0.app/chat/projects/IjMmxmxQzh6](https://v0.app/chat/projects/IjMmxmxQzh6)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
