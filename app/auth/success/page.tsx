"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function AuthSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

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
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to saan!</h1>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            Your account has been successfully verified. You can now start exploring our marketplace and discover
            amazing handcrafted products.
          </p>

          {/* Continue Button */}
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium mb-4"
          >
            Continue to Dashboard
          </Button>

          {/* Auto-redirect notice */}
          <p className="text-xs text-gray-500">You'll be automatically redirected in a few seconds...</p>
        </div>
      </div>
    </div>
  )
}
