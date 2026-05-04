import { useEffect, useState } from "react";

import { useLanguage } from "./hooks/useLanguage";
import { THEMES } from "./constants/themes";

import styles from "./App.module.css";
/* eslint-disable-next-line no-unused-vars */ //fix magic error of eslint
import { motion, AnimatePresence } from "framer-motion";

import HeaderSection from "./components/HeaderSection";
import ToolsSection from "./components/ToolsSection";
import ProjectsSection from "./components/ProjectsSection";
import TransactionTable from "./components/TransactionTable";

import ModalsManager from "./components/ModalsManager";
import Spinner from "./components/Spinner";
import Skeleton from "./components/Skeleton";

import {
  PROJECTS_MANAGE,
  // CATEGORIES_MANAGE,
  TRANSACTIONS,
  INDEX,
} from "./constants/links";

function App() {
  const { translator } = useLanguage();

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
    // setIsFormOpen(true);
    setIsToolsOpen(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]); // Сброс на текущую
    // setIsFormOpen(false);
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
    if (!confirm(`${translator.confDeletind} (${selectedIds.length})?`)) return;

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
      console.error(`${translator.errDeleting}`, error);
    }
  };

  const handleMove = async (ids, targetProjectId) => {
    if (selectedIds.length === 0) return;
    if (!confirm(`${translator.confMoving} (${selectedIds.length})?`)) return;

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
      console.error(`${translator.errMoving}`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    {
      name: `${translator.income}`,
      value: totalIncome,
      fill: "var(--incomeColor)",
    }, // Зеленый
    {
      name: `${translator.expense}`,
      value: totalExpense,
      fill: "var(--expenseColor)",
    }, // Красный
  ].filter((item) => item.value > 0); // Показываем только если сумма > 0

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.container}
      >
        <section className={styles.toolsSection}>
          <HeaderSection
            translator={translator}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            isToolsOpen={isToolsOpen}
            setIsToolsOpen={setIsToolsOpen}
          />

          <AnimatePresence>
            {isToolsOpen && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  overflow: "hidden",
                  marginBottom: 10,
                }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ToolsSection
                  translator={translator}
                  formProps={{
                    editingId,
                    date,
                    setDate,
                    amount,
                    setAmount,
                    description,
                    setDescription,
                    catId,
                    setCatId,
                    type,
                    setType,
                    categories,
                    handleSubmit,
                    cancelEdit,
                    projects,
                    projId,
                    setProjId,
                  }}
                  analyticsProps={{
                    categoryStats,
                    totalStats,
                    filteredByCategory,
                  }}
                  filtersProps={{
                    categories,
                    filterCatIds,
                    toggleFilterCategory,
                    setFilterCatIds,
                    startDate,
                    setStartDate,
                    endDate,
                    setEndDate,
                    searchQuery,
                    setSearchQuery,
                    filterType,
                    setFilterType,
                    isCategoryManagerOpen,
                    setIsCategoryManagerOpen,
                  }}
                  balanceProps={{ totalIncome, totalExpense, balance }}
                />
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
              {/* Менеджер проектов: */}
              <ProjectsSection
                translator={translator}
                projId={projId}
                setProjId={setProjId}
                setIsProjectManagerOpen={setIsProjectManagerOpen}
                projects={projects}
              />

              {/* Таблица транзакций: */}
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
      <ModalsManager
        translator={translator}
        isCategoryManagerOpen={isCategoryManagerOpen}
        setIsCategoryManagerOpen={setIsCategoryManagerOpen}
        isProjectManagerOpen={isProjectManagerOpen}
        setIsProjectManagerOpen={setIsProjectManagerOpen}
        categories={categories}
        projects={projects}
        fetchData={fetchData}
      />
    </>
  );
}

export default App;
