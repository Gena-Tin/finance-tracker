import { useEffect, useState } from "react";

import styles from "./App.module.css";

import TransactionForm from "./components/TransactionForm";
import BalanceBoard from "./components/BalanceBoard";
import TransactionTable from "./components/TransactionTable";
import Filters from "./components/Filters";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      id: editingId, // Передаем ID, если редактируем
      category_id: catId,
      amount: parseFloat(amount),
      description: description,
      type: type,
      created_at: date,
    };

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch("http://localhost:8000/transactions.php", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (res.ok) {
        setEditingId(null);
        setAmount("");
        setDescription("");
        fetchData(); // Обновляем список
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchData = async () => {
    try {
      const [catRes, transRes] = await Promise.all([
        fetch("http://localhost:8000/index.php"),
        fetch("http://localhost:8000/transactions.php"),
      ]);

      const catData = await catRes.json();
      const transData = await transRes.json();

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
  };

  const cancelEdit = () => {
    setEditingId(null);
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]); // Сброс на текущую
  };

  // переключение чекбокса:
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFilterCategory = (id) => {
    setFilterCatIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // функция удаления:
  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Удалить выбранные записи (${selectedIds.length})?`)) return;

    try {
      const res = await fetch("http://localhost:8000/transactions.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (res.ok) {
        setSelectedIds([]); // Очищаем выбор
        fetchData(); // функция обновления данных
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className={styles.loading}>Загрузка данных...</p>;

  // 1. Фильтруем по категориям
  let filteredData =
    filterCatIds.length > 0
      ? transactions.filter((t) => filterCatIds.includes(Number(t.category_id)))
      : transactions;

  // 2. Добавляем фильтр по диапазону дат
  if (startDate) {
    filteredData = filteredData.filter((t) => t.created_at >= startDate);
  }
  if (endDate) {
    // Добавляем '23:59:59', чтобы включить весь последний день
    filteredData = filteredData.filter(
      (t) => t.created_at <= endDate + " 23:59:59"
    );
  }
  // 3. Фильтр по тексту в описании (регистронезависимый)
  if (searchQuery) {
    filteredData = filteredData.filter((t) =>
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 4. Фильтр по типу (Доход / Расход)
  if (filterType) {
    filteredData = filteredData.filter((t) => t.type === filterType);
  }
  // Эту переменную используем для отрисовки таблицы
  const filteredByCategory = filteredData;

  // 2. Для расчетов баланса берем отфильтрованные, но исключаем те, что помечены на удаление
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

  return (
    <div className={styles.container}>
      <h1>Финансовый трекер</h1>

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
      />

      <section className={styles.mainContent}>
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
        />

        <BalanceBoard
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />

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
        />
      </section>
    </div>
  );
}

export default App;
