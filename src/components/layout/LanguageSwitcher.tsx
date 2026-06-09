'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as any;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative flex items-center text-white bg-white/10 rounded-md hover:bg-white/20 transition-colors px-2 py-1">
      <Globe className="h-4 w-4 mr-2" />
      <select
        value={locale}
        onChange={handleLanguageChange}
        disabled={isPending}
        className="appearance-none bg-transparent font-medium focus:outline-none cursor-pointer pr-4"
      >
        <option value="en" className="text-gray-900">EN - English</option>
        <option value="es" className="text-gray-900">ES - Español</option>
        <option value="fr" className="text-gray-900">FR - Français</option>
        <option value="pt" className="text-gray-900">PT - Português</option>
        <option value="ht" className="text-gray-900">HT - Kreyòl</option>
      </select>
    </div>
  );
}
