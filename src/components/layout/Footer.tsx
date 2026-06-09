export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="font-bold text-white text-lg">Biblik Debat</span>
          <p className="text-sm mt-1">Organized Biblical Discussions By Verse.</p>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Biblik Debat. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
