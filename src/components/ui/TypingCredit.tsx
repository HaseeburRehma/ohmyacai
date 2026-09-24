'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Design & Entwicklung von TYLOTECH" typed out character-by-character,
 * held for a beat, erased, then retyped in a loop — with a blinking
 * cursor at the caret. Matches the type-in effect from tylotech.de.
 *
 * The whole span is wrapped in an anchor to tylotech.de.
 */
const NORMAL = 'Design & Entwicklung von ';
const BOLD = 'TYLOTECH';
const FULL = NORMAL + BOLD;

const TYPE_MS = 80;
const ERASE_MS = 45;
const HOLD_TYPED_MS = 1600;
const HOLD_EMPTY_MS = 550;

export default function TypingCredit() {
  const [text, setText] = useState('');
  const paused = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    /* prefers-reduced-motion: show the full string, skip the loop. */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setText(FULL);
      return;
    }

    let index = 0;
    let deleting = false;
    let timer: number | undefined;

    const step = () => {
      if (paused.current) {
        timer = window.setTimeout(step, 400);
        return;
      }
      if (!deleting && index < FULL.length) {
        index += 1;
        setText(FULL.slice(0, index));
        timer = window.setTimeout(step, TYPE_MS);
      } else if (deleting && index > 0) {
        index -= 1;
        setText(FULL.slice(0, index));
        timer = window.setTimeout(step, ERASE_MS);
      } else if (!deleting) {
        deleting = true;
        timer = window.setTimeout(step, HOLD_TYPED_MS);
      } else {
        deleting = false;
        timer = window.setTimeout(step, HOLD_EMPTY_MS);
      }
    };

    timer = window.setTimeout(step, HOLD_EMPTY_MS);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  /* Pause the loop while the pointer is over the credit so the user
     can read it in full without it erasing. */
  const onEnter = () => { paused.current = true; };
  const onLeave = () => { paused.current = false; };

  const boldPart = text.length > NORMAL.length ? text.slice(NORMAL.length) : '';
  const normalPart = text.length > NORMAL.length ? NORMAL : text;

  return (
    <a
      href="https://tylotech.de"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-label="Design & Entwicklung von TyloTech"
      className="typing-credit inline-flex items-center whitespace-nowrap text-white/80 outline-none transition-colors hover:text-white focus-visible:text-white"
    >
      <span aria-hidden>
        {normalPart}
        {boldPart && <strong className="font-bold text-white">{boldPart}</strong>}
      </span>
      <span aria-hidden className="typing-caret ml-[3px] inline-block text-white/80">|</span>
    </a>
  );
}
