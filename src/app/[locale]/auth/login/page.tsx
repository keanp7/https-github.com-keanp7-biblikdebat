import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('Auth');

  async function handleLogin(formData: FormData) {
    'use server';
    const supabase = await createClient();
    
    // Auth inputs
    const identifier = formData.get('identifier') as string;
    const password = formData.get('password') as string;

    const isEmail = identifier.includes('@');
    
    const { error } = await supabase.auth.signInWithPassword(
      isEmail 
        ? { email: identifier, password } 
        : { phone: identifier, password }
    );

    if (error) {
      redirect('/auth/login?error=Could not authenticate user');
    }

    redirect('/groups');
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-primary">
            {t('login_title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('no_account').replace('Or ', '')} {' '}
            <Link href="/auth/signup" className="font-bold text-secondary hover:text-yellow-600 transition">
              {t('signup_button')}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action={handleLogin}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="identifier" className="sr-only">
                {t('identifier_placeholder')}
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full rounded-t-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder={t('identifier_placeholder')}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('password_placeholder')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder={t('password_placeholder')}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors"
            >
              {t('login_button')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
