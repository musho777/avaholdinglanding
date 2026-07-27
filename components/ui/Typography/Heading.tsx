import { HTMLAttributes, createElement } from "react";
import styles from "./Typography.module.css";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
}

export const Heading = ({
  as = "h2",
  weight = "semibold",
  align = "left",
  className = "",
  children,
  ...props
}: HeadingProps) => {
  const classes = [
    styles.heading,
    styles[as],
    styles[`weight-${weight}`],
    styles[`align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(as, { className: classes, ...props }, children);
};
