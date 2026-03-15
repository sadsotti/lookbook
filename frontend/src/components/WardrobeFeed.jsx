export default function WardrobeFeed({ history, userEmail, loading }) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between mb-4 px-2">
        <div>
          <h2 className="text-2xl font-bold">Your Wardrobe</h2>
          <span className="text-sm font-medium text-gray-500">Logged in as {userEmail}</span>
        </div>
        <span className="text-sm font-medium text-gray-500">{history.length} items evaluated</span>
      </div>

      {history.length === 0 && !loading && (
        <div className="bg-white border border-gray-200 border-dashed rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👕</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No items evaluated yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">Upload your first photo to discover how much your clothes are worth with our AI.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {history.map((item) => (
          <div key={item._id} className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300">
            
            {item.imagePreview && (
              <div className="w-full md:w-48 h-48 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <img src={item.imagePreview} alt={item.category} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-4 mb-1">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1 block">{item.brand}</span>
                    <h3 className="text-xl font-extrabold text-gray-900 capitalize leading-tight">{item.category}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">Suggested Price</span>
                    <span className="text-3xl font-black tracking-tight text-gray-900">€{item.evaluation.suggested_price}</span>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 mt-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  <span className="text-xs font-medium text-gray-600 capitalize">Condition: {item.condition}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs font-medium text-gray-600">Range: €{item.evaluation.range.min} - €{item.evaluation.range.max}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  <strong className="text-gray-900 font-semibold block mb-1">Why this price?</strong>
                  {item.evaluation.motivation}
                </p>
              </div>

              <div className="bg-[#f8f9fa] rounded-xl p-4 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>💡</span> Selling Tips
                </h4>
                <ul className="space-y-1.5">
                  {item.evaluation.selling_tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}