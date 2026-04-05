import React from "react";

const TransactionTable = ({
  transactions,
  filteredByCategory,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  onDelete,
  onEdit,
  editingId,
}) => {
  return (
    <div style={{ marginTop: "20px" }}>
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
            onClick={onDelete}
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
                onChange={(e) => onToggleAll(e.target.checked)}
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
                  onChange={() => onToggleSelect(t.id)}
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
                    onClick={() => onEdit(t)}
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
    </div>
  );
};

export default TransactionTable;
