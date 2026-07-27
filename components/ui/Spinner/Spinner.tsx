import { HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white";
  label?: string;
}

export const Spinner = ({
  size = "md",
  color = "primary",
  label,
  className = "",
  ...props
}: SpinnerProps) => {
  return (
    <div
      className={`${styles.wrapper} ${className}`}
      role="status"
      aria-label={label || "Loading"}
      {...props}
    >
      <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};
