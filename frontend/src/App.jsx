import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingFood from "./components/FloatingFood";
import MoodForm from "./components/MoodForm";
import ResultsScreen from "./components/ResultsScreen";
import LoadingScreen from "./components/LoadingScreen";
import { getMoodTheme } from "./lib/moodColors";
import { useRecommendations } from "./hooks/useRecommendations";

export default function App() {
  const [moodText, setMoodText] = useState("");
  const theme = getMoodTheme(moodText);
  const mutation = useRecommendations();

  // Push mood-reactive CSS variables to :root on every theme change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--mood-primary", theme.primary);
    root.style.setProperty("--mood-secondary", theme.secondary);
    root.style.setProperty("--mood-glow", theme.glow);
    root.style.setProperty("--mood-blob1", theme.blob1);
    root.style.setProperty("--mood-blob2", theme.blob2);
    root.style.setProperty("--mood-accent", theme.accent);
  }, [theme]);

  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };

  const handleBack = () => {
    mutation.reset();
  };

  const originCoords = mutation.data?.location ?? null;

  // Determine which screen to show
  const screen = mutation.data
    ? "results"
    : mutation.isPending
      ? "loading"
      : "form";

  return (
    <div className="min-h-screen relative">
      {/* ── Mood-reactive background blobs ── */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full blur-[130px]"
          animate={{ background: theme.blob1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[5%] w-[420px] h-[420px] rounded-full blur-[110px]"
          animate={{ background: theme.blob2 }}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.div
          className="absolute top-[55%] left-[55%] w-[300px] h-[300px] rounded-full blur-[90px]"
          animate={{ background: theme.blob1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
        />
      </div>

      {/* ── Floating food emojis ── */}
      <FloatingFood />

      {/* ── Screen router with Framer Motion transitions ── */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {screen === "results" && (
            <motion.div key="results">
              <ResultsScreen
                data={mutation.data}
                originCoords={originCoords}
                theme={theme}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {screen === "loading" && (
            <motion.div key="loading">
              <LoadingScreen theme={theme} />
            </motion.div>
          )}

          {screen === "form" && (
            <motion.div
              key="form"
              className="flex items-center justify-center min-h-screen py-10 px-5"
            >
              <MoodForm
                onMoodChange={setMoodText}
                onSubmit={handleSubmit}
                isLoading={false}
                error={mutation.error}
                theme={theme}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
