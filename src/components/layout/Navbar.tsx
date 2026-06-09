import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BookOpen, User, LogIn, ShieldAlert } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <nav className="bg-primary text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6 text-secondary" />
              <span>Biblik Debat</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
            <LanguageSwitcher />
            
            <Link href="/groups" className="hover:text-secondary transition-colors font-medium hidden sm:block">
              {t('communities')}
            </Link>
            <Link href="/ai" className="hover:text-secondary transition-colors font-medium hidden sm:block">
              {t('ai')}
            </Link>
            <Link href="/admin" className="hover:text-secondary transition-colors font-medium flex items-center gap-1">
              <ShieldAlert className="h-4 w-4" />
              <span className="hidden sm:inline">{t('admin')}</span>
            </Link>
            <Link href="/auth/login" className="hover:text-secondary transition-colors flex items-center gap-1">
              <LogIn className="h-5 w-5" />
              <span className="hidden sm:inline">{t('signin')}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
