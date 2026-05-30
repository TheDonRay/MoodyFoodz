import { useMutation } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

const fetchRecommendations = async (formData) => {
  const response = await fetch(`${API_BASE}/api/v1/userPreferences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userMood: formData.mood,
      userCurrentAddress: formData.address,
      distance: Number(formData.distance),
      dietary: formData.dietary,
      cuisinePreference: formData.cuisine,
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${response.status})`);
  }

  return response.json();
};

export const useRecommendations = () =>
  useMutation({ mutationFn: fetchRecommendations });
