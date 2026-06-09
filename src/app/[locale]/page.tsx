import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BookOpen, Mic, Bot, WifiOff, Users, Heart } from 'lucide-react';

export default async function Home() {
  const tIndex = await getTranslations('Index');
  const tLanding = await getTranslations('Landing');

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <BookOpen className="h-20 w-20 text-primary mx-auto mb-6 drop-shadow-md" />
          <h1 className="text-5xl font-extrabold text-primary tracking-tight sm:text-7xl">
            {tIndex('title')}
          </h1>
          <p className="text-3xl font-bold text-gray-900 mt-4">
            {tIndex('hero_title')}
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed">
            {tIndex('hero_subtitle')}
          </p>
          
          <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/signup" className="px-8 py-4 bg-accent text-white rounded-full font-bold text-lg hover:bg-green-700 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-200">
              {tLanding('join_community')}
            </Link>
            <Link href="/auth/login" className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-md">
              {tLanding('sign_in')}
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary">{tLanding('how_it_works')}</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">1</div>
              <h3 className="text-2xl font-bold text-gray-900">{tLanding('step1_title')}</h3>
              <p className="text-gray-600">{tLanding('step1_desc')}</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">2</div>
              <h3 className="text-2xl font-bold text-gray-900">{tLanding('step2_title')}</h3>
              <p className="text-gray-600">{tLanding('step2_desc')}</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">3</div>
              <h3 className="text-2xl font-bold text-gray-900">{tLanding('step3_title')}</h3>
              <p className="text-gray-600">{tLanding('step3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary">{tLanding('features_title')}</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <Mic className="h-12 w-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tLanding('feature1_title')}</h3>
              <p className="text-gray-600">{tLanding('feature1_desc')}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <Bot className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tLanding('feature2_title')}</h3>
              <p className="text-gray-600">{tLanding('feature2_desc')}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <WifiOff className="h-12 w-12 text-gray-400 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tLanding('feature3_title')}</h3>
              <p className="text-gray-600">{tLanding('feature3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {tLanding('cta_title')}
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            {tLanding('cta_desc')}
          </p>
          <div className="mt-10">
            <Link href="/auth/signup" className="px-10 py-4 bg-secondary text-white rounded-full font-bold text-lg hover:bg-yellow-600 transition-colors shadow-lg">
              {tLanding('cta_button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
