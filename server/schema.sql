CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(180),
  vehicle VARCHAR(160),
  service VARCHAR(80) NOT NULL,
  preferred_date DATE,
  message TEXT,
  status VARCHAR(24) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at DESC);
