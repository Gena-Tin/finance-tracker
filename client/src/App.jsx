import { useEffect, useState } from "react";

import TransactionForm from "./components/TransactionForm";
import BalanceBoard from "./components/BalanceBoard";

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

  if (loading) return <p>Загрузка данных...</p>;

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
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Финансовый трекер</h1>

      <section>
        <h2>Фильтры</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map((cat) => {
            const isSelected = filterCatIds.includes(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => toggleFilterCategory(cat.id)} // Клик по всей карточке тоже работает
                style={{
                  border: isSelected ? "2px solid #007bff" : "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: isSelected ? "#e7f3ff" : "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "0.2s",
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  style={{ cursor: "pointer" }}
                />
                {cat.icon} {cat.name}
              </div>
            );
          })}
          {filterCatIds.length > 0 && (
            <button
              onClick={() => setFilterCatIds([])}
              style={{
                border: "none",
                background: "none",
                color: "#007bff",
                cursor: "pointer",
              }}
            >
              Сбросить
            </button>
          )}
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #eee",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>Период с:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>по:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {(startDate || endDate) && (
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            style={{
              border: "none",
              background: "#f0f2f5",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#007bff",
            }}
          >
            ✖ Сбросить даты
          </button>
        )}
      </section>
      <section>
        {/* Строка поиска */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>🔍</span>
          <input
            type="text"
            placeholder="Поиск по описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#999",
              }}
            >
              ✖ Очистить
            </button>
          )}
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderTop: "1px solid #f5f5f5",
            paddingTop: "10px",
            marginTop: "5px",
          }}
        >
          <span>Тип:</span>
          <button
            onClick={() => setFilterType("income")}
            style={{
              padding: "5px 15px",
              borderRadius: "20px",
              border:
                filterType === "income" ? "2px solid green" : "1px solid #ccc",
              background: filterType === "income" ? "#e6ffed" : "white",
              cursor: "pointer",
              fontWeight: filterType === "income" ? "bold" : "normal",
            }}
          >
            📈 Доходы
          </button>

          <button
            onClick={() => setFilterType("expense")}
            style={{
              padding: "5px 15px",
              borderRadius: "20px",
              border:
                filterType === "expense" ? "2px solid red" : "1px solid #ccc",
              background: filterType === "expense" ? "#fff1f0" : "white",
              cursor: "pointer",
              fontWeight: filterType === "expense" ? "bold" : "normal",
            }}
          >
            📉 Расходы
          </button>

          {filterType && (
            <button
              onClick={() => setFilterType("")}
              style={{
                border: "none",
                background: "none",
                color: "#007bff",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              ✖ Сбросить тип
            </button>
          )}
        </div>
      </section>

      <section style={{ marginTop: "40px" }}>
        {/* <form
          onSubmit={handleSubmit}
          style={{
            background: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        >
          <h3>{editingId ? "Редактировать операцию" : "Добавить операцию"}</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Сумма"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select value={catId} onChange={(e) => setCatId(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Расход</option>
            <option value="income">Доход</option>
          </select>
          <button type="submit">
            {editingId ? "Сохранить изменения" : "Добавить"}
          </button>
          {editingId && (
            <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>
              Отмена
            </button>
          )}
        </form> */}
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
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "#f0f2f5",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ color: "#666", margin: 0 }}>Доходы</p>
            <h3 style={{ color: "green", margin: "5px 0" }}>
              +{totalIncome.toFixed(2)} ₴
            </h3>
          </div>
          <div
            style={{
              borderLeft: "1px solid #ccc",
              borderRight: "1px solid #ccc",
              padding: "0 40px",
            }}
          >
            <p style={{ color: "#666", margin: 0 }}>Расходы</p>
            <h3 style={{ color: "red", margin: "5px 0" }}>
              -{totalExpense.toFixed(2)} ₴
            </h3>
          </div>
          <div>
            <p style={{ color: "#666", margin: 0 }}>Итого</p>
            <h3
              style={{ color: balance >= 0 ? "#333" : "red", margin: "5px 0" }}
            >
              {balance.toFixed(2)} ₴
            </h3>
          </div>
        </div> */}
        <BalanceBoard
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Последние операции</h2>
          {selectedIds.length > 0 && (
            <button
              onClick={handleDelete}
              style={{
                background: "#ff4d4f",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              🗑 Удалить ({selectedIds.length})
            </button>
          )}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
              <th style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked)
                      setSelectedIds(transactions.map((t) => t.id));
                    else setSelectedIds([]);
                  }}
                  checked={
                    selectedIds.length === transactions.length &&
                    transactions.length > 0
                  }
                />
              </th>
              <th>Дата</th>
              <th>Категория</th>
              <th>Описание</th>
              <th>Сумма</th>
              <th style={{ width: "40px" }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredByCategory.map((t) => (
              <tr
                key={t.id}
                style={{
                  borderBottom: "1px solid #eee",
                  background: selectedIds.includes(t.id)
                    ? "#fff1f0"
                    : "transparent",
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(t.id)}
                    onChange={() => toggleSelect(t.id)}
                  />
                </td>
                <td style={{ padding: "10px 0" }}>
                  {new Date(t.created_at).toLocaleDateString()}
                </td>
                <td>
                  {t.category_icon} {t.category_name}
                </td>
                <td>{t.description}</td>
                <td
                  style={{
                    color: t.type === "expense" ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {t.type === "expense" ? "-" : "+"}
                  {t.amount} ₴
                </td>
                <td>
                  {selectedIds.includes(t.id) && !editingId && (
                    <button
                      onClick={() => startEdit(t)}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
