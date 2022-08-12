const { Op } = require("sequelize");
const { User } = require("../models");
const { sendError } = require("../response");

async function signup(req, res, next) {
  const { firstName, lastName, birthday, phone, uid, email } = req.body;
  try {
    const user = await User.findAll({
      where: {
        [Op.or]: [
          { email: email },
          { phone: phone }
        ]
      }
    });

    if (user.length > 0) {
      return res.status(209).json(sendError('This Email or Phone already exist'));
    }

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
  console.log('req', req.body);
  try {
    const { email } = req.body;
    const user = await User.findAll({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });
    console.log('user', user);
    console.log(user.length < 1 );
    if (user.length < 1) {
      return res.status(209).json(sendError("This user do Not exist"));
    } else {
      res.status(200).send({ data: user });
      next(res);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  signup,
  getCurrentUser
};
