export default function Toast({ toast }) {
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
      <div className={`px-6 py-3 rounded-full shadow-lg font-medium text-sm flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-900 text-white shadow-gray-900/20'}`}>
        {toast.type === 'error' ? '⚠️' : '✅'} {toast.message}
      </div>
    </div>
  );
}