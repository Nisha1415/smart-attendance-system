import axios from 'axios';
import { useEffect, useState } from 'react';
import Login from './Login';

function History() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          'https://smart-attendance-system-1-f8ec.onrender.com/api/attendance/history',
          { headers: { Authorization: token } }
        );

        setRecords(res.data);
      } catch {
        setError('Unable to fetch attendance history');
      }
    };

    fetchHistory();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogout(true);
  };

  if (logout) return <Login />;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Attendance History</h2>

        {records.length === 0 && !error && (
          <p style={styles.message}>No attendance records found</p>
        )}

        {records.map((r) => (
          <div key={r._id} style={styles.row}>
            <span>📅 {r.date}</span>
            <span>⏰ {r.time}</span>
          </div>
        ))}

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default History;
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

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#f8fafc',
    padding: '10px 14px',
    borderRadius: '10px',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#334155',
  },

  message: {
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '14px',
  },

  error: {
    color: '#dc2626',
    fontSize: '13px',
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
    marginTop: '18px',
  },
};
