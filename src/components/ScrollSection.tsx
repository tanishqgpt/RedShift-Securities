import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function ScrollSection({ id, children, className = '' }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id={id} className={`section-padding ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
