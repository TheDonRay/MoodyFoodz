import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

import userPreferences from "./routes/getUserPref.route.js";
app.use("/api/v1/", userPreferences);

app.get("/", (req, res) => {
  res.json({ Server: "Welcome to MoodyFoodz" });
});

export default app;