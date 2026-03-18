import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * CountUp Component
 * A premium, smooth, and modern counter animation using Framer Motion.
 * 
 * @param {number} to - The target value to count up to.
 * @param {number} from - The starting value (default: 0).
 * @param {number} duration - Duration of the animation in seconds (default: 2).
 * @param {number} delay - Delay before starting the animation (default: 0).
 * @param {string} prefix - Optional prefix for the number (e.g., "$").
 * @param {string} suffix - Optional suffix for the number (e.g., "+").
 * @param {string} className - Optional Tailwind or CSS classes for styling.
 * @param {boolean} once - If true, animation only runs once (default: true).
 */
const CountUp = ({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
    }
  }, [isInView, to, delay, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Intl.NumberFormat("en-US").format(
          latest.toFixed(0)
        )}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span
      ref={ref}
      className={`${className}`}
    >
      {prefix}{from}{suffix}
    </span>
  );
};

export default CountUp;
