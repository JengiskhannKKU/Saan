"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Mail, CheckCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [resent, setResent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.push("/dashboard")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleResendEmail = async () => {
    const supabase = createClient()
    setIsResending(true)

    try {
      // Get the current user's email from session storage or state
      const email = localStorage.getItem("signup_email") || ""
      if (email) {
        await supabase.auth.resend({
          type: "signup",
          email: email,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          },
        })
        setResent(true)
      }
    } catch (error) {
      console.error("Error resending email:", error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 mb-8" style={{ fontFamily: "serif" }}>
            saan
          </div>

          {/* Email Icon */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>

          {/* Content */}
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Check Your Email</h1>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            We've sent a verification link to your email address. Please click the link to verify your account and
            complete the registration process.
          </p>

          {/* Resend Button */}
          <div className="space-y-4">
            <Button
              onClick={handleResendEmail}
              disabled={isResending || resent}
              variant="outline"
              className="w-full h-12 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              {isResending ? "Sending..." : resent ? "Email Sent!" : "Resend Email"}
            </Button>

            {resent && (
              <div className="flex items-center justify-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Verification email sent successfully
              </div>
            )}
          </div>

          {/* Back to Login */}
          <div className="mt-8">
            <Button
              onClick={() => router.push("/auth/login")}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
