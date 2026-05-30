import express from "express";
const userPreferences = express.Router();

import { userPrefController } from "../controllers/getUserPref.controller.js";

userPreferences.post("/userPreferences", userPrefController);

export default userPreferences;
