import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_MESSAGES = [
  "Geocoding your location...",
  "Scanning nearby restaurants...",
  "Reading your vibe...",
  "Ranking the perfect picks...",
  "Almost ready...",
];

export default function LoadingScreen({ theme }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx((p) => (p + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(msgTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) return p;
        return p + Math.random() * 7 + 2;
      });
    }, 420);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen gap-10 px-6"
    >
      {/* Brand mark */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1
          className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight"
          style={{
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          MOODYFOODZ
        </h1>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-full max-w-[280px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className="w-full h-px rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 88)}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Text */}
      <div className="text-center space-y-3">
        <motion.h2
          className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          Finding your perfect meal
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            className="font-body text-sm"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {LOADING_MESSAGES[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Pulsing dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: theme.primary }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.26 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
