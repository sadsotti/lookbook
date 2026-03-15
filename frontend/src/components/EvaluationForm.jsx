export default function EvaluationForm({ 
  formData, 
  setFormData, 
  handleImageUpload, 
  clearImage, 
  handleEvaluate, 
  loading, 
  isAiOnline 
}) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-28">
      <h2 className="text-xl font-bold mb-1">Evaluate an Item</h2>
      <p className="text-sm text-gray-500 mb-6">Enter details and let AI do the pricing.</p>
      
      <div className="space-y-5">
        <div>
          {!formData.imageBase64 ? (
            <label className="flex flex-col items-center justify-center w-full h-40 bg-gray-50 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <p className="text-sm font-medium text-gray-600">Upload a photo</p>
                <p className="text-xs text-gray-400 mt-1">JPEG, PNG (Max 5MB)</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          ) : (
            <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-200 group">
              <img src={formData.imageBase64} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={clearImage} 
                  className="px-4 py-2 bg-white/95 backdrop-blur-sm md:bg-white text-sm font-bold rounded-full shadow-lg md:shadow-none hover:bg-red-50 hover:text-red-600 transition"
                >
                  Change Photo
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <input 
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm placeholder:text-gray-400 font-medium" 
            placeholder="Category (e.g., Leather Jacket)" 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})} 
          />
          
          <input 
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm placeholder:text-gray-400 font-medium" 
            placeholder="Brand (e.g., Zara)" 
            value={formData.brand} 
            onChange={e => setFormData({...formData, brand: e.target.value})} 
          />
          
          <select 
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm font-medium appearance-none cursor-pointer" 
            value={formData.condition} 
            onChange={e => setFormData({...formData, condition: e.target.value})}
          >
            <option value="new">New with tags</option>
            <option value="good">Good condition</option>
            <option value="used">Used / Signs of wear</option>
          </select>
        </div>

        <button 
          onClick={handleEvaluate} 
          disabled={!formData.imageBase64 || !formData.category || !formData.brand || loading || !isAiOnline} 
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed mt-4 shadow-lg shadow-gray-900/10"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : isAiOnline ? 'Get AI Evaluation' : 'Service Offline'}
        </button>
      </div>
    </div>
  );
}