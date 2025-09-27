"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 mb-8" style={{ fontFamily: "serif" }}>
            saan
          </div>

          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Content */}
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Check Your Email</h1>
          <div className="space-y-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We've sent you a confirmation link at your email address. Please check your inbox and click the link to
              verify your account.
            </p>
          </div>

          {/* Action Button */}
          <Button asChild className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium mb-6">
            <Link href="/auth/login">Back to Login</Link>
          </Button>

          {/* Help Text */}
          <p className="text-xs text-gray-500">
            Didn't receive the email? Check your spam folder or{" "}
            <Link href="/auth/sign-up" className="text-gray-800 hover:underline">
              try again
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
