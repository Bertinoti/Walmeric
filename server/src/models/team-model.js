const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
      unique: true,
    },
    captain: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "The captain is required"],
    },
    players: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    logo: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    costs: [
      {
        type: Object,
        contains: {
          title: String,
          description: String,
          price: Number,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const TeamModel = new mongoose.model("team", TeamSchema);

module.exports = TeamModel;
