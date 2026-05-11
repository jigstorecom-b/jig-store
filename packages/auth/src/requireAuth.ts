import { createSupabaseServerClient } from './server'
import { redirect } from 'next/navigation'

// Use at the top of any server component that requires login
export async function requireAuth() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return { email: 'dev@businessengine.com' } as any // Fallback for build/dev without env

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return user
}

// Use for pages that require a specific role
export async function requireRole(role: 'admin' | 'client' | 'customer') {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return { email: 'dev@businessengine.com' } as any // Fallback

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== role) redirect('/unauthorized')

  return user
}
