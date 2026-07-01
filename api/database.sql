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

--=========== Опционально: ===========--
-- Начальные данные для поекты (опционально)
INSERT INTO projects (name, icon, is_system) VALUES 
( 'Car', '🚗', false),
( 'Work', '🛠️', false),
( 'Home', '🏠', false),
( 'Vacation', '🏖️', false),
('Gifts', '🎁', false);

-- Начальные данные для категорий (опционально)
INSERT INTO categories (name, icon, is_system) VALUES 
('Other', '🎁', true), 
('Food', '🍎', false), 
('Transport', '🚌', false), 
('Salary', '💰', false), 
('Entertainment', '🎬', false);


-- Начальные данные Транзакции (опционально)
INSERT INTO transactions (category_id, project_id, amount, description, type, created_at) VALUES
-- ================= АПРЕЛЬ 2026 =================
(4, 3, 10000.00, 'Salary', 'income', '2026-04-01 10:00:00'),    -- Salary, Work
(2, 4, 2500.00, 'food', 'expense', '2026-04-03 12:30:00'),      -- food, Home
(2, 3, 6000.00, 'food', 'expense', '2026-04-03 14:15:00'),      -- food, Work
(3, 3, 1000.00, 'fuel', 'expense', '2026-04-04 18:00:00'),      -- fuel, Work
(2, 3, 5200.00, 'food', 'expense', '2026-04-10 11:10:00'),      -- food, Work
(3, 4, 550.00, 'I drive', 'income', '2026-04-10 15:40:00'),     -- I drive, Home
(2, 4, 3200.00, 'food', 'expense', '2026-04-10 19:25:00'),      -- food, Home
(4, 3, 15000.00, 'Salary', 'income', '2026-04-16 09:30:00'),    -- Salary, Work
(2, 4, 4500.00, 'food', 'expense', '2026-04-17 13:05:00'),      -- food, Home
(3, 4, 300.00, 'i drive', 'income', '2026-04-17 16:50:00'),     -- i drive, Home
(3, 3, 1900.00, 'fuel', 'expense', '2026-04-18 08:45:00'),      -- fuel, Work
(2, 3, 1200.00, 'food', 'expense', '2026-04-19 12:20:00'),      -- food, Work
(2, 4, 2500.00, 'food', 'expense', '2026-04-24 17:15:00'),      -- food, Home

-- ==================== МАЙ 2026 ====================
(2, 4, 2500.00, 'food', 'expense', '2026-05-01 11:00:00'),      -- food, Home
(3, 4, 450.00, 'i drive', 'income', '2026-05-01 14:35:00'),     -- i drive, Home
(4, 3, 10000.00, 'Salary', 'income', '2026-05-05 10:00:00'),    -- Salary, Work
(2, 4, 2000.00, 'food', 'expense', '2026-05-08 12:40:00'),      -- food, Home
(2, 3, 680.00, 'food', 'expense', '2026-05-08 15:15:00'),       -- food, Work
(3, 4, 200.00, 'i drive', 'income', '2026-05-08 18:50:00'),     -- i drive, Home
(2, 4, 3000.00, 'food', 'expense', '2026-05-15 10:20:00'),      -- food, Home
(1, 5, 8000.00, 'hostel', 'expense', '2026-05-15 13:40:00'),    -- hostel, Vacation (кат: Other)
(3, 5, 6000.00, 'Transport', 'expense', '2026-05-15 16:10:00'), -- Transport, Vacation
(2, 5, 900.00, 'shashlik', 'expense', '2026-05-16 14:00:00'),   -- shashlik, Vacation
(3, 3, 1900.00, 'fuel', 'expense', '2026-05-16 17:30:00'),      -- fuel, Work
(2, 5, 800.00, 'Sushi', 'expense', '2026-05-17 21:05:00'),      -- Sushi, Vacation
(3, 4, 250.00, 'i drive', 'income', '2026-05-19 09:15:00'),     -- i drive, Home
(2, 5, 1200.00, 'pizza', 'expense', '2026-05-20 13:00:00'),     -- pizza, Vacation
(4, 3, 16000.00, 'Salary', 'income', '2026-05-20 15:45:00'),    -- Salary, Work
(2, 3, 250.00, 'food', 'expense', '2026-05-20 19:10:00'),       -- food, Work
(2, 5, 550.00, 'Caffe', 'expense', '2026-05-21 11:30:00'),      -- Caffe, Vacation
(5, 4, 880.00, 'Other', 'expense', '2026-05-21 14:20:00'),      -- Other, Home (кат: Entertainment)
(1, 4, 5000.00, 'borrowed', 'income', '2026-05-21 16:00:00'),   -- borrowed, Home (кат: Other)
(3, 5, 5700.00, 'Transport', 'expense', '2026-05-21 18:45:00'), -- Transport, Vacation
(2, 4, 2100.00, 'food', 'expense', '2026-05-22 15:30:00'),      -- food, Home
(3, 3, 2000.00, 'fuel', 'expense', '2026-05-27 09:10:00');      -- fuel, Work