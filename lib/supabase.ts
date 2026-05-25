import { createClient, SupabaseClient } from '@supabase/supabase-js'

function initClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // Fall back to placeholder during static build — no requests are made at build time
  return createClient(
    url || 'https://placeholder.supabase.co',
    key || 'placeholder-key'
  )
}

export const supabase = initClient()

export type Response = {
  id: string
  created_at: string
  answers: boolean[]
  all_correct: boolean
}
