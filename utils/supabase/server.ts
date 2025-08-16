import { createClient } from '@supabase/supabase-js'
import { auth } from '@/lib/auth'
import { Database } from '@/types/database.types'

/**
 * Creates a Supabase client for server-side operations
 * Uses the service role key for administrative access
 * This is secure as it only runs on the server
 */
const getSupabaseClient = async () => {
	const session = await auth()
	
	// Check if user is authenticated
	if (!session?.user?.id) {
		throw new Error('User not authenticated')
	}

	// Use service role client for server-side operations
	// This is safe because this code only runs on the server
	return createSupabaseAdminClient()
}

/**
 * Creates a Supabase admin client with service role privileges
 * Should only be used in server-side code
 */
function createSupabaseAdminClient() {
	return createClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SECRET_KEY!, // Use the existing secret key variable
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false
			}
		}
	)
}
export { getSupabaseClient, createSupabaseAdminClient }