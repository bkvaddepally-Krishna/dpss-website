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
    console.log('Registration Request Body:', body);

    const { 
      studentName, 
      className, 
      dob, 
      email, 
      fatherName, 
      motherName, 
      fatherPhone, 
      motherPhone, 
      previousSchool, 
      address, 
      isDpssStudent 
    } = body;

    // Validate essential fields
    if (!studentName || !className || !dob || !fatherPhone || !address) {
      console.warn('Missing fields:', { studentName, className, dob, fatherPhone, address });
      return NextResponse.json({ error: 'Please fill in all mandatory fields.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Finalized mapping based on actual database schema inspection
    const insertData = {
      'Email Address': email || '',
      'STUDENT NAME': studentName,
      'CLASS': className,
      "FATHER'S NAME": fatherName || '',
      "MOTHER'S NAME": motherName || '',
      'PREVIOUS SCHOOL': previousSchool || '',
      'FATHER’S CONTACT NUMBER': fatherPhone, // Uses curly apostrophe ’
      'DOB': dob,
      'ADDRESS': address,
      'MOTHER’S CONTACT NUMBER': motherPhone || '', // Uses curly apostrophe ’
      'RATING  ': 'New Application', // Has TWO spaces at the end
      'ARE YOU DPSS STUDENT': isDpssStudent ? 'Yes' : 'No',
    };

    const { data: insertedRows, error } = await supabase
      .from('scholarship_applicants')
      .insert([insertData])
      .select();

    if (error) {
      console.error('Supabase registration error:', error);
      return NextResponse.json({ 
        error: 'Failed to save registration.', 
        details: error.message 
      }, { status: 500 });
    }

    const data = insertedRows?.[0];
    console.log('Successfully inserted row:', data);

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful',
      hallTicketNo: data?.["Hall Ticket Number"] || 'Assigned soon'
    });

  } catch (error) {
    console.error('Internal scholarship registration API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
