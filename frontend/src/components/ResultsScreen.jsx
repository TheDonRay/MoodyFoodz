import { motion } from "framer-motion";
import RestaurantCard from "./RestaurantCard";

export default function ResultsScreen({ data, originCoords, theme, onBack }) {
  const { recommendations = [] } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen py-12 sm:py-16 px-4 sm:px-6"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.header
          className="mb-10 sm:mb-12"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <p
            className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: theme.primary }}
          >
            Created by Rayat for Sera
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-none tracking-tight">
            Your
            <br />
            <span style={{ color: theme.primary }}>Perfect</span> Matches
          </h2>
          <p
            className="font-body text-sm mt-4"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            {recommendations.length} restaurant
            {recommendations.length !== 1 ? "s" : ""} curated for your vibe
          </p>
        </motion.header>

        {/* Results */}
        {recommendations.length > 0 ? (
          <div className="flex flex-col gap-4">
            {recommendations.map((r, i) => (
              <RestaurantCard
                key={r.placeId || i}
                restaurant={r}
                rank={i}
                originCoords={originCoords}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="font-display font-semibold text-lg text-white/40">
              No restaurants found nearby.
            </p>
            <p className="font-body text-sm text-white/25 mt-2">
              Try expanding your travel time or changing your cuisine preference.
            </p>
          </motion.div>
        )}

        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52 }}
          className="mt-8 w-full py-3.5 rounded-xl font-display font-semibold text-sm tracking-[0.1em] uppercase border transition-all duration-200"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.38)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.primary;
            e.currentTarget.style.color = theme.primary;
            e.currentTarget.style.background = `${theme.primary}0d`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "rgba(255,255,255,0.38)";
            e.currentTarget.style.background = "transparent";
          }}
          whileTap={{ scale: 0.99 }}
        >
          ← Try a Different Mood
        </motion.button>
      </div>
    </motion.div>
  );
}
