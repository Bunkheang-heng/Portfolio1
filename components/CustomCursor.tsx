"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const onEnter = () => cursor.classList.add("cursor-active");
    const onLeave = () => cursor.classList.remove("cursor-active");

    window.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll("a, button, .cursor-pointer");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", onEnter);
      target.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", onEnter);
        target.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
}
