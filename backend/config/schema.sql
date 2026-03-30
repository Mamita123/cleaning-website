-- ✅ Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100) NOT NULL,
  phone       VARCHAR(20)  DEFAULT '',
  address     TEXT         NOT NULL,
  service     VARCHAR(50)  NOT NULL,
  date        VARCHAR(100) NOT NULL,
  time        VARCHAR(20)  NOT NULL,
  notes       TEXT         DEFAULT '',
  status      VARCHAR(20)  DEFAULT 'pending',
  amount      VARCHAR(20)  DEFAULT '',
  created_at  TIMESTAMP    DEFAULT NOW(),
  updated_at  TIMESTAMP    DEFAULT NOW()
);

-- ✅ Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100) NOT NULL,
  phone       VARCHAR(20)  DEFAULT '',
  service     VARCHAR(50)  DEFAULT '',
  message     TEXT         NOT NULL,
  is_read     BOOLEAN      DEFAULT FALSE,
  created_at  TIMESTAMP    DEFAULT NOW()
);

-- ✅ Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100) NOT NULL,
  rating      INTEGER      NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service     VARCHAR(100) NOT NULL,
  review      TEXT         NOT NULL,
  is_approved BOOLEAN      DEFAULT FALSE,
  created_at  TIMESTAMP    DEFAULT NOW()
);

-- ✅ Services table
CREATE TABLE IF NOT EXISTS services (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(100) NOT NULL,
  description TEXT         NOT NULL,
  price       VARCHAR(20)  NOT NULL,
  duration    VARCHAR(30)  NOT NULL,
  emoji       VARCHAR(10)  DEFAULT '🧹',
  badge       VARCHAR(50)  DEFAULT '',
  category    VARCHAR(20)  DEFAULT 'home',
  includes    TEXT[]       DEFAULT '{}',
  is_active   BOOLEAN      DEFAULT TRUE,
  created_at  TIMESTAMP    DEFAULT NOW()
);