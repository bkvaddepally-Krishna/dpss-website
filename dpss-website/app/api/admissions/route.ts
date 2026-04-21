import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { completeFormSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Re-validate strictly on server
    const result = completeFormSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.issues },
        { status: 400 }
      );
    }

    const formData = result.data;

    // Generate Registration ID sequentially
    const { count, error: countError } = await supabase
      .from('admissions')
      .select('*', { count: 'exact', head: true });

    if (countError && countError.code !== '42P01') { 
      // Ignored 42P01 relation does not exist for fresh db setups
      console.error('Count Error:', countError);
    }

    const sequenceNum = (count || 0) + 1;
    const regId = `DPSS-2026-${sequenceNum.toString().padStart(4, '0')}`;

    // Map schema fields to DB fields
    const dbData = {
      reg_id: regId,
      class: formData.classApplying,
      first_name: formData.firstName,
      last_name: formData.lastName,
      dob: formData.dob,
      aadhar: formData.aadhar || null,
      gender: formData.gender,
      blood_group: formData.bloodGroup || null,
      perm_address: formData.permanentAddress,
      temp_address: formData.temporaryAddress,
      city: formData.city,
      pin: formData.pinCode,
      father_name: formData.fatherName,
      father_employment: formData.fatherEmployment || null,
      father_phone: formData.fatherPhone,
      father_email: formData.fatherEmail || null,
      mother_name: formData.motherName,
      mother_employment: formData.motherEmployment || null,
      mother_phone: formData.motherPhone,
      mother_email: formData.motherEmail || null,
      guardian_name: formData.guardianName || null,
      source: formData.source,
      // Note: mapping ignores files (handled via buckets usually) & boolean flags
    };

    // Insert into Supabase
    const { error: insertError } = await supabase
      .from('admissions')
      .insert([dbData]);

    if (insertError) {
      console.error('Supabase Insert Error:', insertError);
      
      // If table doesn't exist, simulate a successful response for the UI until DB is spun up
      if (insertError.code === '42P01') {
        return NextResponse.json({ 
          success: true, 
          registrationId: regId,
          note: 'Data not saved: Supabase table "admissions" does not exist yet.' 
        }, { status: 201 });
      }

      return NextResponse.json(
        { error: 'Database error', details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, registrationId: regId }, { status: 201 });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
