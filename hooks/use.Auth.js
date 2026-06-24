import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function signIn(email, password) {
    setLoading(true); setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
    return !error
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function resetPassword(email) {
    setLoading(true); setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) setError(error.message)
    setLoading(false)
    return !error
  }

  return { signIn, signOut, resetPassword, loading, error }
}
