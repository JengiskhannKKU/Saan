"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home } from "lucide-react"

interface ErrorPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams
  const errorMessage = params.error || "An unexpected error occurred"

  return (
    <div className="min-h-screen auth-gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white dark:bg-auth-card rounded-3xl p-8 auth-card-shadow text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-6"
          >
            <AlertCircle className="w-10 h-10 text-destructive" />
          </motion.div>

          {/* Logo */}
          <h1 className="text-2xl font-light text-foreground tracking-wide mb-2">saan</h1>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <p className="text-sm text-destructive">{errorMessage}</p>
            </div>
            <p className="text-sm text-auth-text-muted">Please try again or contact support if the problem persists.</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 space-y-3"
          >
            <Button
              asChild
              className="w-full h-12 bg-auth-button hover:bg-auth-button-hover text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Link href="/auth/login">Try Again</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full h-12 border-border hover:bg-accent rounded-xl font-medium transition-all duration-200 bg-transparent"
            >
              <Link href="/" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
