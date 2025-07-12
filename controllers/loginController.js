const USERS = require("../models/usersModel");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const emailExist = await USERS.findOne({
      $or: [{ email: email || null }, { username: username || null }],
    });
    if (emailExist) {
      return res
        .status(400)
        .json({ message: "Username or Email Already Exist" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new USERS({
      username,
      email,
      password: hashedPassword,
    });
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }
    if (password.length > 12) {
      return res
        .status(400)
        .json({ message: "password must not be more than 12 characters" });
    }
    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USERS.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "No User Found Please Register" });
    }
    const isPassCoreect = await bcrypt.compare(password, user.password);
    if (!isPassCoreect) {
      res.status(401).json({ message: "Invalid or Incorrect Password" });
    }
    return res.status(200).json({
      success: true,
      message: "Welcome",
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, userLogin };
