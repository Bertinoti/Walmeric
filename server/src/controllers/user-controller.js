const { Op } = require("sequelize");
const { User } = require("../models");
const { sendError } = require("../response");

async function signup(req, res, next) {
  try {
    const { firstName, lastName, birthday, phone, uid, email } = req.body;
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      email: email,
      uid: uid,
      phone: phone
    });

    res.status(201).send({ data: newUser });
  } catch (error) {
    return (error);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email: email }
    });
    if (!user) {
      return res.status(209).json(sendError("This user do Not exist"));
    } else {
      res.status(200).send({ data: user });
      next(res);
    }
  } catch (error) {
    console.log("este es um error", error);
  }
}

async function checkUserApi(req, res) {
  try {
    const { email, phoneNumber } = req.body;
    const user = await User.findAll({
      where: {
        [Op.or]: [
          { email: email },
          { phone: phoneNumber }
        ]
      }
    });
    res.send(user);
  }
  catch (error) {
    return error
  }
}

module.exports = {
  signup,
  getCurrentUser,
  checkUserApi
};
