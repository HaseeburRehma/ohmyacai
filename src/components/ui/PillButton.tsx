'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Props = {
  children: string;
  href?: string;
  variant?: 'mauve' | 'ink' | 'plum';
  className?: string;
  /** overrides the label size; must stay em-based so the roll still lines up */
  labelClassName?: string;
  onClick?: () => void;
};

const VARIANTS = {
  mauve: 'bg-mauve text-cream',
  ink: 'bg-ink text-white',
  plum: 'bg-plum text-cream',
} as const;

/**
 * The Figma button stacks two copies of its label in a clip box — a roll-up
 * reveal on hover.
 *
 * The artboard's 29px box / 10px gap / 39px shift are hard pixels tied to a
 * 24px label. Everything here is em-based instead (clip = 1.2em, shift = −50%
 * of the two-copy stack), so the label can shrink on narrow screens — which it
 * has to, or "Order Now" runs off the nav below ~380px — and the animation
 * still lands exactly.
 */
export default function PillButton({
  children,
  href = '#',
  variant = 'mauve',
  className,
  labelClassName,
  onClick,
}: Props) {
  const label = cn(
    'font-display block whitespace-nowrap uppercase leading-[1.2] tracking-[-0.5px]',
    labelClassName
  );

  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.96 }}
      className={cn(
        'group relative inline-flex min-h-11 select-none flex-col items-center justify-center rounded-full',
        'px-4 py-2.5 text-[1.0625rem] sm:px-6 sm:py-3 sm:text-2xl',
        'outline-none focus-visible:ring-4 focus-visible:ring-gold/60',
        VARIANTS[variant],
        className
      )}
    >
      <motion.span
        aria-hidden
        variants={{
          rest: { opacity: 0, scale: 0.94 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-full bg-white/15"
      />
      <span className="relative block h-[1.2em] overflow-hidden">
        <motion.span
          className="block"
          variants={{ rest: { y: '0%' }, hover: { y: '-50%' } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={label}>{children}</span>
          <span aria-hidden className={label}>
            {children}
          </span>
        </motion.span>
      </span>
    </motion.a>
  );
}
