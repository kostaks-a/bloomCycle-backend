const isAuthenticated = require("../middlewares/isAuthenticated");
const Bicycle = require("../models/Bicycle.model");
const User = require("../models/User.model");
const router = require("express").Router();
const uploader = require("../utils/cloudinary");

// Get all bicycles
router.get("/allbicycles", isAuthenticated, async (req, res, next) => {
  console.log(req.payload.user._id);
  try {
    const findAllBicycles = await Bicycle.find({
      owner: { $ne: req.payload.user._id },
    });
    console.log(findAllBicycles);
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

//Create a bicycle
router.post(
  "/newbicycle",
  uploader.single("imageUrl"),
  isAuthenticated,
  async (req, res, next) => {
    console.log("file is: ", req.file);
    if (!req.file) {
      res.status(200).json({ message: "no image" });
    } else {
      const newBicycle = await Bicycle.create({
        ...req.body,
        image: req.file.path,
        owner: req.payload.user._id,
      });
      console.log(newBicycle);
      res.status(200).json(newBicycle);
    }
  }
);

//Update Bicycle
router.put(
  "/update/:bicycleId",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    try {
      const bicycleId = req.params.bicycleId;
      const updateBicycleDetails = { ...req.body, image: req.file.path };
      const updateBicycle = await Bicycle.findByIdAndUpdate(
        bicycleId,
        updateBicycleDetails,

        { new: true }
      );
      res.json(updateBicycle);
    } catch (error) {
      console.log("Error updating bicycle: ", error);
    }
  }
);

// router.put("/update/:bicycleId", async (req, res, next) => {
//   try {
//     const bicycleId = req.params.bicycleId;
//     const updateBicycleDetails = req.body;
//     const updateBicycle = await Bicycle.findByIdAndUpdate(
//       bicycleId,
//       updateBicycleDetails,
//       { new: true }
//     );
//     console.log("bike updated");
//     res.json(updateBicycle);
//   } catch (error) {
//     console.log("Error updating character: ", error);
//   }
// });

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

// Save Bike ad to User model

router.get("/:bikeId/save", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload.user._id;
    const bikeId = req.params.bikeId;
    console.log(bikeId);
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $push: { savedBikeAds: bikeId } },
      { new: true }
    );
    console.log(userUpdate);
    console.log(`Ad saved`);
  } catch (error) {
    console.log("Error saving ad: ", error);
  }
});

// Remove saved plant ad from User model

router.get("/:bikeId/remove", isAuthenticated, async (req, res) => {
  const userId = req.payload.user._id;
  const bikeId = req.params.bikeId;
  console.log(req.params.bikeId);
  console.log(req.payload.user._id);
  try {
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedBikeAds: bikeId } },
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
    const personalAds = await Bicycle.find({ owner: userId });
    console.log(personalAds);
    res.json(personalAds);
  } catch (error) {
    console.log("Error fetching personal bike ads: ", error);
  }
});

router.post("/savedAds/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  // console.log('owner:' + req.payload.user._id);
  try {
    const user = await User.findById(userId).populate("savedBikeAds");
    console.log(user);
    res.json(user.savedBikeAds);
  } catch (error) {
    console.log("Error fetching saved bike ads: ", error);
  }
});

module.exports = router;
