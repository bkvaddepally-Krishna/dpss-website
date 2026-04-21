"use client";
// Entire form is a client component — all state, effects and event handlers live here
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeFormSchema, FormValues } from '@/lib/validations';
import { toast } from 'sonner';
import SuccessModal from './SuccessModal';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

const steps = [
  { id: 1, name: 'Student Details', fields: ['classApplying', 'firstName', 'lastName', 'dob', 'aadhar', 'gender', 'bloodGroup'] },
  { id: 2, name: 'Address', fields: ['permanentAddress', 'copyToTemporary', 'temporaryAddress', 'city', 'pinCode'] },
  { id: 3, name: 'Parent Details', fields: ['fatherName', 'fatherEmployment', 'fatherPhone', 'fatherEmail', 'motherName', 'motherEmployment', 'motherPhone', 'motherEmail', 'hasGuardian', 'guardianName', 'guardianRelation', 'guardianEmployment', 'guardianPhone', 'source'] },
  { id: 4, name: 'Review & Submit', fields: ['declaration'] }
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string, email: string | null } | null>(null);

  // Initialize form
  const { register, handleSubmit, trigger, watch, setValue, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(completeFormSchema) as any,
    mode: 'onTouched',
    defaultValues: {
      copyToTemporary: false,
      hasGuardian: false,
      classApplying: "",
      source: ""
    }
  });

  // Watch fields for conditional logic
  const copyToTemporary = watch('copyToTemporary');
  const permanentAddress = watch('permanentAddress');
  const hasGuardian = watch('hasGuardian');
  const formValues = watch();

  // Handle copy address effect
  useEffect(() => {
    if (copyToTemporary) {
      setValue('temporaryAddress', permanentAddress || '', { shouldValidate: true });
    }
  }, [copyToTemporary, permanentAddress, setValue]);

  // Navigation handlers
  const nextStep = async () => {
    const currentFields = steps.find(s => s.id === currentStep)?.fields;
    
    // Validate only fields in current step before moving
    if (currentFields) {
      const isStepValid = await trigger(currentFields as any);
      if (isStepValid) {
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error('Please fix the errors before continuing.');
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSuccessData({
        id: result.registrationId,
        email: data.fatherEmail || data.motherEmail || null
      });

    } catch (error: any) {
      toast.error(error.message || 'Failed to submit. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable Error Component
  const ErrorMsg = ({ name }: { name: keyof FormValues }) => {
    const error = errors[name];
    if (!error) return null;
    return <p className="text-red-500 text-xs mt-1">{error.message as string}</p>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-border-light">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-typography-dark">
            Step {currentStep} of {steps.length}
          </h3>
          <span className="text-sm font-medium text-primary">
            {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}% Completed
          </span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {/* Step dots (desktop) */}
        <div className="hidden sm:flex justify-between mt-4">
          {steps.map(step => (
            <div key={step.id} className={`text-xs font-medium ${currentStep >= step.id ? 'text-primary' : 'text-gray-400'}`}>
              {step.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-border-light">
        
        {/* ================= STEP 1: STUDENT DETAILS ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Student Details</h2>
            
            <div>
              <label className="block text-sm font-semibold text-typography-dark mb-1">Class Applying For *</label>
              <select 
                {...register('classApplying')} 
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.classApplying ? 'border-red-500' : 'border-gray-200'}`}
              >
                <option value="">Select a class...</option>
                <option value="Nursery">Nursery (Age 3-4)</option>
                <option value="LKG">LKG (Age 4-5)</option>
                <option value="UKG">UKG (Age 5-6)</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={`Class ${n}`}>Class {n}</option>
                ))}
              </select>
              <ErrorMsg name="classApplying" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-typography-dark mb-1">First Name *</label>
                <input 
                  type="text" 
                  placeholder="Student First Name"
                  {...register('firstName')} 
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
                />
                <div className="flex justify-between mt-1">
                  <ErrorMsg name="firstName" />
                  <span className="text-xs text-gray-400 ml-auto">{formValues.firstName?.length || 0}/50</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-typography-dark mb-1">Last Name *</label>
                <input 
                  type="text" 
                  placeholder="Student Last Name"
                  {...register('lastName')} 
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
                />
                <div className="flex justify-between mt-1">
                  <ErrorMsg name="lastName" />
                  <span className="text-xs text-gray-400 ml-auto">{formValues.lastName?.length || 0}/50</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-typography-dark mb-1">Date of Birth *</label>
                <input 
                  type="date" 
                  {...register('dob')} 
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.dob ? 'border-red-500' : 'border-gray-200'}`}
                />
                <ErrorMsg name="dob" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-typography-dark mb-1">Aadhar Number</label>
                <input 
                  type="text" 
                  placeholder="12 Digit Aadhar (Optional)"
                  {...register('aadhar')} 
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.aadhar ? 'border-red-500' : 'border-gray-200'}`}
                />
                <ErrorMsg name="aadhar" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-typography-dark mb-2">Gender *</label>
                <div className="flex gap-4">
                  {['Male', 'Female', 'Other'].map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={option} {...register('gender')} className="text-primary focus:ring-primary" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <ErrorMsg name="gender" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-typography-dark mb-1">Blood Group</label>
                <select 
                  {...register('bloodGroup')} 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                >
                  <option value="">Select...</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-typography-dark mb-1">Upload Photo (Optional, max 10MB)</label>
              <input 
                type="file" 
                accept="image/*"
                {...register('photo')} 
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 2: ADDRESS ================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Address Details</h2>

            <div>
              <label className="block text-sm font-semibold text-typography-dark mb-1">Permanent Address *</label>
              <textarea 
                rows={3}
                placeholder="House No, Street, Landmark..."
                {...register('permanentAddress')} 
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.permanentAddress ? 'border-red-500' : 'border-gray-200'}`}
              />
              <div className="flex justify-between mt-1">
                <ErrorMsg name="permanentAddress" />
                <span className="text-xs text-gray-400 ml-auto">{formValues.permanentAddress?.length || 0}/200</span>
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <input 
                type="checkbox" 
                id="copyAddress"
                {...register('copyToTemporary')} 
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <label htmlFor="copyAddress" className="text-sm font-medium text-typography-dark cursor-pointer">
                Copy permanent address to temporary
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-typography-dark mb-1">Temporary Address *</label>
              <textarea 
                rows={3}
                placeholder="Current residential address..."
                {...register('temporaryAddress')} 
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.temporaryAddress ? 'border-red-500' : 'border-gray-200'}`}
              />
              <div className="flex justify-between mt-1">
                <ErrorMsg name="temporaryAddress" />
                <span className="text-xs text-gray-400 ml-auto">{formValues.temporaryAddress?.length || 0}/200</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-typography-dark mb-1">City *</label>
                <input 
                  type="text" 
                  placeholder="e.g., Siddipet"
                  {...register('city')} 
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
                />
                <ErrorMsg name="city" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-typography-dark mb-1">PIN Code *</label>
                <input 
                  type="text" 
                  placeholder="6 Digit PIN"
                  {...register('pinCode')} 
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.pinCode ? 'border-red-500' : 'border-gray-200'}`}
                />
                <ErrorMsg name="pinCode" />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PARENT DETAILS ================= */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Parent Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Father */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="text-lg font-bold text-typography-dark underline decoration-accent decoration-2 underline-offset-4 mb-4">Father's Details</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-typography-dark mb-1">Full Name *</label>
                  <input type="text" {...register('fatherName')} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${errors.fatherName ? 'border-red-500' : 'border-gray-200'}`} />
                  <ErrorMsg name="fatherName" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-typography-dark mb-1">Occupation / Employment</label>
                  <input type="text" {...register('fatherEmployment')} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-typography-dark mb-1">Phone Number *</label>
                  <input type="text" placeholder="+91 XXXXXXXXXX" {...register('fatherPhone')} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${errors.fatherPhone ? 'border-red-500' : 'border-gray-200'}`} />
                  <ErrorMsg name="fatherPhone" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-typography-dark mb-1">Email Address</label>
                  <input type="email" placeholder="father@example.com" {...register('fatherEmail')} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${errors.fatherEmail ? 'border-red-500' : 'border-gray-200'}`} />
                  <ErrorMsg name="fatherEmail" />
                </div>
              </div>

              {/* Mother */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="text-lg font-bold text-typography-dark underline decoration-accent decoration-2 underline-offset-4 mb-4">Mother's Details</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-typography-dark mb-1">Full Name *</label>
                  <input type="text" {...register('motherName')} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${errors.motherName ? 'border-red-500' : 'border-gray-200'}`} />
                  <ErrorMsg name="motherName" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-typography-dark mb-1">Occupation / Employment</label>
                  <input type="text" {...register('motherEmployment')} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-typography-dark mb-1">Phone Number *</label>
                  <input type="text" placeholder="+91 XXXXXXXXXX" {...register('motherPhone')} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${errors.motherPhone ? 'border-red-500' : 'border-gray-200'}`} />
                  <ErrorMsg name="motherPhone" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-typography-dark mb-1">Email Address</label>
                  <input type="email" placeholder="mother@example.com" {...register('motherEmail')} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${errors.motherEmail ? 'border-red-500' : 'border-gray-200'}`} />
                  <ErrorMsg name="motherEmail" />
                </div>
              </div>
            </div>

            {/* Guardian toggle */}
            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input type="checkbox" {...register('hasGuardian')} className="w-5 h-5 text-primary rounded focus:ring-primary" />
                <span className="font-semibold text-typography-dark">Add Guardian Details (Optional)</span>
              </label>

              {hasGuardian && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100 animate-fade-in-up">
                  <div>
                    <label className="block text-sm font-semibold text-typography-dark mb-1">Guardian Name</label>
                    <input type="text" {...register('guardianName')} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-typography-dark mb-1">Relation to Student</label>
                    <input type="text" placeholder="e.g. Uncle, Grandmother" {...register('guardianRelation')} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-typography-dark mb-1">Occupation</label>
                    <input type="text" {...register('guardianEmployment')} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-typography-dark mb-1">Phone Number</label>
                    <input type="text" {...register('guardianPhone')} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${errors.guardianPhone ? 'border-red-500' : 'border-gray-200'}`} />
                    <ErrorMsg name="guardianPhone" />
                  </div>
                </div>
              )}
            </div>

            {/* Source */}
            <div className="pt-4 border-t border-gray-100 max-w-sm">
              <label className="block text-sm font-semibold text-typography-dark mb-1">How did you hear about us? *</label>
              <select {...register('source')} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none ${errors.source ? 'border-red-500' : 'border-gray-200'}`}>
                <option value="">Select option...</option>
                <option value="Word of Mouth">Word of Mouth</option>
                <option value="School Website">School Website</option>
                <option value="Google Search">Google Search</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Others">Others</option>
              </select>
              <ErrorMsg name="source" />
            </div>

          </div>
        )}

        {/* ================= STEP 4: REVIEW & SUBMIT ================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Review & Submit</h2>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-6">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Student Name</p>
                  <p className="font-medium">{formValues.firstName} {formValues.lastName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Class</p>
                  <p className="font-medium">{formValues.classApplying}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">DOB</p>
                  <p className="font-medium">{formValues.dob}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Gender</p>
                  <p className="font-medium">{formValues.gender}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Permanent Address</p>
                  <p className="text-sm mt-1 leading-tight">{formValues.permanentAddress}</p>
                  <p className="text-sm mt-1">{formValues.city} - {formValues.pinCode}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Father's Contact</p>
                  <p className="text-sm mt-1">{formValues.fatherName}</p>
                  <p className="text-sm">{formValues.fatherPhone}</p>
                </div>
              </div>

            </div>

            <div className="pt-6">
              <label className="flex items-start gap-3 cursor-pointer bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <input 
                  type="checkbox" 
                  {...register('declaration')} 
                  className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary"
                />
                <div>
                  <span className="font-bold text-typography-dark block">Declaration *</span>
                  <span className="text-sm text-typography-body">I declare that all the information provided above is correct and true to the best of my knowledge. I agree to abide by the rules and regulations of the school.</span>
                </div>
              </label>
              <ErrorMsg name="declaration" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => setCurrentStep(1)}
                className="px-6 py-4 bg-gray-100 text-typography-dark rounded-xl font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto"
              >
                Edit Information
              </button>
              
              <button 
                type="submit" 
                disabled={isSubmitting || !watch('declaration')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-accent text-typography-dark rounded-xl font-bold hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full shadow-lg"
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={20} /> Submitting Application...</>
                ) : (
                  <>Submit Application <ArrowRight size={20}/></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons (Steps 1-3) */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            <button 
              type="button" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 text-typography-dark hover:bg-gray-200'}`}
            >
              <ArrowLeft size={18} /> Previous
            </button>
            <button 
              type="button" 
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover shadow-md transition-transform hover:-translate-y-0.5"
            >
              Next Step <ArrowRight size={18} />
            </button>
          </div>
        )}
      </form>

      {/* Success Modal */}
      {successData && (
        <SuccessModal 
          registrationId={successData.id} 
          email={successData.email} 
          onClose={() => setSuccessData(null)} 
        />
      )}
    </div>
  );
}
