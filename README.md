# Fullstack Finance Tracker

A lightweight and efficient personal finance management tool built with a modern stack.

## 🚀 Tech Stack
- **Frontend:** React, Vite, CSS3
- **Backend:** PHP 8.5, PDO (PostgreSQL)
- **Database:** PostgreSQL 16+

## ✨ Features
- **Full CRUD:** Create, Read, Update, and Delete transactions.
- **Bulk Actions:** Delete multiple entries at once using checkboxes.
- **Advanced Filtering:**
  - By Category (with dynamic icons).
  - By Date Range (start and end date).
  - By Transaction Type (Income/Expense).
  - Live Search by description.
- **Real-time Balance:** Instant recalculation of totals based on active filters.

## 🛠 Installation & Setup

### 1. Database Setup
- Create a PostgreSQL database.
- Execute the SQL queries from `api/database.sql` to create the necessary tables.

### 2. Backend Configuration
- Go to the `api/` folder.
- Rename `db.php.example` to `db.php`.
- Update the credentials with your local PostgreSQL settings (host, dbname, user, password).

### 3. Frontend Setup
- Navigate to the `client/` directory.
- Install dependencies:
  ```bash
  npm install
