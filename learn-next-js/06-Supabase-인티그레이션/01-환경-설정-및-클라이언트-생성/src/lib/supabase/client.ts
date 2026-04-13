import { createBrowserClient } from '@supabase/ssr'
import { supabaseConfig } from './config'

// supabase client 객체  생성 함수
export const createClient = () => {
  return createBrowserClient(supabaseConfig.url, supabaseConfig.key)
}
