const isAuthenticated = require("../middlewares/isAuthenticated");
const Plant = require("../models/Plant.model");
const User = require("../models/User.model");
const router = require("express").Router();


// Get all plants
router.get("/allplants", async (req, res, next) => {
    try {
      const findAllPlants = await Plant.find();
      res.json(findAllPlants);
    } catch (error) {
      console.log("Error fetching plants: ", error);
    }
  });
  
  // Get one plant
  router.get("/:plantId", async (req, res, next) => {
    try {
      const plant = await Plant.findById(req.params.plantId);
      res.json(plant);
    } catch (error) {
      console.log("Error fetching plant: ", error);
    }
  });
  
  // Create a Plant
  router.post("/newplant", isAuthenticated , async (req, res, next) => {
    try {
      const body = req.body;
      const newPlant = await Plant.create({...body, owner: req.payload.user._id});
      res.json(newPlant);
    } catch (error) {
      console.log("Error creating a plant ", error);
    }
  });
  
  // Update Plant
  router.put("/update/:plantId", async (req, res, next) => {
    console.log(req.params.plantId);
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
  router.get("/delete/:plantId", async (req, res, next) => {
    try {
      const plantId = req.params.plantId;
      const deletedPlant = await Plant.findByIdAndDelete(plantId);
      res.json(deletedPlant);
    } catch (error) {
      console.log("Error deleting a plant: ", error);
    }
  });

// Save Plant ad

  router.get('/:plantId/save', isAuthenticated , async (req, res) => {
   try {
    const userId = req.payload.user._id
    const plantId = req.params.plantId
    console.log(plantId)
    const userUpdate = await User.findByIdAndUpdate(userId, { $push: { savedPlantAds : plantId } }, {new: true})
    console.log(userUpdate)
    console.log(`Ad saved`)
   } catch (error) {
    console.log("Error saving ad: ", error);
   }
  })


  router.get("/:plantId/remove", isAuthenticated , async (req, res) => {
    const userId = req.payload.user._id
    const plantId = req.params.plantId;
    console.log(req.params.plantId)
    console.log(req.payload.user._id)
    try {
      const userUpdate = await User.findByIdAndUpdate(userId, { $pull: { savedPlantAds : plantId } }, {new: true})
      console.log(userUpdate)
      console.log(`Ad saved`)
    } catch (error) {console.log(error)}})

  module.exports = router;
