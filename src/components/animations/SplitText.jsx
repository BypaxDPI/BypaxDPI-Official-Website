import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SplitText({
  text,
  delay = 0,
  duration = 0.5,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const chars = text.split("");

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: duration,
            delay: delay + index * 0.05,
            ease: "easeOut",
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
