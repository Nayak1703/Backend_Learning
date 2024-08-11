import express from "express";
const Router = express.Router();

import { getCities, addCity, getCityById, updateCityById } from "../controllers/cities.controllers.js"
import dataValidator from "../middlewares/cityValidator.middleware.js"
import searchCityById from "../middlewares/findCityById.middlerware.js"
import clientAuth from "../middlewares/clinetAuth.middleware.js";

Router.get("/", getCities);
Router.get("/:id", searchCityById, getCityById);
Router.put("/:id", clientAuth, dataValidator, searchCityById, updateCityById)
Router.post("/", clientAuth, dataValidator, addCity);


export default Router;