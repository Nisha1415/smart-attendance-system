import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [message, setMessage] = useState('');
  const [goAdmin, setGoAdmin] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://smart-attendance-system-1-f8ec.onrender.com/api/auth/login',
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
      setRole(res.data.role);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  if (goAdmin) return <AdminLogin />;
  if (role === 'user') return <Dashboard />;

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.card,
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <h2 style={styles.title}>User Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button style={styles.primaryBtn} onClick={handleLogin}>
          Login
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <button style={styles.secondaryBtn} onClick={() => setGoAdmin(true)}>
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default Login;
const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e9efff, #f6f8ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: '360px',
    background: '#ffffff',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 25px 45px rgba(100, 116, 139, 0.25)',
    textAlign: 'center',
    transition: 'all 0.6s ease',
  },

  title: {
    marginBottom: '24px',
    color: '#1e293b',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },

  input: {
    width: '100%',
    padding: '11px',
    marginBottom: '16px',
    borderRadius: '10px',
    border: '1px solid #d0d7e2',
    fontSize: '14px',
    backgroundColor: '#f9fbff',
  },

  primaryBtn: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '12px',
    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
  },

  secondaryBtn: {
    width: '100%',
    padding: '9px',
    background: '#eef2ff',
    color: '#3730a3',
    border: '1px solid #c7d2fe',
    borderRadius: '10px',
    fontSize: '13px',
    cursor: 'pointer',
  },

  message: {
    color: '#dc2626',
    fontSize: '13px',
    marginBottom: '10px',
  },
};
