const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
    {
      Variety: {
        type: String,
        required: true,
      },
      Size: {
        type: String,
        required: true,
      },
      Age: {
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

const Plant = model("Plant", plantSchema);

module.exports = Plant;