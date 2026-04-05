import { useState, useEffect } from 'react';
import Toast from './components/Toast';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import EvaluationForm from './components/EvaluationForm';
import WardrobeFeed from './components/WardrobeFeed';
import Footer from './components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [formData, setFormData] = useState({ category: '', brand: '', condition: 'good', imageBase64: '' });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [isAiOnline, setIsAiOnline] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3500);
  };

  useEffect(() => {
    const checkStatus = () => {
      fetch(`${API_BASE_URL}/api/history?userId=health-check`)
        .then((res) => {
          if (res.ok) setIsAiOnline(true);
          else setIsAiOnline(false);
        })
        .catch(() => setIsAiOnline(false));
    };
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem('lookbook_user_email');
    if (storedEmail) {
      setUserEmail(storedEmail);
      setIsAuthenticated(true);
      fetchHistory(storedEmail);
    }
  }, []);

  const fetchHistory = (email) => {
    fetch(`${API_BASE_URL}/api/history?userId=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setHistory(Array.isArray(data) ? data : []); 
      })
      .catch(() => {
        setHistory([]);
        showToast("Error loading history.", "error");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = userEmail.trim().toLowerCase();
    if (!cleanEmail.includes('@')) return showToast("Invalid email.", "error");
    localStorage.setItem('lookbook_user_email', cleanEmail);
    setUserEmail(cleanEmail);
    setIsAuthenticated(true);
    fetchHistory(cleanEmail);
    showToast(`Welcome!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('lookbook_user_email');
    setIsAuthenticated(false);
    setUserEmail('');
    setHistory([]);
    showToast("Logged out.");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      showToast("File too large (Max 5MB).", "error");
    }
  };

  const handleEvaluate = async () => {
    if (!userEmail || !formData.imageBase64) {
      return showToast("User ID and Image are required.", "error");
    }

    setLoading(true);
    const payload = { ...formData, userId: userEmail };

    try {
      const response = await fetch(`${API_BASE_URL}/api/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Evaluation failed");
      }

      setHistory([data, ...history]);
      setFormData({ category: '', brand: '', condition: 'good', imageBase64: '' });
      showToast("Evaluated!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-4">
        <Toast toast={toast} />
        <LoginScreen userEmail={userEmail} setUserEmail={setUserEmail} handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-gray-900">
      <Toast toast={toast} />
      <Header handleLogout={handleLogout} isAiOnline={isAiOnline} />
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <EvaluationForm 
            formData={formData} setFormData={setFormData} 
            handleImageUpload={handleImageUpload} 
            clearImage={() => setFormData({...formData, imageBase64: ''})} 
            handleEvaluate={handleEvaluate} 
            loading={loading} isAiOnline={isAiOnline} 
          />
        </div>
        <div className="lg:col-span-8">
          <WardrobeFeed history={history} userEmail={userEmail} loading={loading} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
