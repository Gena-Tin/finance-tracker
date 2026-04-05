import React from "react";

const TransactionForm = ({
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
}) => {
  return (
    <form
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
        <button
          type="button"
          onClick={cancelEdit}
          style={{ marginLeft: "10px" }}
        >
          Отмена
        </button>
      )}
    </form>
  );
};

export default TransactionForm;
