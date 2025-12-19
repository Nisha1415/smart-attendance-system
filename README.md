**Application Setup Steps**

**Prerequisites:**

Make sure the following are installed on your system:
Node.js (v16 or above)
npm
MongoDB (local) or MongoDB Atlas
Git

**Backend Setup**
1. Open terminal and navigate to backend folder:
   cd backend
2. Install required dependencies:
   npm install
3. Start the backend server:
   node server.js
4. Backend will run at:
   http://localhost:5000

**Frontend Setup**
1. Open a new terminal and navigate to frontend folder:
   cd frontend
2. Install frontend dependencies:
    npm install
3. Start the React application:
   npm start
4. Frontend will run at:
   http://localhost:3000


**Attendance Validation Logic**
The attendance validation is handled at the backend level to ensure data integrity.

Business Rule:
A user can mark attendance only once per day

**Validation Process:**
1. When a user clicks Mark Attendance, a request is sent to the backend.
2. The backend checks:
   User ID from JWT token
   Current date
3. The database is queried to check if an attendance record already exists for same user and same date
4. If a record exists, attendance is rejected and a meaningful error message is returned.
5. If no record exists, Attendance is saved successfully.
This logic ensures duplicate attendance entries are strictly prevented.


**Demo Login Credentials**

**Admin Login**
Use the following credentials to log in as Admin:
Email: admin@example.com
Password: admin123

**User Login**
Use the following credentials to log in as a User:
Email: user@example.com
Password: user123


**Project Folder Structure**

```text
smart-attendance-system/
│
├── backend/
│   ├── models/
│   │   ├── User.js            # User schema (admin/user)
│   │   └── Attendance.js      # Attendance schema
│   │
│   ├── routes/
│   │   ├── auth.js            # Login & user creation APIs
│   │   └── attendance.js     # Attendance APIs
│   │
│   ├── server.js             # Express server entry point
│   └── package.json          # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── Login.js           # User login page
│   │   ├── AdminLogin.js      # Admin login page
│   │   ├── Dashboard.js       # User dashboard (mark attendance)
│   │   ├── History.js         # Attendance history page
│   │   ├── AdminDashboard.js  # Admin dashboard
│   │   └── index.js           # React entry point
│   │
│   └── package.json           # Frontend dependencies
│
└── README.md                  # Project documentation

