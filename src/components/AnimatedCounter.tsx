import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1.5, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <Counter value={value} duration={duration} prefix={prefix} suffix={suffix} />
      ) : (
        `${prefix}0${suffix}`
      )}
    </motion.span>
  );
}

function Counter({ value, duration, prefix, suffix }: { value: number; duration: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={0}
        animate={value}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        onUpdate={(latest) => {
          if (ref.current) {
            const num = Number(latest);
            ref.current.textContent = `${prefix}${Number.isInteger(value) ? Math.round(num) : num.toFixed(1)}${suffix}`;
          }
        }}
      />
    </motion.span>
  );
}
