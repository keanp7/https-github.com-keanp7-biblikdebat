'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Menu, X, BookOpen, ShieldAlert, LogIn, Bot } from 'lucide-react';

interface MobileMenuProps {
  labels: {
    communities: string;
    ai: string;
    admin: string;
    signin: string;
  };
}

export default function MobileMenu({ labels }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:bg-blue-800 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-primary border-t border-blue-800 shadow-xl z-50 flex flex-col py-2 px-4 space-y-2">
          <Link 
            href="/groups" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-white hover:bg-blue-800 p-3 rounded-lg transition-colors font-medium"
          >
            <BookOpen className="h-5 w-5 text-secondary" />
            {labels.communities}
          </Link>
          
          <Link 
            href="/ai" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-white hover:bg-blue-800 p-3 rounded-lg transition-colors font-medium"
          >
            <Bot className="h-5 w-5 text-secondary" />
            {labels.ai}
          </Link>

          <Link 
            href="/admin" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-white hover:bg-blue-800 p-3 rounded-lg transition-colors font-medium"
          >
            <ShieldAlert className="h-5 w-5 text-secondary" />
            {labels.admin}
          </Link>

          <div className="border-t border-blue-800 my-2 pt-2"></div>

          <Link 
            href="/auth/login" 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 bg-secondary text-white p-3 rounded-lg transition-colors font-bold hover:bg-yellow-600"
          >
            <LogIn className="h-5 w-5" />
            {labels.signin}
          </Link>
        </div>
      )}
    </div>
  );
}
