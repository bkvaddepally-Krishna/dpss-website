"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { CheckCircle2, Download, Share2, Printer, X, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface SuccessModalProps {
  registrationId: string;
  email: string | null;
  onClose: () => void;
}

export default function SuccessModal({ registrationId, email, onClose }: SuccessModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const handleShareWhatsApp = () => {
    const text = `*Registration Successful!* \n\nI have successfully registered for admission at *Delhi Public Secondary School - Siddipet*. \n\n*Registration ID:* ${registrationId} \n*Website:* https://dpsssiddipet.com \n\n_Quality Education for a Brighter Future._`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    setIsGenerating(true);
    try {
      const element = receiptRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`DPSS_Admission_${registrationId}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden fade-in-up printable-receipt" ref={receiptRef}>
        
        {/* Header styling */}
        <div className="bg-green-50 p-8 text-center relative border-b border-green-100">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-green-700 hover:text-green-900 bg-green-100/50 p-2 rounded-full transition-colors no-print"
          >
            <X size={20} />
          </button>
          
          <div className="mx-auto w-20 h-20 bg-green-100 text-primary flex items-center justify-center rounded-full mb-4">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-bold text-typography-dark mb-2">Registration Successful!</h2>
          <p className="text-typography-body">Your application has been received</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 text-center">
          <div>
            <p className="text-sm text-typography-body uppercase tracking-wider mb-1">Registration ID</p>
            <div className="text-3xl font-bold text-primary bg-primary/5 py-4 rounded-xl border border-primary/20">
              {registrationId}
            </div>
          </div>
          
          {email && (
            <p className="text-sm text-typography-body">
              A confirmation email has been sent to <span className="font-semibold">{email}</span>
            </p>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-light no-print">
             <button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-typography-dark font-medium transition-colors border border-border-light disabled:opacity-50"
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} className="text-primary"/>}
              Download PDF
            </button>
            <button 
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-typography-dark font-medium transition-colors border border-border-light"
            >
              <Share2 size={18} className="text-green-600"/> Share
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-typography-dark font-medium transition-colors border border-border-light col-span-2"
            >
              <Printer size={18} className="text-blue-600"/> Print Application
            </button>
          </div>
          
          <div className="pt-2 no-print">
            <Link 
              href="/"
              className="block w-full text-center py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
