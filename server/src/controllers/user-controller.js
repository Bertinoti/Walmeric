const  {User}  = require("../models");

async function signup(req, res, next) {

  console.log(req.body)
  console.log(req.user)
  const { uid, email } = req.user;
  const { firstName, lastName, birthday, phoneNumber } = req.body;
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
      phone: phoneNumber
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
