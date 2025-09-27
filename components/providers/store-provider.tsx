"use client"

import type React from "react"
import { useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { useSupabaseAuth } from "@/lib/supabase/auth"

interface StoreProviderProps {
  children: React.ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const dispatch = useAppDispatch()
  const { getCurrentUser } = useSupabaseAuth()

  useEffect(() => {
    // Initialize auth state on app load
    getCurrentUser()
  }, [getCurrentUser])

  return <>{children}</>
}
