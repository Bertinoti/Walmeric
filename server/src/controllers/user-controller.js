const { User } = require("../models");

async function signup(req, res, next) {
  const { firstName, lastName, birthday, phone, uid, email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.sendStatus(200);
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
    next(error);
  }
}

async function getCurrentUser(req, res, next) {
  console.log(req.body)
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.sendStatus(400).send("This user do Not exist");
    }
    res.status(200).send({ data: user });
  } catch (error) {
    console.log(error)
    next(error);
  }
}

module.exports = {
  signup,
  getCurrentUser
};
