import styles from "./Skeleton.module.css";
import { SkeletonProps } from "./types";

export const Skeleton: React.FC<SkeletonProps> = ({ count = 15 }) => {
  const items: number[] = Array(count).fill(0);

  return (
    <>
      {items.map((_, index: number) => (
        <div key={index} className={`${styles.skeleton} ${styles.item}`}></div>
      ))}
    </>
  );
};
