import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BookOpen, Mic, Bot, WifiOff, Users, Heart } from 'lucide-react';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <BookOpen className="h-20 w-20 text-primary mx-auto mb-6 drop-shadow-md" />
          <h1 className="text-5xl font-extrabold text-primary tracking-tight sm:text-7xl">
            Biblik Debat
          </h1>
          <p className="text-3xl font-bold text-gray-900 mt-4">
            Every discussion starts from Scripture.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed">
            A global Christian platform for structured Biblical discussions, real-time voice debates, AI-powered learning, and offline community support.
          </p>
          
          <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/signup" className="px-8 py-4 bg-accent text-white rounded-full font-bold text-lg hover:bg-green-700 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-200">
              Join the Community
            </Link>
            <Link href="/auth/login" className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-md">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary">How It Works</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">1</div>
              <h3 className="text-2xl font-bold text-gray-900">Join a Group</h3>
              <p className="text-gray-600">Find a community, church, or study group to connect with believers worldwide.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">2</div>
              <h3 className="text-2xl font-bold text-gray-900">Quote Scripture</h3>
              <p className="text-gray-600">Every debate must be rooted in the Bible. Select a verse and start the discussion.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">3</div>
              <h3 className="text-2xl font-bold text-gray-900">Debate & Learn</h3>
              <p className="text-gray-600">Use text, voice messages, or our AI assistant to dive deep into theological truths.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-primary">Powerful Features</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <Mic className="h-12 w-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Voice Chat</h3>
              <p className="text-gray-600">WhatsApp-style real-time voice messaging. Hold to record and instantly broadcast your thoughts to the group.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <Bot className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Biblik AI Assistant</h3>
              <p className="text-gray-600">Ask deep theological questions and get instant, scripture-backed answers from our advanced AI learning tool.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <WifiOff className="h-12 w-12 text-gray-400 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Offline-First UX</h3>
              <p className="text-gray-600">No internet? No problem. Read debates and queue messages offline. We automatically sync when you reconnect.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Structured Debates</h3>
              <p className="text-gray-600">Threaded, recursive commenting ensures conversations stay organized, civil, and focused on the Word.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <Heart className="h-12 w-12 text-red-500 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600">Groups can launch built-in donation drives to support members in need or fund church projects.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to grow in faith together?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Create an account today and join thousands of believers discussing Scripture.
          </p>
          <div className="mt-10">
            <Link href="/auth/signup" className="px-10 py-4 bg-secondary text-white rounded-full font-bold text-lg hover:bg-yellow-600 transition-colors shadow-lg">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
