
import 'server-only'
import { cookies } from "next/headers"
import { createClient } from "./server"
import  {type SupabaseClient} from '@supabase/supabase-js'



export const createSupabase = async ():Promise<SupabaseClient> => {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}