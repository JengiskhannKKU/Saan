"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
      setIsSuccess(true)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <div className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "serif" }}>
              saan
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Check your email</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to reset your
              password.
            </p>

            <Button asChild className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Back Button */}
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: "serif" }}>
              saan
            </div>
            <p className="text-sm text-gray-600 mt-2">Reset your password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">We'll send you a link to reset your password</p>
            </div>

            {/* Error Message */}
            {error && <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg">{error}</div>}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium"
            >
              {isLoading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
