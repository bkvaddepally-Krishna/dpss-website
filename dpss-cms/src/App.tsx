import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Admissions from './pages/Admissions';
import Results from './pages/Results';
import EnterResult from './pages/EnterResult';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading DPSS CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!session ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route element={session ? <Layout session={session} /> : <Navigate to="/" replace />}>
          <Route path="/dashboard"   element={<Dashboard />} />
          <Route path="/enquiries"   element={<Enquiries />} />
          <Route path="/admissions"  element={<Admissions />} />
          <Route path="/results"     element={<Results />} />
          <Route path="/results/enter" element={<EnterResult />} />
        </Route>
        <Route path="*" element={<Navigate to={session ? '/dashboard' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
