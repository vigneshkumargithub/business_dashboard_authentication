

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(req, res) {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ users: data.users }, { status: 200 });
  } catch (e) {

    console.error('Error fetching users:', e);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
