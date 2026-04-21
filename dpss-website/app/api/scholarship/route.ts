import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    // Initialize inside the request to prevent build-time static evaluation errors when ENV is MISSING
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database connection not configured' }, { status: 500 });
    }
    
    const { dob, mobile } = await request.json();

    if (!dob || !mobile) {
      return NextResponse.json(
        { error: 'Date of Birth and Mobile Number are required' },
        { status: 400 }
      );
    }

    // Initialize Supabase admin client here safely
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch all records to do a robust JavaScript filter to avoid quoting and trailing space bugs
    const { data: allRecords, error } = await supabase
      .from('scholarship_applicants')
      .select('*');

    if (error || !allRecords) {
      console.error('Supabase lookup error or no unmatched data:', error);
      return NextResponse.json(
        { error: 'Database query failed or is empty.', details: error },
        { status: 500 }
      );
    }

    const cleanInputMobile = mobile.trim();
    const cleanInputDob = dob.trim();

    // Find exact match ignoring spaces and straight/smart quote variations
    const student = allRecords.find((row) => {
      const rowMobile = String(row["FATHER'S CONTACT NUMBER"] || row["FATHER’S CONTACT NUMBER"] || "").trim();
      const rowDob = String(row["DOB"] || "").trim();
      
      return rowMobile === cleanInputMobile && rowDob === cleanInputDob;
    });

    if (!student) {
      return NextResponse.json(
        { error: 'No matching verified record found. Ensure entered details exactly match your application, or await admin verification.' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Internal API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while verifying details.' },
      { status: 500 }
    );
  }
}
