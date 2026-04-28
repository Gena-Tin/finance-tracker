import { useEffect, useState } from "react";

import styles from "./App.module.css";

/* eslint-disable-next-line no-unused-vars */ //fix magic error of eslint
import { motion, AnimatePresence } from "framer-motion";

import { THEMES } from "./constants/themes";

import {
  PROJECTS_MANAGE,
  CATEGORIES_MANAGE,
  TRANSACTIONS,
  INDEX,
} from "./constants/links";

import TransactionForm from "./components/TransactionForm";
import BalanceBoard from "./components/BalanceBoard";
import TransactionTable from "./components/TransactionTable";
import Filters from "./components/Filters";
import Analytics from "./components/Analytics";
import Spinner from "./components/Spinner";
import Skeleton from "./components/Skeleton";
import EntityModal from "./components/EntityModal";

function App() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState(1);
  const [type, setType] = useState("expense");

  const [selectedIds, setSelectedIds] = useState([]);

  // По умолчанию пустой массив означает "выбраны все" или "фильтр не активен"
  const [filterCatIds, setFilterCatIds] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [filterType, setFilterType] = useState(""); // "" | "income" | "expense"

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const [isBalanceOpen, setIsBalanceOpen] = useState(false);

  // const [isDark, setIsDark] = useState(() => {
  //   return localStorage.getItem("theme") === "dark";
  // });

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "theme-light";
  });

  const [isToolsOpen, setIsToolsOpen] = useState(true);

  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  const [projects, setProjects] = useState([]);
  const [projId, setProjId] = useState(1); // ID проекта "All"
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      id: editingId, // Передаем ID, если редактируем
      category_id: catId,
      amount: parseFloat(amount),
      description: description,
      type: type,
      created_at: date,
      project_id: projId,
    };

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${TRANSACTIONS}`,

        {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionData),
        }
      );

      if (res.ok) {
        setEditingId(null);
        setAmount("");
        setDescription("");
        fetchData();
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchData = async () => {
    try {
      const [catRes, transRes, projRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/${INDEX}`),
        fetch(`${import.meta.env.VITE_API_URL}/${TRANSACTIONS}`),
        fetch(`${import.meta.env.VITE_API_URL}/${PROJECTS_MANAGE}`),
      ]);

      const catData = await catRes.json();
      const transData = await transRes.json();
      const projData = await projRes.json();
      setProjects(projData);

      setCategories(catData);
      setTransactions(transData);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setAmount(t.amount);
    setDescription(t.description);
    setCatId(t.category_id);
    setType(t.type);
    // Подставляем дату из транзакции (обрезаем время, если оно есть)
    setDate(t.created_at.split(" ")[0]);
    // Автоматически открываем форму при редактировании!
    setIsFormOpen(true);
    setIsToolsOpen(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]); // Сброс на текущую
    setIsFormOpen(false);
  };

  // переключение чекбокса:
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFilterCategory = (id) => {
    const numericId = Number(id);
    setFilterCatIds((prev) =>
      prev.includes(numericId)
        ? prev.filter((item) => item !== numericId)
        : [...prev, numericId]
    );
  };

  // функция удаления:
  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Удалить выбранные записи? (${selectedIds.length})?`)) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${TRANSACTIONS}`,

        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: selectedIds }),
        }
      );

      if (res.ok) {
        setSelectedIds([]); // Очищаем выбор
        fetchData(); // функция обновления данных
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const handleMove = async (ids, targetProjectId) => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Переместить выбранные записи? (${selectedIds.length})?`))
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${TRANSACTIONS}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids, targetProjectId }),
        }
      );

      if (res.ok) {
        setSelectedIds([]);
        fetchData();
      }
    } catch (error) {
      console.error("Ошибка переноса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (isDark) {
  //     document.documentElement.classList.add("dark-theme");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark-theme");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [isDark]);

  useEffect(() => {
    const theme = THEMES[currentTheme];
    if (!theme) return;
    const root = document.documentElement;

    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    localStorage.setItem("app-theme", currentTheme);
  }, [currentTheme]);

  let filteredData = transactions;

  //  Фильтр по проекту (если projId !== 1, то есть не "All")
  if (projId !== 1) {
    filteredData = filteredData.filter((t) => Number(t.project_id) === projId);
  }

  //  Фильтр по категориям
  if (filterCatIds.length > 0) {
    filteredData = filteredData.filter((t) =>
      filterCatIds.includes(Number(t.category_id))
    );
  }

  //  Добавляем фильтр по диапазону дат
  if (startDate) {
    filteredData = filteredData.filter((t) => t.created_at >= startDate);
  }
  if (endDate) {
    // Добавляем '23:59:59', чтобы включить весь последний день
    filteredData = filteredData.filter(
      (t) => t.created_at <= endDate + " 23:59:59"
    );
  }
  //  Фильтр по тексту в описании (регистронезависимый)
  if (searchQuery) {
    filteredData = filteredData.filter((t) =>
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  //  Фильтр по типу (Доход / Расход)
  if (filterType) {
    filteredData = filteredData.filter((t) => t.type === filterType);
  }
  // Эту переменную используем для отрисовки таблицы
  const filteredByCategory = filteredData;

  //  Для расчетов баланса берем отфильтрованные, но исключаем те, что помечены на удаление
  const activeTransactions = filteredByCategory.filter(
    (t) => !selectedIds.includes(t.id)
  );

  // Считаем доходы
  const totalIncome = activeTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  // Считаем расходы
  const totalExpense = activeTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  // Итоговый баланс
  const balance = totalIncome - totalExpense;

  // Аналитика:
  // 1. Группируем внешнее кольцо (категории)
  const categoryStats = filteredByCategory.reduce((acc, t) => {
    const existing = acc.find(
      (item) => item.name === t.category_name && item.type === t.type
    );
    if (existing) {
      existing.value += parseFloat(t.amount);
    } else {
      acc.push({
        name: t.category_name,
        value: parseFloat(t.amount),
        type: t.type,
      });
    }
    return acc;
  }, []);

  // 2. Группируем внутреннее кольцо (общие Доходы и Расходы)
  const totalStats = [
    { name: "Доходы", value: totalIncome, fill: "var(--incomeColor)" }, // Зеленый
    { name: "Расходы", value: totalExpense, fill: "var(--expenseColor)" }, // Красный
  ].filter((item) => item.value > 0); // Показываем только если сумма > 0

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.container}
      >
        <section className={styles.toolsSection}>
          <div className={styles.mainHeader}>
            <h1>Finance tracker</h1>
            <div className={styles.containerBtnHeader}>
              <select
                name="themes"
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className={styles.themeSelect}
              >
                {Object.entries(THEMES).map(([key, theme]) => (
                  <option key={key} value={key}>
                    {theme.label}
                  </option>
                ))}
              </select>
              {/* <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className={styles.themeButton}
                aria-label="Сменить тему оформления"
              >
                {isDark ? " 🌙 " : " ☀️ "}
              </button> */}
              <button
                type="button"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={styles.toolsButton}
                aria-label="Открыть инструменты"
              >
                {isToolsOpen ? "⋀" : " 🛠️ "}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isToolsOpen && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  overflow: "hidden",
                  paddingBottom: 10,
                }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Добавление/редактирование транзакции */}
                <div
                  className={styles.accordionHeader}
                  onClick={() => setIsFormOpen(!isFormOpen)}
                >
                  <h2>
                    {editingId ? "✏️ Редактирование" : "➕ Добавить операцию"}
                  </h2>
                  <span
                    className={`${styles.icon} ${
                      isFormOpen ? styles.iconOpen : ""
                    }`}
                  >
                    ⋁
                  </span>
                </div>

                <AnimatePresence>
                  {isFormOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TransactionForm
                        editingId={editingId}
                        date={date}
                        setDate={setDate}
                        amount={amount}
                        setAmount={setAmount}
                        description={description}
                        setDescription={setDescription}
                        catId={catId}
                        setCatId={setCatId}
                        type={type}
                        setType={setType}
                        categories={categories}
                        handleSubmit={handleSubmit}
                        cancelEdit={cancelEdit}
                        projects={projects}
                        projId={projId}
                        setProjId={setProjId}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/*  Аналитика */}
                <div
                  className={styles.accordionHeader}
                  onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
                >
                  <h2>📊 Аналитика</h2>
                  <span
                    className={`${styles.icon} ${
                      isAnalyticsOpen ? styles.iconOpen : ""
                    }`}
                  >
                    ⋁
                  </span>
                </div>

                <AnimatePresence>
                  {isAnalyticsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        background: "var(--accent-bg-alt)",
                        borderRadius: 8,
                        marginTop: 10,
                      }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Analytics
                        categoryStats={categoryStats}
                        totalStats={totalStats}
                        filteredByCategory={filteredByCategory}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Фильтры */}
                <div
                  className={styles.accordionHeader}
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                  <h2>🔍 Фильтры</h2>
                  <span
                    className={`${styles.icon} ${
                      isFiltersOpen ? styles.iconOpen : ""
                    }`}
                  >
                    ⋁
                  </span>
                </div>

                <AnimatePresence>
                  {isFiltersOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Filters
                        categories={categories}
                        filterCatIds={filterCatIds}
                        toggleFilterCategory={toggleFilterCategory}
                        setFilterCatIds={setFilterCatIds}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filterType={filterType}
                        setFilterType={setFilterType}
                        isCategoryManagerOpen={isCategoryManagerOpen}
                        setIsCategoryManagerOpen={setIsCategoryManagerOpen}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Баланс */}
                <div
                  className={styles.accordionHeader}
                  onClick={() => setIsBalanceOpen(!isBalanceOpen)}
                >
                  <h2>💰 Баланс </h2>
                  <span
                    className={`${styles.icon} ${
                      isBalanceOpen ? styles.iconOpen : ""
                    }`}
                  >
                    ⋁
                  </span>
                </div>
                <AnimatePresence>
                  {isBalanceOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BalanceBoard
                        totalIncome={totalIncome}
                        totalExpense={totalExpense}
                        balance={balance}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        <section className={styles.tableSection}>
          {loading ? (
            <>
              <Spinner />
              <Skeleton />
            </>
          ) : (
            <>
              <div className={styles.projectHeader}>
                <select
                  name="project-select"
                  value={projId}
                  onChange={(e) => setProjId(Number(e.target.value))}
                  className={styles.projectSelect}
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.icon} {p.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsProjectManagerOpen(true)}
                  className={styles.projectsSettingsBtn}
                  aria-label="Настройка проектов"
                >
                  ⚙️
                </button>
              </div>
              <TransactionTable
                transactions={transactions}
                filteredByCategory={filteredByCategory}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                onToggleAll={(isChecked) => {
                  if (isChecked) setSelectedIds(transactions.map((t) => t.id));
                  else setSelectedIds([]);
                }}
                onDelete={handleDelete}
                onEdit={startEdit}
                editingId={editingId}
                projects={projects}
                onMove={handleMove}
              />
            </>
          )}
        </section>
      </motion.div>
      {/* Модалки: */}
      <AnimatePresence>
        {isCategoryManagerOpen && (
          <EntityModal
            items={categories}
            onUpdate={fetchData}
            apiUrl={CATEGORIES_MANAGE}
            onClose={() => setIsCategoryManagerOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isProjectManagerOpen && (
          <EntityModal
            items={projects}
            onUpdate={fetchData}
            apiUrl={PROJECTS_MANAGE}
            onClose={() => setIsProjectManagerOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
