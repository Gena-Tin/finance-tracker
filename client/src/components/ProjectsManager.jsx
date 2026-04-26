import React, { useState, useEffect } from "react";

/* eslint-disable-next-line no-unused-vars */ //fix magic error of eslint
import { motion, AnimatePresence } from "framer-motion";

import IconPicker from "./IconPicker";

import styles from "./CategoryManager.module.css";

const ProjectsManager = ({ projects, onUpdate, onClose }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("💎"); // Иконка по умолчанию для проектов
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const selectIcon = (emoji) => {
    setIcon(emoji);
    setIsPickerOpen(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch(`${import.meta.env.VITE_API_URL}/projects_manage.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, icon }),
    });

    setName("");
    onUpdate(); // Обновляем список проектов
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects_manage.php`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Ошибка сервера");
      } else {
        onUpdate();
      }
    } catch (error) {
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
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>Настройка проектов</h3>
          <button type="button" className={styles.closeX} onClick={onClose}>
            ✖
          </button>
        </div>

        <ul className={styles.list}>
          {projects.map((proj) => (
            <li key={proj.id} className={styles.item}>
              <span>
                {proj.icon} {proj.name}
              </span>
              {!proj.is_system && (
                <button
                  type="button"
                  className={styles.btnDelete}
                  onClick={() => handleDelete(proj.id)}
                  title="Удалить"
                >
                  🗑️
                </button>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleAdd} className={styles.addForm}>
          <div className={styles.inputWrapper}>
            <div className={styles.iconPickerWrapper}>
              <button
                type="button"
                className={styles.iconPreview}
                onClick={() => setIsPickerOpen(!isPickerOpen)}
              >
                {icon}
              </button>

              {isPickerOpen && <IconPicker onSelect={selectIcon} />}
            </div>

            <input
              name="project name"
              type="text"
              placeholder="Название проекта..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputName}
            />
          </div>
          <button type="submit" className={styles.btnAdd}>
            +
          </button>
        </form>
        <button className={styles.btnClose} onClick={onClose}>
          Ok
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsManager;
