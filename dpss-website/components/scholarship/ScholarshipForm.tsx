"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, ArrowRight, ArrowLeft, CheckCircle, FileText, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  className: z.string().min(1, "Please select a class"),
  dob: z.string().min(1, "Date of Birth is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  isDpssStudent: z.boolean().default(false),
  
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().optional(),
  fatherPhone: z.string().length(10, "Mobile number must be exactly 10 digits"),
  motherPhone: z.string().optional().or(z.literal('')),
  
  previousSchool: z.string().optional(),
  address: z.string().min(10, "Full address is required"),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "Student Info" },
  { id: 2, title: "Parent Info" },
  { id: 3, title: "Address & School" }
];

export default function ScholarshipForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ hallTicketNo?: string } | null>(null);

  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isDpssStudent: false,
    }
  });

  const nextStep = async () => {
    const fields: any = {
      1: ['studentName', 'className', 'dob'],
      2: ['fatherName', 'fatherPhone'],
      3: ['address']
    };
    
    const isStepValid = await trigger(fields[currentStep]);
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Format YYYY-MM-DD from picker to DD-MM-YYYY for storage
      const formattedData = {
        ...data,
        dob: data.dob.split('-').reverse().join('-')
      };

      const response = await fetch('/api/scholarship/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Submission failed');

      setSubmittedData({ hallTicketNo: result.hallTicketNo });
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-2xl mx-auto border border-green-100"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-typography-dark mb-4">Registration Successful!</h2>
        <div className="space-y-4 mb-8">
            <p className="text-typography-body">
              Your application for the DPSS Scholarship Test has been successfully received and filed in our database. 
            </p>
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <p className="text-typography-dark font-medium text-sm">
                    You can now download your Official Hall Ticket using the <span className="text-primary font-bold">Download Hall Ticket</span> tool on the scholarship page.
                </p>
                <p className="text-xs text-typography-body mt-2">
                    Use your registered Date of Birth and Mobile Number to fetch your admit card.
                </p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={() => window.location.href = '/scholarship'}
                className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg flex items-center gap-2 justify-center"
            >
                Go to Download Section <Download size={18} />
            </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8 px-2">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center flex-1 relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10 transition-all duration-300 ${
              currentStep >= step.id ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-500'
            }`}>
              {step.id}
            </div>
            <span className={`text-[10px] uppercase font-bold mt-2 tracking-widest ${
              currentStep >= step.id ? 'text-primary' : 'text-gray-400'
            }`}>
              {step.title}
            </span>
            {step.id < 3 && (
              <div className={`hidden sm:block absolute top-5 left-1/2 w-full h-[2px] -z-0 ${
                currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-10">
          
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-5"
              >
                <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-typography-dark mb-1">Student Details</h3>
                    <p className="text-sm text-typography-body">Basic information of the candidate.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Full Student Name *</label>
                    <input 
                        {...register('studentName')}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.studentName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    />
                    {errors.studentName && <span className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.studentName.message}</span>}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Class Applying For *</label>
                    <select 
                        {...register('className')}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.className ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary/20 outline-none`}
                    >
                        <option value="">Select...</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`Class ${n}`}>Class {n}</option>)}
                    </select>
                    {errors.className && <span className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.className.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Date of Birth *</label>
                        <input 
                            {...register('dob')}
                            type="date"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.dob ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary/20 outline-none`}
                        />
                        {errors.dob && <span className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.dob.message}</span>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Email Address</label>
                        <input 
                            {...register('email')}
                            type="email"
                            placeholder="student@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" {...register('isDpssStudent')} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                        <span className="text-sm font-medium text-typography-dark group-hover:text-primary transition-colors">Are you currently a DPSS student?</span>
                    </label>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-5"
              >
                <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-typography-dark mb-1">Parent Details</h3>
                    <p className="text-sm text-typography-body">Contact information for communication.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Father's Name *</label>
                    <input 
                        {...register('fatherName')}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.fatherName ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary/20 outline-none`}
                    />
                    {errors.fatherName && <span className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.fatherName.message}</span>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Father's Contact Number *</label>
                    <input 
                        {...register('fatherPhone')}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.fatherPhone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary/20 outline-none`}
                    />
                    {errors.fatherPhone && <span className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.fatherPhone.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Mother's Name</label>
                    <input 
                        {...register('motherName')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Mother's Contact Number</label>
                    <input 
                        {...register('motherPhone')}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-5"
              >
                <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-typography-dark mb-1">Academic & Address</h3>
                    <p className="text-sm text-typography-body">Final details for the application.</p>
                </div>

                <div>
                    <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Previous School Name</label>
                    <input 
                        {...register('previousSchool')}
                        placeholder="Name of your current or last school"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-typography-dark uppercase mb-1.5 ml-1">Full Permanent Address *</label>
                    <textarea 
                        {...register('address')}
                        rows={4}
                        placeholder="House No, Street, Village/Town, District, Pin Code..."
                        className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-primary/20 outline-none resize-none`}
                    />
                    {errors.address && <span className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.address.message}</span>}
                </div>

                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                    <p className="text-xs text-typography-body leading-relaxed">
                        By submitting this form, I certify that the information provided is correct and I wish to appear for the DPSS Scholarship & Admission Test 2026.
                    </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-gray-50/80 px-8 py-6 flex justify-between items-center border-t border-gray-100">
           {currentStep > 1 ? (
             <button 
                type="button" 
                onClick={prevStep}
                className="flex items-center gap-2 text-typography-dark font-bold hover:text-primary transition-colors text-sm"
             >
                <ArrowLeft size={18} /> Previous
             </button>
           ) : <div />}

           {currentStep < 3 ? (
             <button 
                type="button" 
                onClick={nextStep}
                className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-800 transition-all shadow-md"
             >
                Continue <ArrowRight size={18} />
             </button>
           ) : (
             <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-accent text-typography-dark px-10 py-3.5 rounded-xl font-bold hover:bg-yellow-400 disabled:opacity-50 transition-all shadow-lg shadow-accent/10"
             >
                {isSubmitting ? (
                    <>Submitting... <Loader2 className="animate-spin" size={18} /></>
                ) : (
                    <>Complete Registration <CheckCircle size={18} /></>
                )}
             </button>
           )}
        </div>
      </form>
    </div>
  );
}
