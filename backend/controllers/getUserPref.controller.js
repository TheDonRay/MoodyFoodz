//import the services call here as such
import { getRecommendations } from "../services/recommendationService.js";

const VALID_DIETARY = ["halal", "non halal", "kosher"];

export const userPrefController = async (req, res) => {
  const { userMood, userCurrentAddress, distance, dietary, cuisinePreference } =
    req.body;

  const missing = [];
  if (!userMood) missing.push("userMood");
  if (!userCurrentAddress) missing.push("userCurrentAddress");
  if (distance === undefined || distance === null) missing.push("distance");
  if (!dietary) missing.push("dietary");
  if (!cuisinePreference) missing.push("cuisinePreference");

  if (missing.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missing,
    });
  }

  if (typeof userMood !== "string" || userMood.trim() === "") {
    return res
      .status(400)
      .json({ error: "userMood must be a non-empty string" });
  }

  if (
    typeof userCurrentAddress !== "string" ||
    userCurrentAddress.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "userCurrentAddress must be a non-empty string" });
  }

  if (typeof distance !== "number" || distance <= 0) {
    return res
      .status(400)
      .json({ error: "distance must be a positive number (in minutes)" });
  }

  if (!VALID_DIETARY.includes(dietary.toLowerCase())) {
    return res.status(400).json({
      error: `dietary must be one of: ${VALID_DIETARY.join(", ")}`,
    });
  }

  if (
    typeof cuisinePreference !== "string" ||
    cuisinePreference.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "cuisinePreference must be a non-empty string" });
  }

  const results = await getRecommendations({
    userMood,
    userCurrentAddress,
    distance,
    dietary: dietary.toLowerCase(),
    cuisinePreference,
  });

  return res.status(200).json(results);
};
