import Login from './Login';
import History from './History';
import { useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [view, setView] = useState('dashboard');
  const [message, setMessage] = useState('');

  const markAttendance = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'https://smart-attendance-system-1-f8ec.onrender.com/api/attendance/mark',
        {},
        { headers: { Authorization: token } }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Already marked today');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setView('login');
  };

  if (view === 'login') return <Login />;
  if (view === 'history') return <History />;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Dashboard</h2>

        {message && <p style={styles.message}>{message}</p>}

        <button style={styles.primaryBtn} onClick={markAttendance}>
          Mark Attendance
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => setView('history')}
        >
          View Attendance History
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
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

  primaryBtn: {
    width: '100%',
    padding: '11px',
    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '14px',
    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
  },

  secondaryBtn: {
    width: '100%',
    padding: '10px',
    background: '#eef2ff',
    color: '#3730a3',
    border: '1px solid #c7d2fe',
    borderRadius: '10px',
    fontSize: '13px',
    cursor: 'pointer',
    marginBottom: '14px',
  },

  logoutBtn: {
    width: '100%',
    padding: '10px',
    background: '#475569',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    cursor: 'pointer',
  },

  message: {
    color: '#16a34a',
    fontSize: '13px',
    marginBottom: '12px',
  },
};
