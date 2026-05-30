import express from "express";
import cors from "cors";
const app = express();

// middleware
app.use(cors({ origin: "https://moodyfoodz.pages.dev" }));
app.use(express.json());

// import any routes here as such
import userPreferences from "./routes/getUserPref.route.js";

//instantiate routes
app.use("/api/v1/", userPreferences);

app.get("/", (req, res) => {
  res.json({
    Server: "Welcome to MoodyFoodz",
  });
});

export default app;
