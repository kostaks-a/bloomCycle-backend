const Plant = require("../models/Plant.model");
const router = require("express").Router();


// Get all plants
router.get("/myplants", async (req, res, next) => {
    try {
      const findAllPlants = await Plant.find();
      res.json(findAllPlants);
    } catch (error) {
      console.log("Error fetching plants: ", error);
    }
  });
  
  // Get one plant
  router.get("/myplants/:plantId", async (req, res, next) => {
    try {
      const plant = await Plant.findById(req.params.plantId);
      res.json(plant);
    } catch (error) {
      console.log("Error fetching plant: ", error);
    }
  });
  
  // Create a Plant
  router.post("/myplants/newplant", async (req, res, next) => {
    try {
      const body = req.body;
      const newPlant = await Plant.create(body);
      res.json(newPlant);
    } catch (error) {
      console.log("Error creating a plant ", error);
    }
  });
  
  // Update Plant
  router.put("/myplants/update/:plantId", async (req, res, next) => {
    try {
      const plantId = req.params.plantId;
      const updatePlantDetails = req.body;
      const updatePlant = await Plant.findByIdAndUpdate(plantId, updatePlantDetails, { new: true });
      res.json(updatePlant);
    } catch (error) {
      console.log("Error updating plant: ", error);
    }
  });
  
  // Delete Plant
  router.delete("/myplants/delete/:plantId/", async (req, res, next) => {
    try {
      const plantId = req.params.plantId;
      const deletedPlant = await Plant.findByIdAndDelete(plantId);
      res.json(deletedPlant);
    } catch (error) {
      console.log("Error deleting a plant: ", error);
    }
  });

  module.exports = router;
