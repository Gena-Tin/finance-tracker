import { useState, useEffect, useCallback } from "react";
import { TRANSACTIONS, PROJECTS_MANAGE, INDEX } from "../constants/links";

export const useTransactions = (apiUrl) => {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных
  const fetchData = useCallback(async () => {
    try {
      const [catRes, transRes, projRes] = await Promise.all([
        fetch(`${apiUrl}/${INDEX}`),
        fetch(`${apiUrl}/${TRANSACTIONS}`),
        fetch(`${apiUrl}/${PROJECTS_MANAGE}`),
      ]);

      setCategories(await catRes.json());
      setTransactions(await transRes.json());
      setProjects(await projRes.json());
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Сохранение / Редактирование
  const saveTransaction = async (transactionData, editingId) => {
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(`${apiUrl}/${TRANSACTIONS}`, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });
    if (res.ok) {
      await fetchData();
    } else {
      const errorData = await res.json();
      console.error("Server ERROR:", errorData);
    }
    return res.ok;
  };

  // Удаление
  const deleteTransactions = async (ids) => {
    const res = await fetch(`${apiUrl}/${TRANSACTIONS}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (res.ok) await fetchData();
    return res.ok;
  };

  // Перемещение в другой проект
  const moveTransactions = async (ids, targetProjectId) => {
    const res = await fetch(`${apiUrl}/${TRANSACTIONS}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, targetProjectId }),
    });
    if (res.ok) await fetchData();
    return res.ok;
  };

  return {
    categories,
    transactions,
    projects,
    loading,
    fetchData,
    saveTransaction,
    deleteTransactions,
    moveTransactions,
  };
};
