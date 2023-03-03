const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
    {
      variety: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      age: {
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

const Plant = model("Plant", plantSchema);

module.exports = Plant;