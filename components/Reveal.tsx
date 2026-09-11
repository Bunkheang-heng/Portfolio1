"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  animation?: string;
  delay?: string;
};

export function Reveal({
  children,
  className = "",
  animation = "fadeIn",
  delay,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} wow ${visible ? `animated ${animation}` : ""}`.trim()}
      data-wow-delay={delay}
      style={{
        animationDelay: visible ? delay : undefined,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}
