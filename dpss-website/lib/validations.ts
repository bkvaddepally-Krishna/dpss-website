import { z } from 'zod';

export const studentDetailsSchema = z.object({
  classApplying: z.string().min(1, 'Please select a class'),
  firstName: z.string().min(2, 'First name must be 2-50 characters').max(50, 'First name must be 2-50 characters').regex(/^[A-Za-z\s]+$/, 'Letters only allowed'),
  lastName: z.string().min(2, 'Last name must be 2-50 characters').max(50, 'Last name must be 2-50 characters').regex(/^[A-Za-z\s]+$/, 'Letters only allowed'),
  dob: z.string().refine((val) => {
    const date = new Date(val);
    const minDate = new Date('2008-01-01');
    const maxDate = new Date('2023-12-31');
    return date >= minDate && date <= maxDate;
  }, { message: 'Student must be between 3-16 years old' }),
  aadhar: z.string().optional().refine(val => !val || /^\d{12}$/.test(val), {
    message: 'Aadhar must be exactly 12 digits',
  }),
  gender: z.enum(['Male', 'Female', 'Other'], { message: 'Please select gender' }),
  bloodGroup: z.string().optional(),
  photo: z.any().optional(), // File validation handled in component usually, or skip strict schema check if base64/files
});

export const addressSchema = z.object({
  permanentAddress: z.string().min(8, 'Address must be 8-200 characters').max(200, 'Address must be 8-200 characters'),
  copyToTemporary: z.boolean().default(false),
  temporaryAddress: z.string().min(8, 'Address must be 8-200 characters').max(200, 'Address must be 8-200 characters'),
  city: z.string().min(1, 'City is required').max(50),
  pinCode: z.string().regex(/^\d{6}$/, 'PIN must be exactly 6 digits'),
});

export const parentDetailsSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required').max(100).regex(/^[A-Za-z\s]+$/, 'Letters only'),
  fatherEmployment: z.string().max(100).optional(),
  fatherPhone: z.string().regex(/^\+91\d{10}$/, 'Phone must be +91 followed by 10 digits'),
  fatherEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  
  motherName: z.string().min(1, 'Mother name is required').max(100).regex(/^[A-Za-z\s]+$/, 'Letters only'),
  motherEmployment: z.string().max(100).optional(),
  motherPhone: z.string().regex(/^\+91\d{10}$/, 'Phone must be +91 followed by 10 digits'),
  motherEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  
  hasGuardian: z.boolean().default(false),
  guardianName: z.string().max(100).regex(/^[A-Za-z\s]*$/, 'Letters only').optional(),
  guardianRelation: z.string().max(50).optional(),
  guardianEmployment: z.string().max(100).optional(),
  guardianPhone: z.string().optional().refine(val => !val || /^\+91\d{10}$/.test(val), 'Phone must be +91 followed by 10 digits'),
  
  source: z.string().min(1, 'Please select an option'),
});

export const completeFormSchema = z.object({
  ...studentDetailsSchema.shape,
  ...addressSchema.shape,
  ...parentDetailsSchema.shape,
  declaration: z.literal(true, { message: 'You must agree to continue' }),
});

export type FormValues = z.infer<typeof completeFormSchema>;
