"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

type MotionVariant = "fade" | "blurUp" | "slideLeft" | "slideRight" | "scaleUp";

const variants: Record<MotionVariant, Variants> = {
  fade: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
  blurUp: {
    hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -52, rotate: -1.5 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 52, rotate: 1.5 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9, y: 24, filter: "blur(6px)" },
    visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  },
};

type BaseProps = {
  variant?: MotionVariant;
  delay?: number;
  amount?: number;
  once?: boolean;
  children: ReactNode;
};

type RevealDivProps = BaseProps & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView" | "transition">;
type RevealSpanProps = BaseProps & Omit<HTMLMotionProps<"span">, "variants" | "initial" | "animate" | "whileInView" | "transition">;

const transition = {
  duration: 0.85,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function Reveal({
  variant = "fade",
  delay = 0,
  amount = 0.2,
  once = true,
  children,
  ...props
}: RevealDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants[variant]}
      transition={{ ...transition, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealSpan({
  variant = "fade",
  delay = 0,
  amount = 0.2,
  once = true,
  children,
  ...props
}: RevealSpanProps) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants[variant]}
      transition={{ ...transition, delay }}
      {...props}
    >
      {children}
    </motion.span>
  );
}