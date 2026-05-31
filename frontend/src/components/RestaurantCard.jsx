import { motion } from "framer-motion";

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
    isOpen === true ? "Open" : isOpen === false ? "Closed" : "Hours unknown";
  const openColor =
    isOpen === true
      ? "#34d399"
      : isOpen === false
        ? "#f87171"
        : "rgba(255,255,255,0.28)";

  const rankLabel = String(rank + 1).padStart(2, "0");

  return (
    <motion.article
      className="restaurant-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: rank * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2 }}
    >
      {/* Header: rank + name */}
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 font-display font-extrabold leading-none select-none"
          style={{
            fontSize: rank === 0 ? "2.6rem" : "1.4rem",
            color:
              rank === 0 ? theme.primary : "rgba(255,255,255,0.12)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {rankLabel}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-display font-bold text-white text-base sm:text-lg leading-tight">
            {restaurant.name}
          </h3>
          <p
            className="font-body text-xs mt-1 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {restaurant.address}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
      />

      {/* Rating + open status */}
      <div className="flex items-center gap-4 flex-wrap">
        {restaurant.rating && restaurant.rating !== "N/A" && (
          <div className="flex items-center gap-1.5">
            <span style={{ color: "#fbbf24", fontSize: "11px" }}>★</span>
            <span
              className="font-body text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {restaurant.rating}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: openColor }}
          />
          <span
            className="font-body text-xs"
            style={{ color: openColor }}
          >
            {openStatus}
          </span>
        </div>
      </div>

      {/* Reason */}
      {restaurant.reason && (
        <blockquote
          className="font-body text-sm leading-relaxed italic pl-4 border-l"
          style={{
            color: "rgba(255,255,255,0.42)",
            borderColor: `${theme.primary}45`,
          }}
        >
          {restaurant.reason}
        </blockquote>
      )}

      {/* Directions CTA */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="maps-btn block text-center py-2.5 px-4 rounded-lg font-display font-semibold text-sm tracking-[0.1em] uppercase border"
        style={{
          borderColor: `${theme.primary}45`,
          color: theme.primary,
          background: "transparent",
        }}
        aria-label={`Get directions to ${restaurant.name}`}
      >
        Get Directions →
      </a>
    </motion.article>
  );
}
