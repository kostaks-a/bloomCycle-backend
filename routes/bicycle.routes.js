const Bicycle = require("../models/Bicycle.model");
const router = require("express").Router();

// Get all bicycles
router.get("/mybicycles", async (req, res, next) => {
  try {
    const findAllBicycles = await Bicycle.find();
    res.json(findAllBicycles);
  } catch (error) {
    console.log("Error fetching all bicylces: ", error);
  }
});

// Get one plant
router.get("/mybicycles/:bicycleId", async (req, res, next) => {
  try {
    const bicycle = await Bicycle.findById(req.params.bicycleId);
    res.json(bicycle);
  } catch (error) {
    console.log("Error fetching bicycle: ", error);
  }
});

// Create a bicycle
router.post("/mybicycles/new", async (req, res, next) => {
  try {
    const body = req.body;
    const newBicycle = await Bicycle.create(body);
    res.json(newBicycle);
  } catch (error) {
    console.log("Error creating a bicycle ", error);
  }
});

// Update Bicycle
router.put("/mybicycles/update/:bicycleId", async (req, res, next) => {
  try {
    const bicycleId = req.params.bicycleId;
    const updateBicycleDetails = req.body;
    const updateBicycle = await Bicycle.findByIdAndUpdate(
      bicycleId,
      updateBicycleDetails,
      { new: true }
    );
    res.json(updateBicycle);
  } catch (error) {
    console.log("Error updating character: ", error);
  }
});

// Delete Plant
router.delete("/mybicycles/delete/:bicycleId/", async (req, res, next) => {
  try {
    const bicycleId = req.params.bicycleId;
    const deleteBicycle = await Bicycle.findByIdAndDelete(bicycleId);
    res.json(deleteBicycle);
  } catch (error) {
    console.log("Error deleting a bicycle: ", error);
  }
});

module.exports = router;
