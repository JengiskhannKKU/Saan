"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Smartphone, ArrowLeft } from "lucide-react"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || ""

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("")
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otpCode,
        type: "sms",
      })

      if (error) throw error
      router.push("/auth/success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Invalid verification code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      })
      if (error) throw error
    } catch (error) {
      console.error("Error resending OTP:", error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4 -ml-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "serif" }}>
              saan
            </div>

            {/* Phone Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-2">Enter Verification Code</h1>
            <p className="text-sm text-gray-600">
              We've sent a 6-digit code to
              <br />
              <span className="font-medium">{phone}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-gray-200 rounded-lg focus:border-green-500 focus:ring-0"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg mb-6">{error}</div>}

          {/* Verify Button */}
          <Button
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium mb-4"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
            <Button
              onClick={handleResendOTP}
              disabled={isResending}
              variant="ghost"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
