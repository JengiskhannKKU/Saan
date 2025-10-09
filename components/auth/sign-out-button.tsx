"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Error signing out:', error)
        return
      }
      
      // Redirect to login page after successful sign out
      router.push("/auth/login")
      router.refresh() // Refresh to update the auth state
    } catch (error) {
      console.error('Unexpected error during sign out:', error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut}>
      <LogOut className="h-5 w-5" />
    </Button>
  )
}