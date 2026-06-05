import { useState, useEffect, useCallback } from "react";
import { TRANSACTIONS, PROJECTS_MANAGE, INDEX } from "../constants/links";

import { Transaction, Category, Project, TranslationData } from "../types";

export const useTransactions = (apiUrl: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Загрузка данных
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [catRes, transRes, projRes] = await Promise.all([
        fetch(`${apiUrl}/${INDEX}`),
        fetch(`${apiUrl}/${TRANSACTIONS}`),
        fetch(`${apiUrl}/${PROJECTS_MANAGE}`),
      ]);

      const catData: Category[] = await catRes.json();
      const transData: Transaction[] = await transRes.json();
      const projData: Project[] = await projRes.json();

      setCategories(catData);
      setTransactions(transData);
      setProjects(projData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Сохранение / Редактирование
  const saveTransaction = async (
    transactionData: Partial<Transaction>,
    editingId: number | null
  ): Promise<boolean> => {
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
  const deleteTransactions = async (
    ids: number[],
    translator: TranslationData
  ): Promise<boolean> => {
    const confirmed = window.confirm(translator?.deleteSelected);

    if (!confirmed) return false;

    const res = await fetch(`${apiUrl}/${TRANSACTIONS}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (res.ok) await fetchData();
    return res.ok;
  };

  // Перемещение
  const moveTransactions = async (
    ids: number[],
    targetProjectId: number,
    translator: TranslationData
  ): Promise<boolean> => {
    const confirmed = window.confirm(translator?.confMoving);

    if (!confirmed) return false;

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
