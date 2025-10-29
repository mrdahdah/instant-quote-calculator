"use client";
import { useEffect, useRef, useState } from 'react';

type Props = { value: number; durationMs?: number; prefix?: string; className?: string };

export function AnimatedNumber({ value, durationMs = 400, prefix = '', className }: Props) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const start = performance.now();
    const from = previous.current;
    const to = value;
    previous.current = value;

    if (from === to) return;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const current = Math.round(from + (to - from) * progress);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [value, durationMs]);

  return <span className={className}>{prefix}{display}</span>;
}


