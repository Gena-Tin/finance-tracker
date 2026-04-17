import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = () => {
  const items = Array(15).fill(0);

  return (
    <>
      {items.map((_, index) => (
        <div key={index} className={`${styles.skeleton} ${styles.item}`}></div>
      ))}
    </>
  );
};

export default Skeleton;
