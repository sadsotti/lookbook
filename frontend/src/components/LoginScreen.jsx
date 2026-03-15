export default function LoginScreen({ userEmail, setUserEmail, handleLogin }) {
  return (
    <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center">
      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
        <img src="/logo.png" alt="LookBook Logo" className="w-full h-full object-contain" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">LookBook</h1>
      <p className="text-gray-500 mb-8 text-sm">Enter your email to access your digital wardrobe and AI pricing engine.</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          required
          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm font-medium text-center" 
          placeholder="name@example.com" 
          value={userEmail} 
          onChange={e => setUserEmail(e.target.value)} 
        />
        <button 
          type="submit"
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-gray-900/10"
        >
          Continue
        </button>
      </form>
      <p className="mt-6 text-xs text-gray-400">Your email acts as your unique synchronization key across devices.</p>
    </div>
  );
}