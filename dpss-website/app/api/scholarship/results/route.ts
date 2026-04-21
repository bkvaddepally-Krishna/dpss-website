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
    const { hallTicket, mobile } = body;

    if (!hallTicket || !mobile) {
      return NextResponse.json({ error: 'Hall Ticket and Mobile number are required.' }, { status: 400 });
    }

    // Sanitize inputs
    if (String(hallTicket).length > 30 || String(mobile).length > 15) {
      return NextResponse.json({ error: 'Invalid input format.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const cleanHallTicket = String(hallTicket).trim().toUpperCase();
    const cleanMobile = String(mobile).trim().replace(/\s+/g, '');

    // Step 1: Fetch applicant by Hall Ticket Number ONLY
    // Note: The column name "Hall Ticket Number" has spaces —
    // Supabase PostgREST handles this via URL encoding.
    // We verify mobile in JS to avoid apostrophe column name issues.
    const { data: applicants, error: appErr } = await supabase
      .from('scholarship_applicants')
      .select('"Hall Ticket Number", "STUDENT NAME", "CLASS", "FATHER\'S CONTACT NUMBER", "MOTHER\'S CONTACT NUMBER"')
      .eq('Hall Ticket Number', cleanHallTicket);

    if (appErr) {
      console.error('Scholarship applicants lookup error:', appErr);
      return NextResponse.json({ error: 'Database query failed.' }, { status: 500 });
    }

    if (!applicants || applicants.length === 0) {
      return NextResponse.json({
        error: 'Invalid Hall Ticket Number or Mobile Number. Please check your hall ticket.'
      }, { status: 404 });
    }

    // Step 2: Verify mobile number matches — JS-level check (server-side only)
    const applicant = applicants.find(a => {
      const father = String(a["FATHER'S CONTACT NUMBER"] || '').trim().replace(/\s+/g, '');
      const mother = String(a["MOTHER'S CONTACT NUMBER"] || '').trim().replace(/\s+/g, '');
      return father === cleanMobile || mother === cleanMobile;
    });

    if (!applicant) {
      return NextResponse.json({
        error: 'Invalid Hall Ticket Number or Mobile Number. Please check your hall ticket.'
      }, { status: 404 });
    }

    // Step 3: Fetch scholarship result for this hall ticket
    const { data: result, error: resErr } = await supabase
      .from('scholarship_results')
      .select('hall_ticket_no, student_name, class, total_marks, max_marks, scholarship_percentage, remarks')
      .eq('hall_ticket_no', cleanHallTicket)
      .maybeSingle();

    if (resErr) {
      console.error('Scholarship results lookup error:', resErr);
      return NextResponse.json({ error: 'Database query failed.' }, { status: 500 });
    }

    if (!result) {
      return NextResponse.json({
        error: 'Results not declared yet for this student. Please check back later.',
        isPending: true
      }, { status: 404 });
    }

    // Return only the fields the student needs — no internal IDs or admin fields
    return NextResponse.json({
      success: true,
      result: {
        hall_ticket_no:         result.hall_ticket_no,
        student_name:           applicant['STUDENT NAME'],
        class:                  applicant['CLASS'],
        total_marks:            result.total_marks,
        max_marks:              result.max_marks,
        scholarship_percentage: result.scholarship_percentage,
        remarks:                result.remarks,
      }
    });

  } catch (error) {
    console.error('Results API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
