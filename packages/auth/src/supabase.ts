import { createClient } from '@supabase/supabase-js'

// Lazy-initialized clients — avoids crashing during build-time static analysis
// when environment variables are not yet available.

let _supabaseAdmin: ReturnType<typeof createClient> | null = null
let _supabase: ReturnType<typeof createClient> | null = null

/** Server-side client (full access, for server actions) */
export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      console.warn('Supabase admin credentials missing. Client initialization skipped.')
      return null as any
    }
    _supabaseAdmin = createClient(url, key)
  }
  return _supabaseAdmin
}

/** Client-side client (anon key, for browser) */
export function getSupabase() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      console.warn('Supabase credentials missing. Client initialization skipped.')
      return null as any
    }
    _supabase = createClient(url, key)
  }
  return _supabase
}

// Backwards-compatible exports (lazy getters)
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get: (_target, prop) => {
    const client = getSupabaseAdmin()
    return client?.[prop as keyof typeof client]
  }
})

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get: (_target, prop) => {
    const client = getSupabase()
    return client?.[prop as keyof typeof client]
  }
})
