import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function EatingCharacter() {
  const [mouthOpen, setMouthOpen] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setMouthOpen((p) => !p), 620);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 pointer-events-none z-20 hidden sm:block"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          width="96"
          height="118"
          viewBox="0 0 96 118"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 6px 28px rgba(0,0,0,0.65))" }}
        >
          {/* ── Steam wisps ── */}
          {[
            { x: 24, delay: 0, flip: 1 },
            { x: 34, delay: 0.5, flip: -1 },
            { x: 44, delay: 1.0, flip: 1 },
          ].map(({ x, delay, flip }, i) => (
            <motion.path
              key={i}
              d={`M${x},76 Q${x + flip * 4},68 ${x},60 Q${x - flip * 3},52 ${x},46`}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              animate={{ opacity: [0, 0.6, 0], y: [0, -10] }}
              transition={{
                duration: 2 + i * 0.25,
                repeat: Infinity,
                delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* ── Table ── */}
          <rect x="2" y="102" width="92" height="5" rx="2.5" fill="rgba(255,255,255,0.07)" />
          <rect x="8" y="107" width="5" height="11" rx="2.5" fill="rgba(255,255,255,0.04)" />
          <rect x="83" y="107" width="5" height="11" rx="2.5" fill="rgba(255,255,255,0.04)" />

          {/* ── Bowl ── */}
          {/* bowl body */}
          <path
            d="M14 92 Q14 106 48 106 Q82 106 82 92"
            fill="rgba(18,18,18,0.95)"
            stroke="rgba(255,255,255,0.11)"
            strokeWidth="1.2"
          />
          {/* rim ellipse */}
          <ellipse cx="48" cy="92" rx="34" ry="6.5" fill="rgba(18,18,18,0.98)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          {/* food surface */}
          <ellipse cx="48" cy="92" rx="29" ry="5" fill="var(--mood-primary)" opacity="0.22" />
          {/* noodle squiggles */}
          <path d="M32 91 Q38 87 44 91 Q50 95 56 91 Q60 88 64 91" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M34 95 Q40 92 46 95 Q52 98 58 95" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* ── Body ── */}
          <rect x="35" y="66" width="26" height="33" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />

          {/* ── Left arm (resting on table) ── */}
          <path d="M37 80 Q22 88 20 100" stroke="rgba(255,255,255,0.07)" strokeWidth="7" strokeLinecap="round" />

          {/* ── Right arm + chopsticks (eating motion) ── */}
          <motion.g
            style={{ transformOrigin: "59px 72px" }}
            animate={{ rotate: [-32, -6, -32] }}
            transition={{ duration: 1.24, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* arm */}
            <path d="M59 72 Q72 63 76 50" stroke="rgba(255,255,255,0.07)" strokeWidth="7" strokeLinecap="round" />
            {/* chopstick 1 */}
            <line x1="73" y1="52" x2="80" y2="34" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" strokeLinecap="round" />
            {/* chopstick 2 */}
            <line x1="77" y1="51" x2="84" y2="34" stroke="rgba(255,255,255,0.38)" strokeWidth="1.6" strokeLinecap="round" />
            {/* food morsel */}
            <circle cx="81" cy="37" r="3.2" fill="var(--mood-primary)" opacity="0.9" />
          </motion.g>

          {/* ── Head (bobs in sync with arm) ── */}
          <motion.g
            style={{ transformOrigin: "48px 38px" }}
            animate={{ rotate: [-4, 3.5, -4], y: [0, -2.5, 0] }}
            transition={{ duration: 1.24, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* head circle */}
            <circle cx="48" cy="38" r="21" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.11)" strokeWidth="1" />

            {/* blush cheeks */}
            <ellipse cx="33" cy="44" rx="5.5" ry="3" fill="var(--mood-primary)" opacity="0.17" />
            <ellipse cx="63" cy="44" rx="5.5" ry="3" fill="var(--mood-primary)" opacity="0.17" />

            {/* happy squinted eyes */}
            <motion.path
              d="M36 34 Q40 30 44 34"
              stroke="rgba(255,255,255,0.82)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              animate={{ scaleY: [1, 0.08, 1] }}
              transition={{ duration: 0.18, repeat: Infinity, repeatDelay: 3.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M52 34 Q56 30 60 34"
              stroke="rgba(255,255,255,0.82)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              animate={{ scaleY: [1, 0.08, 1] }}
              transition={{ duration: 0.18, repeat: Infinity, repeatDelay: 3.8, ease: "easeInOut" }}
            />

            {/* mouth open (eating) */}
            <motion.ellipse
              cx="48"
              cy="48"
              rx="5.5"
              ry="3.8"
              fill="rgba(0,0,0,0.65)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
              animate={{ opacity: mouthOpen ? 1 : 0 }}
              transition={{ duration: 0.07 }}
            />
            {/* mouth closed (smile between bites) */}
            <motion.path
              d="M42 48 Q48 53.5 54 48"
              stroke="rgba(255,255,255,0.62)"
              strokeWidth="1.9"
              strokeLinecap="round"
              fill="none"
              animate={{ opacity: mouthOpen ? 0 : 1 }}
              transition={{ duration: 0.07 }}
            />
          </motion.g>
        </svg>

        {/* label */}
        <motion.p
          className="text-center font-body text-[9px] tracking-widest uppercase mt-1"
          style={{ color: "rgba(255,255,255,0.18)" }}
          animate={{ opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          hungry?
        </motion.p>
      </motion.div>
    </div>
  );
}
