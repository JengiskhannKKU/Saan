"use client"

import { createClient } from "./client"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setUser, clearUser, setLoading, setError } from "@/lib/redux/slices/auth-slice"

export function useSupabaseAuth() {
  const dispatch = useAppDispatch()
  const supabase = createClient()

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    dispatch(setLoading(true))
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: metadata,
        },
      })

      if (error) throw error

      if (data.user) {
        dispatch(
          setUser({
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name,
          }),
        )
      }

      return { data, error: null }
    } catch (error: any) {
      dispatch(setError(error.message))
      return { data: null, error }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const signIn = async (email: string, password: string) => {
    dispatch(setLoading(true))
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        dispatch(
          setUser({
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name,
          }),
        )
      }

      return { data, error: null }
    } catch (error: any) {
      dispatch(setError(error.message))
      return { data: null, error }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const signOut = async () => {
    dispatch(setLoading(true))
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      dispatch(clearUser())
      return { error: null }
    } catch (error: any) {
      dispatch(setError(error.message))
      return { error }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getCurrentUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) throw error

      if (user) {
        dispatch(
          setUser({
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name,
          }),
        )
      } else {
        dispatch(clearUser())
      }

      return { user, error: null }
    } catch (error: any) {
      dispatch(setError(error.message))
      return { user: null, error }
    }
  }

  return {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    supabase,
  }
}
