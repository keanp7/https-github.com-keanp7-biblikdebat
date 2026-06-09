import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BookOpen, LogIn, ShieldAlert, Bot } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default async function Navbar() {
  const t = await getTranslations('Navbar');

  return (
    <nav className="bg-primary text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6 text-secondary" />
              <span>Biblik Debat</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6 text-sm sm:text-base">
            <LanguageSwitcher />
            
            <Link href="/groups" className="hover:text-secondary transition-colors font-medium flex items-center gap-1">
              {t('communities')}
            </Link>
            <Link href="/ai" className="hover:text-secondary transition-colors font-medium flex items-center gap-1">
              <Bot className="h-4 w-4" />
              {t('ai')}
            </Link>
            <Link href="/admin" className="hover:text-secondary transition-colors font-medium flex items-center gap-1">
              <ShieldAlert className="h-4 w-4" />
              {t('admin')}
            </Link>
            <Link href="/auth/login" className="hover:text-secondary transition-colors flex items-center gap-1 ml-2 border border-blue-400 px-4 py-2 rounded-full hover:bg-blue-800">
              <LogIn className="h-4 w-4" />
              {t('signin')}
            </Link>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center gap-3 sm:hidden">
            <LanguageSwitcher />
            <MobileMenu labels={{
              communities: t('communities'),
              ai: t('ai'),
              admin: t('admin'),
              signin: t('signin')
            }} />
          </div>
        </div>
      </div>
    </nav>
  );
}
