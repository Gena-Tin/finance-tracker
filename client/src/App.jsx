import { useState, useEffect } from "react";

/* eslint-disable-next-line no-unused-vars */ //fix magic error of eslint
import { motion, AnimatePresence } from "framer-motion";

// Хуки и утилиты
import { useLanguage } from "./hooks/useLanguage";
import { useTransactions } from "./hooks/useTransactions";
import { getProcessedData } from "./utils/financeUtils";
import { THEMES } from "./constants/themes";

// Стили
import styles from "./App.module.css";

// Компоненты
import HeaderSection from "./components/layout/HeaderSection";
import ToolsSection from "./components/layout/ToolsSection";
import ProjectsSection from "./components/layout/ProjectsSection";
import TransactionTable from "./components/features/TransactionTable";
import ModalsManager from "./components/modals/ModalsManager";
import Spinner from "./components/ui/Spinner";
import Skeleton from "./components/ui/Skeleton";

function App() {
  const { translator } = useLanguage();
  const apiUrl = import.meta.env.VITE_API_URL;

  // --- 1. Работа с данными через кастомный хук ---
  const {
    transactions,
    categories,
    projects,
    loading,
    fetchData,
    saveTransaction,
    deleteTransactions,
    moveTransactions,
  } = useTransactions(apiUrl);

  // --- 2. Состояния интерфейса ---
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem("app-theme") || "theme-light"
  );
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);

  // --- 3. Состояния формы и фильтров ---
  const [editingId, setEditingId] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState(1);
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [filterState, setFilterState] = useState({
    filterCatIds: [],
    startDate: "",
    endDate: "",
    searchQuery: "",
    filterType: "",
    projId: 1,
  });

  // --- 4. Темизация ---
  useEffect(() => {
    const theme = THEMES[currentTheme];
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme.variables).forEach(([key, value]) =>
        root.style.setProperty(key, value)
      );
      localStorage.setItem("app-theme", currentTheme);
    }
  }, [currentTheme]);

  // --- 5. Обработка данных (Фильтрация и расчеты) ---
  const {
    filteredData,
    totalIncome,
    totalExpense,
    balance,
    categoryStats,
    totalStats,
  } = getProcessedData(transactions, filterState, selectedIds, translator);

  // --- 6. Обработчики событий ---
  // const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
  // e.preventDefault();

  // const handleSubmit = async (e) => {
  //   setIsSubmitting(true);
  //   e.preventDefault();

  //   const data = {
  //     category_id: catId,
  //     id: editingId,
  //     amount: parseFloat(amount),
  //     description,
  //     type,
  //     created_at: date,
  //     project_id: filterState.projId,
  //   };

  //   if (await saveTransaction(data, editingId)) {
  //     resetForm();
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Блокируем кнопку сразу при старте

    const data = {
      category_id: catId,
      id: editingId,
      amount: parseFloat(amount),
      description,
      type,
      created_at: date,
      project_id: filterState.projId,
    };

    try {
      const success = await saveTransaction(data, editingId);

      if (success) {
        resetForm(); // Очищаем форму только при успешном сохранении
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setAmount(t.amount);
    setDescription(t.description);
    setCatId(t.category_id);
    setType(t.type);
    setDate(t.created_at.split(" ")[0]);
    setIsToolsOpen(true);
    setIsFormOpen(true);
    setFilterState((prev) => ({ ...prev, projId: Number(t.project_id) }));
  };

  const resetForm = () => {
    setEditingId(null);
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]); // Сброс на текущую
    setIsFormOpen(false);
  };

  const clearDates = () =>
    setFilterState((prev) => ({ ...prev, startDate: "", endDate: "" }));

  const handleDelete = async () => {
    if (await deleteTransactions(selectedIds, translator)) setSelectedIds([]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.container}
      >
        {/* Секция инструментов */}
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
                initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                animate={{ height: "auto", opacity: 1, marginBottom: 10 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ToolsSection
                  translator={translator}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
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
                    projects,
                    handleSubmit,
                    isSubmitting,
                    cancelEdit: resetForm,
                    projId: filterState.projId,
                    setProjId: (id) =>
                      setFilterState({ ...filterState, projId: id }),
                  }}
                  analyticsProps={{
                    categoryStats,
                    totalStats,
                    filteredByCategory: filteredData,
                  }}
                  filtersProps={{
                    categories,
                    clearDates,
                    isCategoryManagerOpen,
                    setIsCategoryManagerOpen,

                    filterCatIds: filterState.filterCatIds,
                    setFilterCatIds: (ids) =>
                      setFilterState({ ...filterState, filterCatIds: ids }),

                    startDate: filterState.startDate,
                    setStartDate: (d) =>
                      setFilterState((prev) => ({ ...prev, startDate: d })),

                    endDate: filterState.endDate,
                    setEndDate: (d) =>
                      setFilterState((prev) => ({ ...prev, endDate: d })),

                    searchQuery: filterState.searchQuery,
                    setSearchQuery: (q) =>
                      setFilterState((prev) => ({ ...prev, searchQuery: q })),

                    filterType: filterState.filterType,
                    setFilterType: (t) =>
                      setFilterState((prev) => ({ ...prev, filterType: t })),

                    toggleFilterCategory: (id) => {
                      const numericId = Number(id);
                      setFilterState((prev) => ({
                        ...prev,
                        filterCatIds: prev.filterCatIds.includes(numericId)
                          ? prev.filterCatIds.filter(
                              (item) => item !== numericId
                            )
                          : [...prev.filterCatIds, numericId],
                      }));
                    },
                  }}
                  balanceProps={{ totalIncome, totalExpense, balance }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Секция таблицы */}
        <section className={styles.tableSection}>
          {loading ? (
            <>
              <Spinner />
              <Skeleton />
            </>
          ) : (
            <>
              <ProjectsSection
                translator={translator}
                projId={filterState.projId}
                setProjId={(id) =>
                  setFilterState((prev) => ({ ...prev, projId: id }))
                }
                setIsProjectManagerOpen={setIsProjectManagerOpen}
                projects={projects}
              />

              <TransactionTable
                transactions={transactions}
                filteredByCategory={filteredData}
                selectedIds={selectedIds}
                onToggleSelect={(id) =>
                  setSelectedIds((prev) =>
                    prev.includes(id)
                      ? prev.filter((i) => i !== id)
                      : [...prev, id]
                  )
                }
                onToggleAll={(isChecked) =>
                  setSelectedIds(isChecked ? transactions.map((t) => t.id) : [])
                }
                onDelete={handleDelete}
                onEdit={startEdit}
                editingId={editingId}
                projects={projects}
                onMove={moveTransactions}
              />
            </>
          )}
        </section>
      </motion.div>

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
