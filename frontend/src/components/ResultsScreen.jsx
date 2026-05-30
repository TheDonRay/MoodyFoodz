import { motion } from "framer-motion";
import RestaurantCard from "./RestaurantCard";

export default function ResultsScreen({ data, originCoords, theme, onBack }) {
  const { recommendations = [] } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen py-14 px-5"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p
            className="font-body text-xs uppercase tracking-widest mb-3"
            style={{ color: theme.primary, opacity: 0.8 }}
          >
            Created by Rayat for Sera
          </p>
          <h2 className="font-display font-extrabold text-4xl text-white leading-tight">
            Your <span style={{ color: theme.primary }}>Perfect</span> Matches
          </h2>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            {recommendations.length} restaurant
            {recommendations.length !== 1 ? "s" : ""} picked just for your vibe
          </p>
        </motion.div>

        {/* Results */}
        {recommendations.length > 0 ? (
          <div className="flex flex-col gap-5">
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
            className="text-center py-20"
          >
            <div className="text-5xl mb-5">🍽️</div>
            <p className="font-display font-semibold text-lg text-white/50">
              No restaurants found nearby.
            </p>
            <p className="font-body text-sm text-white/30 mt-2">
              Try expanding your travel time or changing your cuisine
              preference.
            </p>
          </motion.div>
        )}

        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-10 w-full py-3.5 rounded-xl border font-display font-semibold tracking-wide transition-all duration-200"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.45)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.primary;
            e.currentTarget.style.color = theme.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "rgba(255,255,255,0.45)";
          }}
          whileTap={{ scale: 0.98 }}
        >
          ← Try a Different Mood
        </motion.button>
      </div>
    </motion.div>
  );
}
