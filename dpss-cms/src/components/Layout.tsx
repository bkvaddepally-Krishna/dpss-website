import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard, MessageSquare, GraduationCap, FileText,
  LogOut, ChevronRight, Menu, X,
} from 'lucide-react';
import { useState } from 'react';

const NAV = [
  { to: '/dashboard',  label: 'Dashboard',          icon: LayoutDashboard },
  { to: '/enquiries',  label: 'Contact Enquiries',   icon: MessageSquare   },
  { to: '/admissions', label: 'Admissions',          icon: FileText        },
  { to: '/results',    label: 'Scholarship Results', icon: GraduationCap   },
];

export default function Layout({ session }: { session: Session }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const username = session.user.email?.split('@')[0] ?? 'admin';

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-primary/30">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-none">DPSS Admin</p>
            <p className="text-gray-500 text-xs mt-0.5">cms.dpsssiddipet.com</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={14} className="text-white/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-surface-border">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 mb-2">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm uppercase shrink-0">
            {username[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate capitalize">{username}</p>
            <p className="text-gray-500 text-xs">Administrator</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm font-medium"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-surface-card border-r border-surface-border flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-surface-card border-r border-surface-border flex flex-col animate-slide-in">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-surface-card border-b border-surface-border">
          <button onClick={() => setMobileOpen(true)} className="text-gray-400 hover:text-white transition-colors">
            <Menu size={22} />
          </button>
          <p className="font-bold text-white text-sm">DPSS Admin</p>
          <button onClick={logout} className="text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={18} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
