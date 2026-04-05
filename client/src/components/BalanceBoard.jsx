import React from "react";

const BalanceBoard = ({ totalIncome, totalExpense, balance }) => {
  return (
    <div
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
        <h3 style={{ color: balance >= 0 ? "#333" : "red", margin: "5px 0" }}>
          {balance.toFixed(2)} ₴
        </h3>
      </div>
    </div>
  );
};

export default BalanceBoard;
