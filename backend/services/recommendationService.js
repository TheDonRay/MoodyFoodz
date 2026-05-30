import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHKEY });
const GOOGLE_API_KEY = process.env.GOOGLEAPI;

const geocodeAddress = async (address) => {
  const params = new URLSearchParams({ address, key: GOOGLE_API_KEY });
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${params}`,
  );
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error(`Geocoding failed: ${data.status}`);
  }

  return data.results[0].geometry.location;
};

const searchRestaurants = async ({
  lat,
  lng,
  cuisinePreference,
  dietary,
  distance,
}) => {
  // Convert travel time (minutes) to meters (rough estimate: 1 min ~ 800m driving)
  const radiusMeters = distance * 800;

  const params = new URLSearchParams({
    location: `${lat},${lng}`,
    radius: Math.min(radiusMeters, 50000), // Google max is 50,000m
    type: "restaurant",
    keyword: `${cuisinePreference} ${dietary}`,
    key: GOOGLE_API_KEY,
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`,
  );
  const data = await response.json();

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(`Places search failed: ${data.status}`);
  }

  // Return top 10 results with relevant fields
  return data.results.slice(0, 10).map((place) => ({
    placeId: place.place_id,
    name: place.name,
    address: place.vicinity,
    rating: place.rating ?? "N/A",
    totalRatings: place.user_ratings_total ?? 0,
    priceLevel: place.price_level ?? "N/A",
    openNow: place.opening_hours?.open_now ?? null,
    location: place.geometry.location,
  }));
};

const rankWithClaude = async ({
  restaurants,
  userMood,
  cuisinePreference,
  dietary,
}) => {
  const prompt = `You are a food recommendation assistant. A user is feeling: "${userMood}".
They want ${cuisinePreference} food and their dietary preference is ${dietary}.
 
Here are nearby restaurants:
${JSON.stringify(restaurants, null, 2)}
 
Rank the top 5 restaurants that best match the user's mood and preferences.
For each, explain in 1-2 sentences why it's a good fit.
Return a JSON array with this structure:
[
  {
    "placeId": "...",
    "name": "...",
    "address": "...",
    "rating": ...,
    "openNow": ...,
    "reason": "Why this fits the user's mood"
  }
]
Return only the JSON array, no extra text.`;

  const message = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0].text;

  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Claude returned invalid JSON");
  }
};

export const getRecommendations = async ({
  userMood,
  userCurrentAddress,
  distance,
  dietary,
  cuisinePreference,
}) => {
  const { lat, lng } = await geocodeAddress(userCurrentAddress);
  const restaurants = await searchRestaurants({
    lat,
    lng,
    cuisinePreference,
    dietary,
    distance,
  });

  if (restaurants.length === 0) {
    return {
      recommendations: [],
      message: "No restaurants found in your area.",
    };
  }

  const recommendations = await rankWithClaude({
    restaurants,
    userMood,
    cuisinePreference,
    dietary,
  });

  return { recommendations, location: { lat, lng } };
};
