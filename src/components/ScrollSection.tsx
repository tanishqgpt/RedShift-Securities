import { ReactNode, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function ScrollSection({ id, children, className = '' }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.97, 1]);

  return (
    <section ref={ref} id={id} className={`section-padding ${className}`}>
      <motion.div
        style={{ y: isInView ? y : 60, opacity: isInView ? opacity : 0, scale: isInView ? scale : 0.97 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
