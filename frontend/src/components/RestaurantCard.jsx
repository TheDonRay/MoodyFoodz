import { motion } from "framer-motion";

const RANK_LABELS = ["", "2nd", "3rd", "4th", "5th"];

export default function RestaurantCard({
  restaurant,
  rank,
  originCoords,
  theme,
}) {
  const mapsUrl = originCoords
    ? `https://www.google.com/maps/dir/?api=1&origin=${originCoords.lat},${originCoords.lng}&destination=${encodeURIComponent(restaurant.address)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + " " + restaurant.address)}`;

  const isOpen = restaurant.openNow;
  const openStatus =
    isOpen === true
      ? "Open now"
      : isOpen === false
        ? "Closed"
        : "Hours unknown";

  const openColor =
    isOpen === true
      ? { bg: "rgba(52,211,153,0.15)", text: "#34d399", dot: "#34d399" }
      : isOpen === false
        ? { bg: "rgba(248,113,113,0.15)", text: "#f87171", dot: "#f87171" }
        : {
            bg: "rgba(255,255,255,0.08)",
            text: "rgba(255,255,255,0.4)",
            dot: "rgba(255,255,255,0.3)",
          };

  return (
    <motion.article
      className="restaurant-card rounded-2xl p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: rank * 0.09,
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      {/* Header: rank badge + name */}
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display font-extrabold text-sm"
          style={{ background: theme.primary, color: "#07080f" }}
        >
          {rank === 0 ? "★" : rank + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-white text-base leading-snug truncate">
            {restaurant.name}
          </h3>
          <p
            className="font-body text-xs mt-0.5 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            {restaurant.address}
          </p>
        </div>
      </div>

      {/* Rating + Open status */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {restaurant.rating && restaurant.rating !== "N/A" && (
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <span style={{ color: "#fbbf24" }}>★</span>
            <span className="font-body text-xs font-medium text-white/70">
              {restaurant.rating}
            </span>
          </div>
        )}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: openColor.bg }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: openColor.dot }}
          />
          <span className="font-body text-xs" style={{ color: openColor.text }}>
            {openStatus}
          </span>
        </div>
      </div>

      {/* Claude's recommendation reason */}
      {restaurant.reason && (
        <blockquote
          className="font-body text-sm leading-relaxed italic pl-3 border-l-2"
          style={{
            color: "rgba(255,255,255,0.52)",
            borderColor: theme.primary + "60",
          }}
        >
          "{restaurant.reason}"
        </blockquote>
      )}

      {/* Take Me Here CTA */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="maps-btn mt-auto block text-center py-2.5 px-4 rounded-xl font-display font-semibold text-sm tracking-wide text-white"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
        }}
        aria-label={`Get directions to ${restaurant.name}`}
      >
        📍 Take Me Here
      </a>
    </motion.article>
  );
}
