
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aswcmcqtukujphbhahao.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzd2NtY3F0dWt1anBoYmhhaGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODkzNTMsImV4cCI6MjA2ODk2NTM1M30.A7o82qtIFtRoFSllUPVcF8KDXFKn2ooUOI01M7JL0E4'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
// export { supabase }

