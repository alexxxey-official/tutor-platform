import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

let client = null

function getClient() {
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return client
}

export const supabase = getClient()
