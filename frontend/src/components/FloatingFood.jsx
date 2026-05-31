import { motion } from "framer-motion";
import { useMemo } from "react";

const FOOD_EMOJIS = [
  "🍕", "🍣", "🌮", "🍜", "🍔", "🍩", "🧁",
  "🍱", "🍛", "🥗", "🌯", "🥐", "🍦", "🥟",
  "🍰", "🫕", "🥙", "🍤", "🥩", "🫔",
];

export default function FloatingFood() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        emoji: FOOD_EMOJIS[i % FOOD_EMOJIS.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 22 + Math.random() * 26,
        duration: 28 + Math.random() * 28,
        delay: -Math.random() * 40,
        driftX: (Math.random() - 0.5) * 160,
        driftY: (Math.random() - 0.5) * 140,
        opacity: 0.07 + Math.random() * 0.12,
        rotate: Math.random() * 360,
        rotateDelta: (Math.random() - 0.5) * 80,
        pulseDuration: 3 + Math.random() * 4,
        pulseDelay: Math.random() * 3,
      })),
    [],
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            lineHeight: 1,
            userSelect: "none",
          }}
          animate={{
            x: [0, p.driftX * 0.4, p.driftX, p.driftX * 0.6, 0],
            y: [0, p.driftY * 0.35, p.driftY, p.driftY * 0.5, 0],
            rotate: [
              p.rotate,
              p.rotate + p.rotateDelta * 0.5,
              p.rotate + p.rotateDelta,
              p.rotate + p.rotateDelta * 0.3,
              p.rotate,
            ],
            opacity: [
              p.opacity,
              p.opacity * 1.5,
              p.opacity * 0.7,
              p.opacity * 1.3,
              p.opacity,
            ],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
