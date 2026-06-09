'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe, ChevronDown } from 'lucide-react';
import { useTransition, useEffect } from 'react';
import { updateUserLanguage } from '@/app/actions/user';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    localStorage.setItem('preferred_language', locale);
  }, [locale]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as any;
    
    // Save to local storage
    localStorage.setItem('preferred_language', nextLocale);
    
    // Save to Supabase (fire and forget)
    updateUserLanguage(nextLocale).catch(console.error);

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative flex items-center text-white bg-white/10 rounded-md hover:bg-white/20 transition-colors px-2 py-1.5 border border-white/20">
      <Globe className="h-4 w-4 mr-1 sm:mr-2" />
      <select
        value={locale}
        onChange={handleLanguageChange}
        disabled={isPending}
        className="appearance-none bg-transparent font-medium focus:outline-none cursor-pointer pr-5 pl-1 text-sm sm:text-base"
      >
        <option value="ht" className="text-gray-900">HT - Kreyòl</option>
        <option value="en" className="text-gray-900">EN - English</option>
        <option value="es" className="text-gray-900">ES - Español</option>
        <option value="fr" className="text-gray-900">FR - Français</option>
      </select>
      <ChevronDown className="h-3 w-3 absolute right-1.5 pointer-events-none opacity-70" />
    </div>
  );
}
