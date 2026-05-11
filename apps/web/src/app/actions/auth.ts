'use server'
import { createSupabaseServerClient } from '@engine/auth'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}
