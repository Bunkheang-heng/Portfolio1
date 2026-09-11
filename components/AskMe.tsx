"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const starters = [
  "Who is he?",
  "What skills does he have?",
  "What certificates has he earned?",
  "How can I contact him?",
];

const STORAGE_KEY = "askme-pos";
const DRAG_THRESHOLD = 6;

type Point = { x: number; y: number };

function readPos(): Point | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Point;
    if (typeof parsed.x === "number" && typeof parsed.y === "number") {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

function writePos(point: Point) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(point));
}

export function AskMe() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pos, setPos] = useState<Point | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<Point | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    dragging: boolean;
  } | null>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  const clampToViewport = (x: number, y: number): Point => {
    const node = wrapRef.current;
    const width = node?.offsetWidth ?? 80;
    const height = node?.offsetHeight ?? 80;
    const maxX = Math.max(8, window.innerWidth - width - 8);
    const maxY = Math.max(8, window.innerHeight - height - 8);

    return {
      x: Math.min(Math.max(8, x), maxX),
      y: Math.min(Math.max(8, y), maxY),
    };
  };

  const applyPos = (next: Point) => {
    const point = clampToViewport(next.x, next.y);
    posRef.current = point;
    const node = wrapRef.current;
    if (node) {
      node.style.left = `${point.x}px`;
      node.style.top = `${point.y}px`;
      node.style.right = "auto";
      node.style.bottom = "auto";
      node.classList.add("is-moved");
    }
    return point;
  };

  useLayoutEffect(() => {
    const saved = readPos();
    if (!saved) {
      return;
    }

    const next = applyPos(saved);
    setPos(next);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("askme-open", open);

    if (!open) {
      return () => document.body.classList.remove("askme-open");
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("askme-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages, status, open]);

  useEffect(() => {
    const onResize = () => {
      const current = posRef.current;
      if (!current) {
        return;
      }

      const next = applyPos(current);
      setPos(next);
      writePos(next);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    if (!posRef.current) {
      return;
    }

    const next = applyPos(posRef.current);
    setPos(next);
    writePos(next);
  }, [open]);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }

    const node = wrapRef.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
      dragging: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.dragging && dx * dx + dy * dy < DRAG_THRESHOLD * DRAG_THRESHOLD) {
      return;
    }

    drag.dragging = true;
    wrapRef.current?.classList.add("is-dragging");
    applyPos({ x: drag.originX + dx, y: drag.originY + dy });
  };

  const endDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) {
      return false;
    }

    dragRef.current = null;
    wrapRef.current?.classList.remove("is-dragging");

    if (drag.dragging) {
      const next = posRef.current;
      if (next) {
        setPos(next);
        writePos(next);
      }
      return true;
    }

    return false;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) {
      return;
    }

    sendMessage({ text });
    setInput("");
  };

  const ask = (text: string) => {
    if (busy) {
      return;
    }

    sendMessage({ text });
  };

  return (
    <div
      ref={wrapRef}
      className={`askme${open ? " is-open" : ""}${pos ? " is-moved" : ""}`}
      style={pos ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" } : undefined}
    >
      {open ? (
        <section className="askme-frame" role="dialog" aria-modal="false" aria-label="Ask about HENG Bunkheang">
          <header
            className="askme-head"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div>
              <p className="askme-kicker">Portfolio assistant</p>
              <h6>Ask about him</h6>
            </div>
            <button
              type="button"
              className="askme-close"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </header>

          <div className="askme-thread" ref={listRef}>
            {messages.length === 0 ? (
              <div className="askme-empty">
                <p>Want to know anything about him? Ask me.</p>
                <div className="askme-starters">
                  {starters.map((item) => (
                    <button key={item} type="button" onClick={() => ask(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`askme-bubble askme-bubble-${message.role}`}>
                  {message.parts.map((part, index) =>
                    part.type === "text" ? <p key={`${message.id}-${index}`}>{part.text}</p> : null,
                  )}
                </div>
              ))
            )}
            {status === "submitted" ? <p className="askme-status">Thinking...</p> : null}
            {error ? <p className="askme-status">Something went wrong. Try again.</p> : null}
          </div>

          <form className="askme-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="askme-input">
              Ask a question about HENG Bunkheang
            </label>
            <input
              id="askme-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything about him"
              maxLength={500}
              disabled={busy}
            />
            <button type="submit" disabled={busy || !input.trim()}>
              Send
            </button>
          </form>
        </section>
      ) : (
        <>
          <p className="askme-hint">Want to know anything about him? Ask me.</p>
          <button
            type="button"
            className="askme-launch"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => {
              if (!endDrag(event)) {
                setOpen(true);
              }
            }}
            onPointerCancel={endDrag}
            aria-expanded={false}
            aria-label="Ask about HENG Bunkheang"
            title="Drag to move"
          >
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M8 10.5c0-1.4 1.1-2.5 2.5-2.5h11c1.4 0 2.5 1.1 2.5 2.5v7c0 1.4-1.1 2.5-2.5 2.5h-4.2L12 23.8v-3.8H10.5C9.1 20 8 18.9 8 17.5v-7z" />
              <circle cx="13" cy="14" r="1.1" />
              <circle cx="16" cy="14" r="1.1" />
              <circle cx="19" cy="14" r="1.1" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
