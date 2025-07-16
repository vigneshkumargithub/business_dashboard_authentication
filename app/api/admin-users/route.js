// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// export async function GET() {
//   const supabaseAdmin = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.SUPABASE_SERVICE_ROLE_KEY
//   );

//   const { data, error } = await supabaseAdmin.auth.admin.listUsers();
//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });

//   return NextResponse.json(data.users);
// }


// /app/api/admin-users/route.js


import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ users: data.users });
}
