import { useState, useEffect } from "react";
import { useLanguage } from "../useLanguage";

import { UseManageItemsModalProps } from "./types";

export const useManageItemsModal = ({
  apiUrl,
  onUpdate,
}: UseManageItemsModalProps) => {
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("💎");
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { translator } = useLanguage();

  // Блокировка скролла body при монтировании
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleSelectIcon = (emoji: string): void => {
    setIcon(emoji);
    setIsPickerOpen(false);
  };

  const togglePicker = () => setIsPickerOpen((prev) => !prev);
  const closeAlert = () => setAlertMessage(null);

  // Хелпер для обработки ошибок сервера и их локализации
  const handleServerError = async (
    response: Response,
    defaultMessage: string
  ) => {
    try {
      const result = await response.json();
      const errorCode = result.code;
      const translatedMessage =
        translator[errorCode as keyof typeof translator] ||
        result.error ||
        defaultMessage;
      setAlertMessage(translatedMessage);
    } catch {
      setAlertMessage(defaultMessage);
    }
  };

  const handleAdd = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!name.trim()) return;
    setAlertMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${apiUrl}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, icon }),
        }
      );

      if (!response.ok) {
        await handleServerError(response, "Failed to add item");
      } else {
        setName("");
        onUpdate();
      }
    } catch (err) {
      console.error("Request error:", err);
      setAlertMessage("Failed to contact the server");
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setAlertMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${apiUrl}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        await handleServerError(response, "Server error");
      } else {
        onUpdate();
      }
    } catch (error) {
      console.error("Request error:", error);
      setAlertMessage("Failed to contact the server");
    }
  };

  return {
    name,
    setName,
    icon,
    isPickerOpen,
    alertMessage,
    translator,
    togglePicker,
    handleSelectIcon,
    handleAdd,
    handleDelete,
    closeAlert,
  };
};
