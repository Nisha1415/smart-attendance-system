import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';

function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [logout, setLogout] = useState(false);

  // Create user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, []);

  const fetchAttendance = async () => {
    const res = await axios.get(
      'https://smart-attendance-system-1-f8ec.onrender.com/api/attendance/all',
      { headers: { Authorization: token } }
    );
    setRecords(res.data);
  };

  const createUser = async () => {
    try {
      const res = await axios.post(
        'https://smart-attendance-system-1-f8ec.onrender.com/api/auth/create-user',
        { name, email, password },
        { headers: { Authorization: token } }
      );

      setMessage(res.data.message);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogout(true);
  };

  if (logout) return <AdminLogin />;

  const filtered = records
    .filter(r =>
      (r?.userId?.name || '')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        {/* CREATE USER */}
        <h3 style={styles.sectionTitle}>Create User</h3>

        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

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

        <button style={styles.primaryBtn} onClick={createUser}>
          Add User
        </button>

        {message && <p style={styles.message}>{message}</p>}

        {/* CONTROLS */}
        <div style={styles.controls}>
          <input
            style={styles.search}
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            style={styles.select}
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="desc">Latest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r._id}>
                <td>{r.userId?.name || 'N/A'}</td>
                <td>{r.userId?.email}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e9efff, #f6f8ff)',
    display: 'flex',
    justifyContent: 'center',
    padding: '30px',
  },

  card: {
    width: '900px',
    background: '#fff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 25px 45px rgba(100,116,139,0.25)',
  },

  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#1e293b',
  },

  sectionTitle: {
    marginBottom: '10px',
    color: '#334155',
  },

  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '10px',
    border: '1px solid #cbd5f5',
    background: '#eef2ff',
  },

  primaryBtn: {
    width: '100%',
    padding: '10px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '10px',
  },

  message: {
    color: '#059669',
    marginBottom: '15px',
  },

  controls: {
    display: 'flex',
    gap: '10px',
    margin: '15px 0',
  },

  search: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #cbd5f5',
  },

  select: {
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #cbd5f5',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },

  logoutBtn: {
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    background: '#475569',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};
