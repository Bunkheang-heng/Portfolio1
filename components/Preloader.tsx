"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [phase, setPhase] = useState<"enter" | "leave" | "gone">("enter");

  useEffect(() => {
    document.body.classList.add("loaded");

    const hideText = window.setTimeout(() => setPhase("leave"), 1600);
    const remove = window.setTimeout(() => {
      setPhase("gone");
      document.body.classList.remove("loaded");
    }, 2600);

    return () => {
      window.clearTimeout(hideText);
      window.clearTimeout(remove);
      document.body.classList.remove("loaded");
    };
  }, []);

  if (phase === "gone") {
    return null;
  }

  return (
    <div className={`loader-wrap${phase === "leave" ? " is-leaving" : ""}`}>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
      </svg>
      <div className="loader-wrap-heading">
        <div className="load-text">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
      </div>
    </div>
  );
}
