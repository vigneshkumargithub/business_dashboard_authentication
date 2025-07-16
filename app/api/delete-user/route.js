// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// export async function DELETE(req) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');

//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.SUPABASE_SERVICE_ROLE_KEY
//   );

//   const { error } = await supabase.auth.admin.deleteUser(id);
//   if (error) return NextResponse.json({ error: error.message }, { status: 500 });

//   return NextResponse.json({ success: true });
// }



import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('id');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
