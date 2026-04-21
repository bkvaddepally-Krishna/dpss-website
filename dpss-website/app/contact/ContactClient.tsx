"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, User, Tag, Send, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { schoolInfo } from '@/lib/constants';

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the school timings?",
      answer: "The standard school timings are from 8:45 AM to 3:45 PM from Monday to Saturday. Extracurricular activities usually take place after 3:45 PM."
    },
    {
      question: "Is transport facility available?",
      answer: "Yes, we provide extensive transport facilities covering a 30km radius around Siddipet with fully equipped buses featuring live GPS tracking for parents."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSent(false);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
         throw new Error(data.error || 'Failed to send message.');
      }

      setIsSent(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
      
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col pt-32 pb-24 min-h-screen bg-[#fafafa] relative overflow-hidden">
      
      {/* Background ambient light effects from the screenshot */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ y: 0, opacity: 1 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl font-bold text-typography-dark mb-4 uppercase tracking-wide">
            Contact Us
          </h1>
          <p className="text-typography-body font-medium">
            Reach out to Delhi Public Secondary School today.
          </p>
        </motion.div>

        {/* Main Contact Card */}
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-gray-100 mb-20 relative">
          
          {/* Left Panel: Info */}
          <div className="bg-primary text-white p-10 lg:p-14 lg:w-[40%] flex flex-col justify-center relative overflow-hidden shrink-0">
             {/* Abstract circle decor */}
             <div className="absolute -top-16 -right-16 w-64 h-64 bg-green-500/20 rounded-full blur-2xl" />
             <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-green-900/30 rounded-full" />
             
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-2">Contact Info</h3>
               <p className="text-white/80 text-sm mb-12 font-medium">
                 Direct communication for admissions and inquiries.
               </p>

               <div className="space-y-8">
                 {/* Visit Us */}
                 <div className="flex items-start gap-5">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                     <MapPin size={22} className="text-white" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                     <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                       {schoolInfo.address}
                     </p>
                   </div>
                 </div>

                 {/* Call Us */}
                 <div className="flex items-start gap-5">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                     <Phone size={22} className="text-white" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">Call Us</h4>
                     <p className="text-white/80 text-sm font-medium">
                       {schoolInfo.phone} <br /> 7660999931
                     </p>
                   </div>
                 </div>

                 {/* Email Us */}
                 <div className="flex items-start gap-5">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                     <Mail size={22} className="text-white" />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">Email Us</h4>
                     <a href={`mailto:${schoolInfo.email}`} className="text-white/80 text-sm font-medium hover:underline transition-all">
                       {schoolInfo.email}
                     </a>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* Right Panel: Form */}
          <div className="p-10 lg:p-14 lg:w-[60%] flex flex-col justify-center bg-white relative">
            {errorMsg && (
              <div className="absolute top-8 right-8 left-8 bg-red-50 text-red-700 py-3 px-4 rounded-xl flex items-center gap-3 border border-red-200 z-20 shadow-sm">
                <CheckCircle size={20} className="rotate-45" />
                <p className="text-sm font-bold">{errorMsg}</p>
              </div>
            )}

            {isSent && (
              <div className="absolute top-8 right-8 left-8 bg-green-50 text-green-700 py-3 px-4 rounded-xl flex items-center gap-3 border border-green-100 z-20 shadow-sm">
                <CheckCircle size={20} />
                <p className="text-sm font-bold">Your message has been successfully sent! We will contact you shortly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Name */}
                 <div>
                   <label className="block text-xs font-bold text-typography-body mb-2 uppercase tracking-wide">Your Name</label>
                   <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <User size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" name="name" required
                        value={formData.name} onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-typography-dark text-sm transition-all bg-gray-50/50"
                      />
                   </div>
                 </div>

                 {/* Phone */}
                 <div>
                   <label className="block text-xs font-bold text-typography-body mb-2 uppercase tracking-wide">Phone Number</label>
                   <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <Phone size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="tel" name="phone" required
                        value={formData.phone} onChange={handleInputChange}
                        placeholder="10 Digit Mobile No."
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-typography-dark text-sm transition-all bg-gray-50/50"
                      />
                   </div>
                 </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-typography-body mb-2 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                   </div>
                   <input 
                     type="email" name="email" required
                     value={formData.email} onChange={handleInputChange}
                     placeholder="example@email.com"
                     className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-typography-dark text-sm transition-all bg-gray-50/50"
                   />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-typography-body mb-2 uppercase tracking-wide">Subject</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Tag size={18} className="text-gray-400" />
                   </div>
                   <input 
                     type="text" name="subject" required
                     value={formData.subject} onChange={handleInputChange}
                     placeholder="Admission / Inquiry"
                     className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-typography-dark text-sm transition-all bg-gray-50/50"
                   />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-typography-body mb-2 uppercase tracking-wide">Message</label>
                <textarea 
                  name="message" required rows={4}
                  value={formData.message} onChange={handleInputChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-typography-dark text-sm transition-all bg-gray-50/50 resize-y"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-800 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 group"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
           <h3 className="font-serif text-2xl font-bold text-typography-dark mb-8">Frequently Asked Questions</h3>
           
           <div className="space-y-4 text-left">
             {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border text-left border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-typography-dark font-medium hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                     <span>{faq.question}</span>
                     <span className="text-gray-400 bg-gray-100 p-1.5 rounded-full">
                       {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                     </span>
                  </button>
                  <AnimatePresence>
                     {openFaq === idx && (
                       <motion.div
                         initial={{ height: 0, opacity: 1 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3, ease: 'easeInOut' }}
                       >
                         <div className="p-5 pt-0 text-sm text-typography-body leading-relaxed border-t border-gray-50 mt-2">
                           {faq.answer}
                         </div>
                       </motion.div>
                     )}
                  </AnimatePresence>
                </div>
             ))}
           </div>
        </div>

        {/* Google Maps iFrame */}
        <div className="w-full h-[400px] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1872.2281898739192!2d78.8505!3d18.0933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA1JzM1LjkiTiA3OMKwNTEnMDEuOCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
           />
        </div>

      </div>
    </div>
  );
}
