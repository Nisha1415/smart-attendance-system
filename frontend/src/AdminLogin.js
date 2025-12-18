import { useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import Login from './Login';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [back, setBack] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://smart-attendance-system-1-f8ec.onrender.com/api/auth/admin-login',
        { email, password }
      );

      localStorage.setItem('token', res.data.token);
      setLoggedIn(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  if (loggedIn) return <AdminDashboard />;
  if (back) return <Login />;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>

        <input
          style={styles.input}
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.primaryBtn} onClick={handleLogin}>
          Login
        </button>

        <hr style={styles.divider} />

        <button style={styles.secondaryBtn} onClick={() => setBack(true)}>
          Back to User Login
        </button>

        {message && <p style={styles.error}>{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
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
  },

  title: {
    marginBottom: '22px',
    color: '#1e293b',
    fontWeight: '600',
  },

  input: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '14px',
    borderRadius: '10px',
    border: '1px solid #cbd5f5',
    outline: 'none',
    fontSize: '14px',
    background: '#eef2ff',
  },

  primaryBtn: {
    width: '100%',
    padding: '10px',
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    cursor: 'pointer',
  },

  secondaryBtn: {
    width: '100%',
    padding: '10px',
    background: '#475569',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    cursor: 'pointer',
  },

  divider: {
    margin: '18px 0',
    border: 'none',
    borderTop: '1px solid #e5e7eb',
  },

  error: {
    color: '#dc2626',
    fontSize: '13px',
    marginTop: '14px',
  },
};
