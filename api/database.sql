-- Таблица категорий
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(10), -- Например, '🍕' или '🚗'
    is_system BOOLEAN DEFAULT false
);

-- Таблица проекты
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(10), -- Например, '💎'
    is_system BOOLEAN DEFAULT false
);

-- Таблица транзакций
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) NOT NULL,
    project_id INTEGER REFERENCES projects(id) DEFAULT 1,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Начальные данные для поекты
INSERT INTO projects (name, icon, is_system) VALUES 
('All', '💎', true);

-- Начальные данные для категорий (опционально)
INSERT INTO categories (name, icon, is_system) VALUES 
('Other', '🎁', true), 
('Food', '🍎', false), 
('Transport', '🚌', false), 
('Salary', '💰', false), 
('Entertainment', '🎬', false);



