-- this file should contain migration up queries
CREATE TABLE IF NOT EXISTS todo (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status BOOLEAN DEFAULT false,
    updated_at TIMESTAMP DEFAULT NOW()
);