"use client";

import React, { useEffect, useMemo, useState } from "react";

type TypewriterProps = {
  text: string;
  /** characters per second */
  speedCps?: number;
  /** optional className applied to wrapper span */
  className?: string;
  /** show a blinking cursor */
  showCursor?: boolean;
  /** character to use as cursor */
  cursorChar?: string;
  /** delay before typing begins (ms) */
  startDelayMs?: number;
  /** loop typing effect by deleting and retyping */
  loop?: boolean;
  /** pause before deleting when loop=true (ms) */
  loopPauseMs?: number;
};

export default function Typewriter(props: TypewriterProps) {
  const {
    text,
    speedCps = 24,
    className,
    showCursor = true,
    cursorChar = "_",
    startDelayMs = 250,
    loop = false,
    loopPauseMs = 1000,
  } = props;

  const characters = useMemo(() => Array.from(text), [text]);
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    // Support reduced motion preference: render immediately.
    if (typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(characters.length);
      return;
    }

    const delay = index === 0 && !deleting ? startDelayMs : Math.max(16, 1000 / speedCps);

    timeoutId = window.setTimeout(() => {
      if (!loop) {
        setIndex((prev) => Math.min(prev + 1, characters.length));
        return;
      }

      // Looping: type to end, pause, then delete, pause, repeat
      if (!deleting) {
        if (index < characters.length) {
          setIndex(index + 1);
        } else {
          // reached end, pause then start deleting
          window.setTimeout(() => setDeleting(true), loopPauseMs);
        }
      } else {
        if (index > 0) {
          setIndex(index - 1);
        } else {
          // reached start, pause then start typing
          window.setTimeout(() => setDeleting(false), loopPauseMs);
        }
      }
    }, delay);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [characters.length, index, deleting, speedCps, startDelayMs, loop, loopPauseMs]);

  const visible = characters.slice(0, index).join("");

  return (
    <span className={className}>
      {visible}
      {showCursor && (
        <span className="typewriter-cursor" aria-hidden>
          {cursorChar}
        </span>
      )}
    </span>
  );
}


