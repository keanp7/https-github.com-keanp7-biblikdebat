import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ht', 'en', 'fr', 'es'],
  defaultLocale: 'ht'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
