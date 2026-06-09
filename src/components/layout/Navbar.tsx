import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BookOpen, User, LogIn } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Index');

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6 text-secondary" />
              <span>Biblik Debat</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/groups" className="hover:text-secondary transition-colors font-medium">
              Communities
            </Link>
            <Link href="/ai" className="hover:text-secondary transition-colors font-medium">
              Biblik AI
            </Link>
            <Link href="/auth/login" className="hover:text-secondary transition-colors flex items-center gap-1">
              <LogIn className="h-5 w-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
