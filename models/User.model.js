const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    email: { 
      type: String, 
      unique: true, 
      required: [true, 'Email is required.'],
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    location: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      default: ''
    },  
    savedPlantAds: [{
      type: Schema.Types.ObjectId,
      ref: "Plant"
    }],
    savedBikeAds: [{
      type: Schema.Types.ObjectId,
      ref: "Bicycle"
    }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;