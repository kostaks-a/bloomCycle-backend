const isAuthenticated = require("../middlewares/isAuthenticated");
const Plant = require("../models/Plant.model");
const User = require("../models/User.model");
const router = require("express").Router();
const uploader = require("../utils/cloudinary");

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

router.post(
  "/newplant",
  uploader.single("imageUrl"),
  isAuthenticated,
  async (req, res, next) => {
    console.log("file is: ", req.file);
    if (!req.file) {
      res.status(200).json({ message: "no image" });
    } else {
      const newPlant = await Plant.create({
        ...req.body,
        image: req.file.path,
        owner: req.payload.user._id,
      });
      console.log(newPlant);
      res.status(200).json(newPlant);
    }
  }
);

// Update Plant
router.put(
  "/update/:plantId",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    try {
      const plantId = req.params.plantId;
      const updatePlantDetails = { ...req.body, image: req.file.path };
      const updatePlant = await Plant.findByIdAndUpdate(
        plantId,
        updatePlantDetails,

        { new: true }
      );
      res.json(updatePlant);
    } catch (error) {
      console.log("Error updating plant: ", error);
    }
  }
);

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

router.get("/:plantId/save", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload.user._id;
    const plantId = req.params.plantId;
    console.log(plantId);
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $push: { savedPlantAds: plantId } },
      { new: true }
    );
    console.log(userUpdate);
    console.log(`Ad saved`);
  } catch (error) {
    console.log("Error saving ad: ", error);
  }
});

// Remove saved plant ad

router.get("/:plantId/remove", isAuthenticated, async (req, res) => {
  const userId = req.payload.user._id;
  const plantId = req.params.plantId;
  console.log(req.params.plantId);
  console.log(req.payload.user._id);
  try {
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedPlantAds: plantId } },
      { new: true }
    );
    console.log(userUpdate);
    console.log(`Ad unsaved successfully`);
  } catch (error) {
    console.log("Error unsaving ad: ", error);
  }
});

// Get personal ads

router.post("/personalAds/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  // console.log('owner:' + req.payload.user._id);
  try {
    const personalAds = await Plant.find({ owner: userId });
    console.log(personalAds);
    res.json(personalAds);
  } catch (error) {
    console.log("Error fetching personal plant ads: ", error);
  }
});

router.post("/savedAds/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  // console.log('owner:' + req.payload.user._id);
  try {
    const user = await User.findById(userId).populate("savedPlantAds");
    console.log(user);
    res.json(user.savedPlantAds);
  } catch (error) {
    console.log("Error fetching saved plant ads: ", error);
  }
});

module.exports = router;
