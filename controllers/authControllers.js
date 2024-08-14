const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUsers = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // fill all the details
    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    // if user already exist in db
    let user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // new user creating and hiding password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createNewUser = new UserModel({
      name,
      username,
      password: hashedPassword,
    });

    await createNewUser.save();

    const token = jwt.sign(
      { userId: createNewUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      newUser: createNewUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const loginUsers = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check user have fill all the details
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    // if user already exist or not.
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    // checking if password is matched or not
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    delete user.password;

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // successfully loggedin
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.username}`,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something is wrong with backend");
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.header("Authorization");
  } catch (error) {}
};

module.exports = { registerUsers, loginUsers };
