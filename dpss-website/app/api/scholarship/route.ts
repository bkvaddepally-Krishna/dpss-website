import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const body = await request.json();
    const { dob, mobile } = body;

    // Basic input validation
    if (!dob || !mobile) {
      return NextResponse.json(
        { error: 'Date of Birth and Mobile Number are required.' },
        { status: 400 }
      );
    }

    // Sanitize inputs — reject suspiciously long values
    if (String(dob).length > 50 || String(mobile).length > 15) {
      return NextResponse.json({ error: 'Invalid input format.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const cleanMobile = String(mobile).trim().replace(/\s+/g, '');
    const cleanDob = String(dob).trim();

    // FIX: Filter by DOB at DB level first to reduce memory usage,
    // then verify mobile in JS (safe since this is server-side only)
    const { data: records, error } = await supabase
      .from('scholarship_applicants')
      .select('*')
      .ilike('DOB', cleanDob);

    if (error) {
      // Log full error server-side only — never expose to client
      console.error('Supabase scholarship lookup error:', error);
      return NextResponse.json({ error: 'Database query failed.' }, { status: 500 });
    }

    if (!records || records.length === 0) {
      return NextResponse.json(
        { error: 'No matching verified record found. Ensure entered details exactly match your application.' },
        { status: 404 }
      );
    }

    // Secondary verification: match mobile number in JS
    const student = records.find((row) => {
      const rowMobile = String(
        row["FATHER’S CONTACT NUMBER"] ||
        row["MOTHER’S CONTACT NUMBER"] || ''
      ).trim().replace(/\s+/g, '');
      return rowMobile === cleanMobile;
    });

    if (!student) {
      return NextResponse.json(
        { error: 'No matching verified record found. Ensure entered details exactly match your application.' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);

  } catch (error) {
    console.error('Internal scholarship API error:', error);
    // Never expose internal error details to client
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
