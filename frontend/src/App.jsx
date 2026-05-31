import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingFood from "./components/FloatingFood";
import EatingCharacter from "./components/EatingCharacter";
import MoodForm from "./components/MoodForm";
import ResultsScreen from "./components/ResultsScreen";
import LoadingScreen from "./components/LoadingScreen";
import { getMoodTheme } from "./lib/moodColors";
import { useRecommendations } from "./hooks/useRecommendations";

export default function App() {
  const [moodText, setMoodText] = useState("");
  const theme = getMoodTheme(moodText);
  const mutation = useRecommendations();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--mood-primary", theme.primary);
    root.style.setProperty("--mood-secondary", theme.secondary);
    root.style.setProperty("--mood-glow", theme.glow);
    root.style.setProperty("--mood-blob1", theme.blob1);
    root.style.setProperty("--mood-blob2", theme.blob2);
    root.style.setProperty("--mood-accent", theme.accent);
  }, [theme]);

  const handleSubmit = (formData) => mutation.mutate(formData);
  const handleBack = () => mutation.reset();
  const originCoords = mutation.data?.location ?? null;

  const screen = mutation.data
    ? "results"
    : mutation.isPending
      ? "loading"
      : "form";

  return (
    <div className="min-h-screen relative">
      {/* Mood-reactive background orbs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute -top-[25%] -left-[15%] w-[700px] h-[700px] rounded-full blur-[180px]"
          animate={{ background: theme.blob1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[15%] -right-[15%] w-[580px] h-[580px] rounded-full blur-[160px]"
          animate={{ background: theme.blob2 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Floating food emojis */}
      <FloatingFood />

      {/* Eating character */}
      <EatingCharacter />

      {/* Screen router */}
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
              className="flex items-start sm:items-center justify-center min-h-screen py-6 sm:py-10 px-4 sm:px-6"
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
