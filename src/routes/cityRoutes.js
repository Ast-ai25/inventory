const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

router.post("/", cityController.createCity);
router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCityById);
router.get("/state/:state_id", cityController.getCitiesByState);
router.get("/country/:country_id", cityController.getCitiesByCountry);
router.put("/:id", cityController.updateCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;
