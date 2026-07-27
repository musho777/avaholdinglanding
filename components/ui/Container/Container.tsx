import { HTMLAttributes } from "react";
import styles from "./Container.module.css";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  center?: boolean;
}

export const Container = ({
  maxWidth = "lg",
  padding = "md",
  center = true,
  className = "",
  children,
  ...props
}: ContainerProps) => {
  const classes = [
    styles.container,
    styles[`maxWidth-${maxWidth}`],
    styles[`padding-${padding}`],
    center && styles.center,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  display?: "block" | "flex" | "inline-flex" | "grid" | "inline-block";
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

export const Box = ({
  display = "block",
  direction,
  align,
  justify,
  gap,
  padding = "none",
  margin = "none",
  className = "",
  children,
  ...props
}: BoxProps) => {
  const classes = [
    styles.box,
    styles[`display-${display}`],
    direction && styles[`direction-${direction}`],
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
    gap && styles[`gap-${gap}`],
    styles[`padding-${padding}`],
    styles[`margin-${margin}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
