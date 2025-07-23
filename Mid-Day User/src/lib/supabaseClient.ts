
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tymhxgqtlhilxdepowax.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bWh4Z3F0bGhpbHhkZXBvd2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMTExMTAsImV4cCI6MjA2ODc4NzExMH0.0ur2qSw0HkYr_jipyIbu2MjDOwC2M09tTg_yP-K-Euc'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
// export { supabase }

