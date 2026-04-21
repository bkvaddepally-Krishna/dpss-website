import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const body = await request.json();
    const { hallTicket, mobile } = body;

    if (!hallTicket || !mobile) {
      return NextResponse.json({ error: 'Hall Ticket and Mobile number are required.' }, { status: 400 });
    }

    if (String(hallTicket).length > 30 || String(mobile).length > 15) {
      return NextResponse.json({ error: 'Invalid input format.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const cleanHallTicket = String(hallTicket).trim().toUpperCase();
    const cleanMobile = String(mobile).trim().replace(/\D/g, '').slice(-10); // normalize to last 10 digits

    // ── Step 1: Verify student exists via Hall Ticket in scholarship_applicants ──
    const { data: applicants, error: appErr } = await supabase
      .from('scholarship_applicants')
      .select('*')
      .eq('Hall Ticket Number', cleanHallTicket);

    if (appErr) {
      console.error('Applicant lookup error:', appErr);
      return NextResponse.json({ error: 'Database query failed.' }, { status: 500 });
    }

    if (!applicants || applicants.length === 0) {
      return NextResponse.json({
        error: 'No registration found for this Hall Ticket Number.',
        code: 'NOT_REGISTERED'
      }, { status: 404 });
    }

    // ── Step 2: Verify mobile number (server-side JS check, avoid apostrophe column issues) ──
    const applicant = applicants.find(a => {
      const father = String(a["FATHER'S CONTACT NUMBER"] || '').trim().replace(/\D/g, '').slice(-10);
      const mother = String(a["MOTHER'S CONTACT NUMBER"] || '').trim().replace(/\D/g, '').slice(-10);
      return father === cleanMobile || mother === cleanMobile;
    });

    if (!applicant) {
      return NextResponse.json({
        error: 'Mobile number does not match our records. Please use the number registered during application.',
        code: 'MOBILE_MISMATCH'
      }, { status: 404 });
    }

    // ── Step 3: Check if result exists at all (regardless of publish state) ──
    const { data: anyResult, error: anyErr } = await supabase
      .from('scholarship_results')
      .select('id, is_published')
      .eq('hall_ticket_no', cleanHallTicket)
      .maybeSingle();

    if (anyErr) {
      console.error('Results check error:', anyErr);
      return NextResponse.json({ error: 'Database query failed.' }, { status: 500 });
    }

    // Result doesn't exist yet
    if (!anyResult) {
      return NextResponse.json({
        error: 'Results have not been entered for your Hall Ticket yet. Please check back soon.',
        code: 'RESULT_PENDING'
      }, { status: 404 });
    }

    // Result exists but admin hasn't published it yet
    if (!anyResult.is_published) {
      return NextResponse.json({
        error: 'Your results are being processed and will be published shortly. Please check back later.',
        code: 'NOT_PUBLISHED'
      }, { status: 403 });
    }

    // ── Step 4: Fetch the published result with full details ──
    const { data: result, error: resErr } = await supabase
      .from('scholarship_results')
      .select('hall_ticket_no, student_name, class, english_marks, science_marks, social_marks, maths_marks, gk_marks, total_marks, max_marks, scholarship_percentage, remarks')
      .eq('hall_ticket_no', cleanHallTicket)
      .eq('is_published', true)
      .single();

    if (resErr || !result) {
      return NextResponse.json({ error: 'Failed to fetch results. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      result: {
        hall_ticket_no:         result.hall_ticket_no,
        student_name:           applicant['STUDENT NAME'] || result.student_name,
        class:                  applicant['CLASS'] || result.class,
        father_name:            applicant["FATHER'S NAME"] || '',
        english_marks:          result.english_marks,
        science_marks:          result.science_marks,
        social_marks:           result.social_marks,
        maths_marks:            result.maths_marks,
        gk_marks:               result.gk_marks,
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
