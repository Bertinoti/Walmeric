const mongoose = require("mongoose");
const { User } = require("../models");

async function signup(req, res, next) {
  const { uid, email } = req.user;
  const { username, phone } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.sendStatus(200);
    }

    const newUser = await User.create({
      uid: uid,
      username: req.user.username || username,
      email: email,
      phone: phone,
    });

    res.status(201).send({ data: newUser });
  } catch (error) {
    next(error);
  }
}

async function checkPayment(req, res, next) {
  const { id, payment } = req.body;

  try {
    const foundUser = await User.findOne({ id: id });

    if (!foundUser) {
      res.status(404).send("No exist user");
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: id },
      { isPayment: payment },
      { new: true }
    );

    res.status(200).send(updateUser);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup: signup,
  checkPayment: checkPayment,
};
