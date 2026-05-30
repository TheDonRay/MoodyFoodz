import { useState } from "react";
import { motion } from "framer-motion";

const CUISINE_PILLS = [
  "Italian",
  "Japanese",
  "Mexican",
  "Indian",
  "Thai",
  "American",
  "Chinese",
  "Mediterranean",
  "Korean",
  "Lebanese",
  "Turkish",
  "Vietnamese",
];

function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <div
        className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        ▾
      </div>
    </div>
  );
}

function Field({ label, htmlFor, delay, children }) {
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <label
        htmlFor={htmlFor}
        className="font-body text-xs uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {label}
      </label>
      {children}
    </motion.div>
  );
}

export default function MoodForm({
  onMoodChange,
  onSubmit,
  isLoading,
  error,
  theme,
}) {
  const [form, setForm] = useState({
    mood: "",
    address: "",
    dietary: "halal",
    cuisine: "",
    distance: 15,
  });

  const update = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (field === "mood") onMoodChange(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    "glass-input w-full px-4 py-3 rounded-xl font-body text-sm placeholder-white/20 text-white";
  const selectClass =
    "glass-input w-full px-4 py-3 pr-9 rounded-xl font-body text-sm text-white appearance-none cursor-pointer";

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.97, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Brand header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <h1
          className="font-display font-bold text-6xl tracking-tight"
          style={{ color: theme.primary }}
        >
          MoodyFoodz
        </h1>
        <p
          className="font-body text-xs mt-2 uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.32)" }}
        >
          Tell us how you feel. We'll find the food.
        </p>
      </motion.div>

      {/* Glass form card */}
      <motion.div
        className="glass-card rounded-2xl p-7 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        {/* Decorative inner glow */}
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[60px] pointer-events-none"
          style={{ background: theme.blob1 }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-[50px] pointer-events-none"
          style={{ background: theme.blob2 }}
        />

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
          {/* Mood */}
          <Field label="I'm feeling..." htmlFor="mood" delay={0.14}>
            <input
              id="mood"
              type="text"
              className={inputClass}
              placeholder="happy, adventurous, stressed out..."
              value={form.mood}
              onChange={(e) => update("mood", e.target.value)}
              required
              autoComplete="off"
            />
          </Field>

          {/* Address */}
          <Field label="My address is..." htmlFor="address" delay={0.19}>
            <input
              id="address"
              type="text"
              className={inputClass}
              placeholder="123 Main St, City, State"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              required
            />
          </Field>

          {/* Dietary + Distance (2-col) */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Diet" htmlFor="dietary" delay={0.24}>
              <SelectWrapper>
                <select
                  id="dietary"
                  className={selectClass}
                  value={form.dietary}
                  onChange={(e) => update("dietary", e.target.value)}
                >
                  <option value="halal">Halal</option>
                  <option value="non halal">Non-Halal</option>
                  <option value="kosher">Kosher</option>
                </select>
              </SelectWrapper>
            </Field>

            <Field label="Travel time" htmlFor="distance" delay={0.29}>
              <SelectWrapper>
                <select
                  id="distance"
                  className={selectClass}
                  value={form.distance}
                  onChange={(e) => update("distance", Number(e.target.value))}
                >
                  <option value={10}>10 min</option>
                  <option value={15}>15 min</option>
                  <option value={20}>20 min</option>
                  <option value={30}>30 min</option>
                </select>
              </SelectWrapper>
            </Field>
          </div>

          {/* Cuisine */}
          <Field label="I'm craving..." htmlFor="cuisine" delay={0.34}>
            <input
              id="cuisine"
              type="text"
              className={inputClass}
              placeholder="Italian, sushi, something spicy..."
              value={form.cuisine}
              onChange={(e) => update("cuisine", e.target.value)}
              required
            />
            {/* Quick-pick pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {CUISINE_PILLS.map((c) => {
                const selected = form.cuisine.toLowerCase() === c.toLowerCase();
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => update("cuisine", c)}
                    className="cuisine-pill px-2.5 py-1 rounded-full text-xs font-body"
                    style={
                      selected
                        ? {
                            backgroundColor: theme.primary + "28",
                            borderColor: theme.primary,
                            color: theme.accent,
                          }
                        : {}
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl px-4 py-3 text-sm font-body"
              style={{
                background: "rgba(248,113,113,0.12)",
                border: "1px solid rgba(248,113,113,0.3)",
                color: "#fca5a5",
              }}
            >
              ⚠️ {error.message || "Something went wrong. Please try again."}
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="submit-btn w-full py-4 rounded-xl font-display font-bold text-base text-white tracking-wide mt-1"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <Spinner />
                Finding your match...
              </span>
            ) : (
              "✨ Find My Perfect Meal"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      />
      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
