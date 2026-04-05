export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500 font-medium">
          <p>© 2026 LookBook. All rights reserved.</p>
          <p className="mt-1">Project developed for the start2impact AI Agents for Development course.</p>
        </div>
        <div className="text-sm font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
          Made by Lorenzo Sottile with <span className="text-red-500">♥</span>
        </div>
      </div>
    </footer>
  );
}