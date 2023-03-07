const isAuthenticated = require("../middlewares/isAuthenticated");
const Plant = require("../models/Plant.model");
const User = require("../models/User.model");
const router = require("express").Router();

// Get all plants
router.get("/allplants", isAuthenticated , async (req, res, next) => {
    try {
      const findAllPlants = await Plant.find({ owner: {$ne:req.payload.user._id}}).populate('owner' , 'username');
      //console.log(findAllPlants);
      res.json(findAllPlants);
    } catch (error) {
      console.log("Error fetching plants: ", error);
    }
  });
  
  // Get one plant
  router.get("/:plantId", isAuthenticated, async (req, res, next) => {
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
      const newPlant = await Plant.create({...body, owner: req.payload.user._id})
      newPlant.populate('owner' , 'username');
      res.json(newPlant);
    } catch (error) {
      console.log("Error creating a plant ", error);
    }
  });
  
  // Update Plant
  router.put("/update/:plantId", isAuthenticated, async (req, res, next) => {
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
  router.get("/delete/:plantId", isAuthenticated, async (req, res, next) => {
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
    const user = await User.findById(userId)
    //console.log(user)
    console.log(user.savedPlantAds)
    if (!user.savedPlantAds.includes(plantId)) {
    const userUpdate = await User.findByIdAndUpdate(userId, { $push: { savedPlantAds : plantId } }, {new: true})
    console.log(userUpdate)
    console.log(`Ad saved`)
    res.json(`Ad saved successfully`)
    }else {
      console.log("Plant already saved")
      res.json("Plant already saved")
    }
   } catch (error) {
    console.log("Error saving ad: ", error);
   }
  })

// Remove saved plant ad

  router.get("/:plantId/remove", isAuthenticated , async (req, res) => {
    const userId = req.payload.user._id
    const plantId = req.params.plantId;
    console.log(req.params.plantId)
    console.log(req.payload.user._id)
    try {
      const userUpdate = await User.findByIdAndUpdate(userId, { $pull: { savedPlantAds : plantId } }, {new: true})
      console.log(userUpdate)   
      console.log(`Ad unsaved successfully`)
      res.json(`Ad unsaved successfully`);
    } catch (error) {
      console.log("Error unsaving ad: ", error);
    }})

// Get personal ads

    router.get("/personalAds/:userId" , async (req, res, next) => {
      const userId = req.params.userId;
     // console.log('owner:' + req.payload.user._id);
      try {
        const personalAds = await Plant.find({ owner: userId });
        //console.log(personalAds);
        res.json(personalAds);
      } catch (error) {
        console.log("Error fetching personal plant ads: ", error);
      }
      
    });

    router.get("/savedAds/:userId" , async (req, res, next) => {
      const userId = req.params.userId;
     // console.log('owner:' + req.payload.user._id);
      try {
        const user = await User.findById(userId).populate("savedPlantAds");
        //user.savedPlantAds.populate('owner' , 'username');
        //console.log(user);
        res.json(user.savedPlantAds);
      } catch (error) {
        console.log("Error fetching saved plant ads: ", error);
      }
      
    });

  module.exports = router;
