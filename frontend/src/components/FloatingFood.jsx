import { motion } from "framer-motion";
import { useMemo } from "react";

const FOOD_EMOJIS = [
  "🍜",
  "🍕",
  "🌮",
  "🍣",
  "🍔",
  "🥗",
  "🍱",
  "🥘",
  "🍛",
  "🍝",
  "🥩",
  "🌯",
  "🍤",
  "🥟",
  "🫕",
  "🥙",
  "🍗",
  "🥪",
  "🍲",
  "🥡",
];

export default function FloatingFood() {
  const items = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: FOOD_EMOJIS[i % FOOD_EMOJIS.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.1 + Math.random() * 2.2,
        duration: 18 + Math.random() * 22,
        delay: -Math.random() * 25,
        driftX: (Math.random() - 0.5) * 140,
        driftY: (Math.random() - 0.5) * 140,
        opacity: 0.08 + Math.random() * 0.18,
        rotate: Math.random() * 360,
      })),
    [],
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
            opacity: item.opacity,
          }}
          animate={{
            x: [0, item.driftX * 0.6, item.driftX, item.driftX * 0.4, 0],
            y: [0, item.driftY * 0.3, item.driftY * 0.8, item.driftY, 0],
            rotate: [
              item.rotate,
              item.rotate + 25,
              item.rotate - 10,
              item.rotate + 15,
              item.rotate,
            ],
            scale: [1, 1.08, 0.96, 1.04, 1],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
