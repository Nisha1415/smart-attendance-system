const express = require('express');
const jwt = require('jsonwebtoken');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

const router = express.Router();

// ================= USER MARK ATTENDANCE =================
router.post('/mark', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'Only users can mark attendance' });
    }

    const today = new Date().toISOString().split('T')[0];

    const existing = await Attendance.findOne({
      userId: decoded.userId,
      date: today
    });

    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    const attendance = new Attendance({
      userId: decoded.userId,
      date: today,
      time: new Date().toLocaleTimeString()
    });

    await attendance.save();
    res.json({ message: 'Attendance marked successfully' });

  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// ================= USER VIEW OWN HISTORY =================
router.get('/history', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const records = await Attendance.find({
      userId: decoded.userId
    });

    res.json(records);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// ================= ADMIN VIEW ALL ATTENDANCE =================
router.get('/all', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // admin-only access
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const records = await Attendance.find()
      .populate('userId', 'name email');


    res.json(records);

  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
