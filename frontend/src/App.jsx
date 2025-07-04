import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import api from './services/api';
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const forceUpdate = () => navigate(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    forceUpdate();
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <nav className={styles.navbar}>
        <div className={styles.navLinks}>
          {localStorage.getItem('token') ? (
            <Link to="/">Dashboard</Link>
          ) : (
            <>
              {location.pathname === '/login' && <span className={styles.navTitle}>Login</span>}
              {location.pathname === '/register' && <span className={styles.navTitle}>Registro</span>}
            </>
          )}
        </div>
        {localStorage.getItem('token') && (
          <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
        )}
      </nav>
      
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={forceUpdate} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;