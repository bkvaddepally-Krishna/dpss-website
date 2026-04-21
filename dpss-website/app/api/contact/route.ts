import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We initialize the client inside the route to ensure it catches fresh environment variables.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Supabase admin client securely securely
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase Environment Variables');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Insert into contact_inquiries table
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          subject: subject?.trim() || 'General Inquiry',
          message: message.trim(),
        }
      ]);

    if (error) {
      console.error('Supabase Insertion Error:', error);
      return NextResponse.json(
        { error: 'Failed to submit your message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('Contact API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
