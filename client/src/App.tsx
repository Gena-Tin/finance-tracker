import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Хуки и утилиты
import { useLanguage } from "./hooks/useLanguage";
import { useTransactions } from "./hooks/useTransactions";
import { getProcessedData } from "./utils/financeUtils";
import { THEMES } from "./constants/themes";

// Стили
import styles from "./App.module.css";

// Компоненты
import HeaderSection from "./components/layout/HeaderSection/HeaderSection";
import ToolsSection from "./components/layout/ToolsSection/ToolsSection";
import ProjectsSection from "./components/layout/ProjectsSection/ProjectsSection";
import TransactionTable from "./components/features/TransactionTable/TransactionTable";
import ModalsManager from "./components/modals/EntityModal/ModalsManager";
import Spinner from "./components/ui/Spinner/Spinner";
import Skeleton from "./components/ui/Skeleton/Skeleton";
import ConfirmModal from "./components/modals/ConfirmModal";
// Импортируем наши типы
import { Transaction, TransactionType } from "@/types";

// Описываем интерфейс для локального стейта фильтров
interface FilterState {
  filterCatIds: number[];
  startDate: string;
  endDate: string;
  searchQuery: string;
  filterType: TransactionType | "";
  projId: number;
}

// Тип для состояния модалки
interface ConfirmState {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
}

function App() {
  const { translator } = useLanguage();
  const apiUrl = (import.meta.env.VITE_API_URL as string) || "";

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
  const [currentTheme, setCurrentTheme] = useState<string>(
    () => localStorage.getItem("app-theme") || "theme-light"
  );
  const [isToolsOpen, setIsToolsOpen] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] =
    useState<boolean>(false);
  const [isProjectManagerOpen, setIsProjectManagerOpen] =
    useState<boolean>(false);

  // Стейт модалки подтверждения
  const [confirmDialog, setConfirmDialog] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    onConfirm: () => {},
  });

  // --- 3. Состояния формы и фильтров (Строгая типизация) ---
  const [editingId, setEditingId] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [catId, setCatId] = useState<string | number>(1);
  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Явно указываем, что тут массив чисел
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Привязываем объект фильтров к нашему интерфейсу FilterState
  const [filterState, setFilterState] = useState<FilterState>({
    filterCatIds: [],
    startDate: "",
    endDate: "",
    searchQuery: "",
    filterType: "",
    projId: 1,
  });

  // --- 4. Темы ---
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
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      category_id: Number(catId),
      id: editingId ?? undefined,
      amount: parseFloat(amount),
      description,
      type,
      created_at: date,
      project_id: filterState.projId,
    };

    try {
      const success = await saveTransaction(data, editingId);

      if (success) {
        resetForm();
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Модалка подтверждения
  const openConfirm = (title: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmDialog({
        isOpen: true,
        title,
        onConfirm: () => {
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          resolve(true); // Пользователь нажал "ОК"
        },
      });
    });
  };

  const closeConfirm = () => {
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDelete = async () => {
    // Вызываем наше красивое окно вместо старого confirm!
    const confirmed = await openConfirm(
      translator?.deleteSelected || "Delete?"
    );
    if (!confirmed) return;

    if (await deleteTransactions(selectedIds)) {
      setSelectedIds([]);
    }
  };

  const handleMove = async (targetProjectId: number) => {
    const confirmed = await openConfirm(translator?.confMoving || "Move?");
    if (!confirmed) return;

    if (await moveTransactions(selectedIds, targetProjectId)) {
      setSelectedIds([]);
    }
  };

  // Типизируем входящую транзакцию
  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setAmount(String(t.amount));
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
    setDate(new Date().toISOString().split("T")[0]);
    setIsFormOpen(false);
  };

  const clearDates = () =>
    setFilterState((prev) => ({ ...prev, startDate: "", endDate: "" }));

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
                    catId: String(catId), // Приводим к строке для <select>
                    setCatId: (id) => setCatId(id),
                    type,
                    setType,
                    categories,
                    projects,
                    handleSubmit: handleSubmit as any,
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
                onMove={handleMove}
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

      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        onClose={closeConfirm}
        onConfirm={confirmDialog.onConfirm}
        cancelText={translator?.cancel || "Cancel"}
        confirmText={"OK"}
      />
    </>
  );
}

export default App;
