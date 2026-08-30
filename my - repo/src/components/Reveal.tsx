import type { ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const Tag = as as ElementType;
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
