import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function PUT(req) {
  const body = await req.json();
  const { id, email, role } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase.auth.admin.updateUserById(id, {
    email,
    user_metadata: { role },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}



