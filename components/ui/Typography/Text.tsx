import { HTMLAttributes } from "react";
import styles from "./Typography.module.css";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  color?: "primary" | "secondary" | "muted" | "error" | "success";
}

export const Text = ({
  size = "base",
  weight = "normal",
  align = "left",
  color = "primary",
  className = "",
  children,
  ...props
}: TextProps) => {
  const classes = [
    styles.text,
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    styles[`align-${align}`],
    styles[`color-${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};
