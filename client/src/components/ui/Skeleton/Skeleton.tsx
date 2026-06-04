import styles from "./Skeleton.module.css";

interface SkeletonProps {
  count?: number; //Количество строк
}

const Skeleton: React.FC<SkeletonProps> = ({ count = 15 }) => {
  const items: number[] = Array(count).fill(0);

  return (
    <>
      {items.map((_, index: number) => (
        <div key={index} className={`${styles.skeleton} ${styles.item}`}></div>
      ))}
    </>
  );
};

export default Skeleton;
