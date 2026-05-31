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
        className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        <svg width="9" height="5" viewBox="0 0 9 5" fill="currentColor">
          <path d="M0 0l4.5 5L9 0z" />
        </svg>
      </div>
    </div>
  );
}

function Field({ label, htmlFor, delay, children }) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <label
        htmlFor={htmlFor}
        className="font-display text-[10px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: "rgba(255,255,255,0.32)" }}
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
    "glass-input w-full px-4 py-3 rounded-lg font-body text-sm text-white";
  const selectClass =
    "glass-input w-full px-4 py-3 pr-9 rounded-lg font-body text-sm text-white appearance-none cursor-pointer";

  return (
    <motion.div
      className="w-full max-w-[440px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Brand */}
      <motion.div
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04 }}
      >
        <h1
          className="mood-gradient-text font-display font-extrabold text-4xl sm:text-[3.75rem] tracking-tight leading-none text-center"
        >
          MOODY FOODZ
        </h1>
        <p
          className="font-body text-[11px] mt-3 uppercase tracking-[0.22em] text-center"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Mood-based food discovery
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        className="glass-card rounded-2xl p-6 sm:p-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Mood */}
          <Field label="How are you feeling?" htmlFor="mood" delay={0.13}>
            <input
              id="mood"
              type="text"
              className={inputClass}
              placeholder="happy, stressed, romantic..."
              value={form.mood}
              onChange={(e) => update("mood", e.target.value)}
              required
              autoComplete="off"
            />
          </Field>

          {/* Address */}
          <Field label="Your location" htmlFor="address" delay={0.18}>
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

          {/* Dietary + Distance */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Field label="Dietary" htmlFor="dietary" delay={0.23}>
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

            <Field label="Travel time" htmlFor="distance" delay={0.28}>
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
          <Field label="Craving" htmlFor="cuisine" delay={0.33}>
            <input
              id="cuisine"
              type="text"
              className={inputClass}
              placeholder="Italian, sushi, comfort food..."
              value={form.cuisine}
              onChange={(e) => update("cuisine", e.target.value)}
              required
            />
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {CUISINE_PILLS.map((c) => {
                const selected =
                  form.cuisine.toLowerCase() === c.toLowerCase();
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => update("cuisine", c)}
                    className="cuisine-pill px-2.5 py-1 rounded font-body text-[11px] font-medium"
                    style={
                      selected
                        ? {
                            background: `${theme.primary}18`,
                            borderColor: theme.primary,
                            color: theme.primary,
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
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg px-4 py-3 font-body text-sm"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.22)",
                color: "#fca5a5",
              }}
            >
              {error.message || "Something went wrong. Please try again."}
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="submit-btn w-full py-4 rounded-xl font-display font-bold text-sm tracking-[0.12em] uppercase text-white mt-1"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.41 }}
            whileTap={!isLoading ? { scale: 0.985 } : {}}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2.5">
                <Spinner />
                Finding your match...
              </span>
            ) : (
              "Find My Perfect Meal"
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
        strokeWidth="3"
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
