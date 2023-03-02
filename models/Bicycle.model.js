const { Schema, model } = require("mongoose");

const bikeSchema = new Schema(
    {
      Type: {
        type: String,
        enum: ["Road bike","Mountain bike","City bike","Electric bike","Gravel bike","Fixie","Other"],
        required: true,
        default: "Road bike"
      },
      Size: {
        type: String,
        required: true,
      },
      Condition: {
        type: String,
        required: true,
      },
      Price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      image: {
          type: String,
          default: ''
      },  
    },
    {
      timestamps: true
    }
  );

const Bike = model("Bike", bikeSchema);

module.exports = Bike;