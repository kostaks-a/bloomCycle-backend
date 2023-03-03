const { Schema, model } = require("mongoose");

const bicycleSchema = new Schema(
    {
      type: {
        type: String,
        enum: ["Road bike","Mountain bike","City bike","Electric bike","Gravel bike","Fixie","Other"],
        required: true,
        default: "Road bike"
      },
      size: {
        type: String,
        required: true,
      },
      condition: {
        type: String,
        required: true,
      },
      price: {
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

const Bicycle = model("Bicycle", bicycleSchema);

module.exports = Bicycle;