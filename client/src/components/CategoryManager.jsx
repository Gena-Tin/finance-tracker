import React, { useState, useEffect } from "react";

/* eslint-disable-next-line no-unused-vars */ //fix magic error of eslint
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CategoryManager.module.css";

const CategoryManager = ({ categories, onUpdate, onClose }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🎁");
  const [isPickerOpen, setIsPickerOpen] = useState(false); // Состояние для панели иконок

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Блокируем скролл для всего, что может скроллиться
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // Для html

    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  // Набор иконок для быстрого выбора
  const commonIcons = [
    "💰",
    "🍕",
    "🚗",
    "🏠",
    "🎮",
    "👕",
    "🏥",
    "📚",
    "🔋",
    "🛠️",
    "🛒",
    "🍿",
    "✈️",
    "🐾",
    "🎁",
    "💡",
    "🐱",
    "⭐️",
    "🐶",
    "🚌",
    "⚽️",
    "⛵️",
    "🏖️",
    "☎️",
    "🔈",
    "🍎",
    "🍋",
    "🍊",
    "🍒",
    "☕️",
    "🎲",
    "🎖️",
    "🎱",
    "💎",
    "💊",
    "🪣",
    "😁",
    "🙁",
    "😎",
    "😍",
  ];

  const selectIcon = (emoji) => {
    setIcon(emoji);
    setIsPickerOpen(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch("http://localhost:8000/categories_manage.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, icon }),
    });

    setName("");
    onUpdate(); // Обновляем список категорий в App.jsx
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/categories_manage.php",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      // Сначала пробуем получить текст ответа
      const result = await response.json();

      if (!response.ok) {
        // Если сервер вернул 400 или 403, выводим текст ошибки из PHP
        alert(result.error || "Ошибка сервера");
      } else {
        // Если всё успешно, обновляем данные
        onUpdate();
      }
    } catch (error) {
      // Эта часть сработает, если сервер вообще выключен или нет интернета
      console.error("Ошибка запроса:", error);
      alert("Не удалось связаться с сервером");
    }
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Закрытие при клике на фон
    >
      <motion.div
        className={styles.modal}
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()} // Чтобы клик внутри не закрывал модалку
      >
        <div className={styles.modalHeader}>
          <h3>Настройка категорий</h3>
          <button className={styles.closeX} onClick={onClose}>
            ✖
          </button>
        </div>

        <ul className={styles.list}>
          {categories.map((cat) => (
            <li key={cat.id} className={styles.item}>
              <span>
                {cat.icon} {cat.name}
              </span>
              {!cat.is_system && (
                <button
                  className={styles.btnDelete}
                  onClick={() => handleDelete(cat.id)}
                  title="Удалить"
                >
                  🗑️
                </button>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleAdd} className={styles.addForm}>
          {/* <input
            type="text"
            placeholder="Иконка (эмодзи)"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className={styles.inputIcon}
          /> */}

          <div className={styles.iconPickerWrapper}>
            <button
              type="button"
              className={styles.iconPreview}
              onClick={() => setIsPickerOpen(!isPickerOpen)}
            >
              {icon}
            </button>

            {isPickerOpen && (
              <div className={styles.iconGrid}>
                {commonIcons.map((emoji) => (
                  <span
                    key={emoji}
                    className={styles.gridEmoji}
                    onClick={() => selectIcon(emoji)}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Название категории..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputName}
          />
          <button type="submit" className={styles.btnAdd}>
            +
          </button>
        </form>

        <button className={styles.btnClose} onClick={onClose}>
          Готово
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CategoryManager;
