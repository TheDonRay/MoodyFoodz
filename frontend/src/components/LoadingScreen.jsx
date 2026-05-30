import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_EMOJIS = ["🍜", "🍕", "🌮", "🍣", "🥗", "🍔", "🥘", "🍱"];
const LOADING_MESSAGES = [
  "Geocoding your address...",
  "Scanning nearby restaurants...",
  "Claude is reading your vibe...",
  "Ranking the perfect picks...",
  "Almost ready...",
];

export default function LoadingScreen({ theme }) {
  const [emojiIdx, setEmojiIdx] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const emojiTimer = setInterval(() => {
      setEmojiIdx((p) => (p + 1) % LOADING_EMOJIS.length);
    }, 650);
    const msgTimer = setInterval(() => {
      setMsgIdx((p) => (p + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => {
      clearInterval(emojiTimer);
      clearInterval(msgTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center min-h-screen gap-8 px-6"
    >
      {/* Animated emoji rotator */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ background: theme.blob1 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={emojiIdx}
            className="relative text-6xl"
            initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.6, opacity: 0, rotate: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {LOADING_EMOJIS[emojiIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Text */}
      <div className="text-center space-y-3">
        <motion.h2
          className="font-display font-extrabold text-2xl text-white"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Finding your perfect meal
        </motion.h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            className="font-body text-sm"
            style={{ color: theme.accent, opacity: 0.7 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {LOADING_MESSAGES[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Pulsing dots */}
      <div className="flex gap-2.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: theme.primary }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
