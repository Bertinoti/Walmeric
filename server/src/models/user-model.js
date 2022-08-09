const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "The username is required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    phone: {
      type: Number,
      required: [true, "The phone is required"],
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    quantityPayment: {
      type: Number,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel;
