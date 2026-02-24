import { motion } from "framer-motion";

export default function SmoothScrollBackground() {
  return (
    <div className="bg-animated">
        <div className="bg-gradient"></div>
        <div className="bg-mesh"></div>
        <div className="floating-orbs">
            {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={i}
                    className={`orb orb-${i}`}
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                        duration: 6 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
        <div className="grid-overlay"></div>
    </div>
  );
}
