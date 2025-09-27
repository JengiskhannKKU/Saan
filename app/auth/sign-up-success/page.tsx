"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen auth-gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white dark:bg-auth-card rounded-3xl p-8 auth-card-shadow text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </motion.div>

          {/* Logo */}
          <h1 className="text-2xl font-light text-foreground tracking-wide mb-2">saan</h1>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground">Check your email</h2>
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-2">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-auth-text-muted leading-relaxed">
                We've sent you a confirmation link at your email address. Please check your inbox and click the link to
                verify your account.
              </p>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8"
          >
            <Button
              asChild
              className="w-full h-12 bg-auth-button hover:bg-auth-button-hover text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-xs text-auth-text-muted mt-6"
          >
            Didn't receive the email? Check your spam folder or{" "}
            <Link href="/auth/sign-up" className="text-primary hover:text-auth-button-hover transition-colors">
              try again
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
