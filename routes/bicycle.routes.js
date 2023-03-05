const isAuthenticated = require("../middlewares/isAuthenticated");
const Bicycle = require("../models/Bicycle.model");
const User = require("../models/User.model");
const router = require("express").Router();

// Get all bicycles
router.get("/allbicycles", async (req, res, next) => {
  try {
    const findAllBicycles = await Bicycle.find();
    res.json(findAllBicycles);
  } catch (error) {
    console.log("Error fetching all bicylces: ", error);
  }
});

// Get one plant
router.get("/:bicycleId", async (req, res, next) => {
  try {
    //console.log(req.params);
    const bicycle = await Bicycle.findById(req.params.bicycleId);
    res.json(bicycle);
  } catch (error) {
    console.log("Error fetching bicycle: ", error);
  }
});

// Create a bicycle
router.post("/newbicycle", isAuthenticated, async (req, res, next) => {
  console.log('owner:' + req.payload.user._id);
  try {
    const body = req.body
    const newBicycle = await Bicycle.create({...body, owner: req.payload.user._id});
    res.json(newBicycle);
  } catch (error) {
    console.log("Error creating a bicycle ", error);
  }
});

// Update Bicycle
router.put("/update/:bicycleId", async (req, res, next) => {
  try {
    const bicycleId = req.params.bicycleId;
    const updateBicycleDetails = req.body;
    const updateBicycle = await Bicycle.findByIdAndUpdate(
      bicycleId,
      updateBicycleDetails,
      { new: true }
    );
    console.log('bike updated')
    res.json(updateBicycle);
  } catch (error) {
    console.log("Error updating character: ", error);
  }
});

// Delete Plant
router.get("/delete/:bicycleId", async (req, res, next) => {
  try {
    const bicycleId = req.params.bicycleId;
    const deleteBicycle = await Bicycle.findByIdAndDelete(bicycleId);
    res.json(deleteBicycle);
  } catch (error) {
    console.log("Error deleting a bicycle: ", error);
  }
});

module.exports = router;
