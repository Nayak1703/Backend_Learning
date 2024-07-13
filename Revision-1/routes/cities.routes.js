import express from "express";
const router = express.Router();

import { getCity, postCity } from "../controllers/cities.controllers.js"

router.get("/", getCity)
router.post("/", postCity)

export default router;