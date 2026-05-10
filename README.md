# 💎 Fullstack Finance Tracker

A robust and scalable personal finance management tool with a modular architecture, multi-language support, and advanced analytics.

## 🚀 Tech Stack

- **Frontend:** React, Vite, Framer Motion (animations)
- **State Management:** Custom Hooks (Modular Architecture)
- **Backend:** PHP 8.5+, PDO (PostgreSQL)
- **Database:** PostgreSQL 16+

## ✨ Key Features

- **Smart Architecture:** Fully refactored codebase with separation of concerns (Hooks, Utils, Components).
- **Multi-Project Support:** Organize your finances across different projects or bank accounts.
- **Dynamic Analytics:** Real-time Donut Chart (Recharts) with deep-dive category statistics.
- **Multilingual UI:** Seamlessly switch between languages (Ukrainian/English/etc.).
- **Theme Engine:** Integrated Dark/Light mode and custom color themes via CSS Variables.
- **Advanced Filtering:**
  - Dynamic category filtering.
  - Date range & Live Search.
  - Bulk actions for efficient data management.
- **Responsive Design:** Fully animated and mobile-friendly interface.

## 📂 Project Structure

```text
src/
├── components/     # Atomic UI components & Feature sections
│   ├── features/   # Business logic components
│   ├── layout/     # Structural components
│   ├── modals/     # Application-wide overlays
│   └── ui/         # Reusable base elements
├── constants/      # App constants, themes & configuration
├── context/        # React Context providers
├── hooks/          # Custom business logic hooks
├── utils/          # Pure helper functions & calculations
└── locales/        # Translation dictionaries
```

## 🛠 Installation & Setup

### 1. Database Setup

- Create a PostgreSQL database.
- Execute the SQL queries from `api/database.sql` to create the necessary tables.

### 2. Backend Configuration

- Go to the `api/` folder.
- Rename `db.php.example` to `db.php`.
- Update the credentials with your local PostgreSQL settings (host, dbname, user, password).
- Run the backend server (accessible from your local network):

```bash
php -S 0.0.0.0:8000
```

### 3. Frontend Setup

- Navigate to the `client/` directory.
- Create a `.env` file and set `VITE_API_URL=http://<YOUR_IP_ADDRESS>:8000/api`.
- Install and run (accessible from your local network):
  ```bash
  npm install
  npm run dev -- --host
  ```

## 📈 Roadmap

```text
[x] Global Refactoring & Modularization
[x] Multi-language support
[x] Project management
[ ] Migrate to TypeScript (Type safety & better DX)
[ ] User Authentication & JWT
[ ] Export to PDF/CSV
```
