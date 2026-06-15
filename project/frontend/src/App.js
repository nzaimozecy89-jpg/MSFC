import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import FixturesPage from './pages/FixturesPage';
import AdminDashboard from './pages/AdminDashboard';
import { auth } from './services/api';
import './styles/styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      await auth.verify();
      setIsAdmin(true);
      setCurrentPage('home');
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    auth.logout();
    setIsAdmin(false);
    setCurrentPage('home');
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div className="App">
      <Navigation isAdmin={isAdmin} onLogout={handleLogout} onLogin={handleLogin} />

      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'team' && <TeamPage />}
        {currentPage === 'fixtures' && <FixturesPage />}
        {currentPage === 'admin' && isAdmin && <AdminDashboard />}
      </main>

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <LoginPage onLoginSuccess={() => { setIsAdmin(true); setShowLogin(false); setCurrentPage('home'); }} />
          </div>
        </div>
      )}

      {/* Navigation handler */}
      <script>
        {`
          document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
              const hash = link.getAttribute('href');
              if (hash.startsWith('#')) {
                e.preventDefault();
                const page = hash.slice(1);
                document.dispatchEvent(new CustomEvent('pageChange', { detail: page }));
              }
            });
          });
        `}
      </script>
    </div>
  );
}

export default App;
