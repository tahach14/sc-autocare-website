import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

const app = express();
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 50 }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'SC Autocare API' }));

app.post('/api/bookings', async (req, res) => {
  const { name, phone, email, vehicle, service, date, message } = req.body || {};
  if (!name?.trim() || !phone?.trim() || !service?.trim()) {
    return res.status(400).json({ message: 'Name, phone number and service are required.' });
  }
  if (String(name).length > 120 || String(phone).length > 40 || String(message || '').length > 3000) {
    return res.status(400).json({ message: 'One or more fields are too long.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO bookings (name, phone, email, vehicle, service, preferred_date, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, created_at`,
      [name.trim(), phone.trim(), email || null, vehicle || null, service.trim(), date || null, message || null]
    );
    res.status(201).json({ message: 'Booking enquiry received.', booking: result.rows[0] });
  } catch (error) {
    console.error('Booking save failed:', error.message);
    res.status(500).json({ message: 'Could not save your enquiry right now.' });
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected server error.' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`SC Autocare API listening on ${port}`));
