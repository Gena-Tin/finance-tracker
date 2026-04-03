-- Таблица категорий
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(10) -- Например, '🍕' или '🚗'
);

-- Таблица транзакций
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Начальные данные для категорий (опционально)
INSERT INTO categories (name, icon) VALUES 
('Food', '🍎'), 
('Transport', '🚌'), 
('Salary', '💰'), 
('Entertainment', '🎬');