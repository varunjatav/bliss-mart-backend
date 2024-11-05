const { validationResult } = require("express-validator");
const userSchema = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  console.log("signUp", req.body);

  try {
    const { mobileNumber, email, firstName, lastName, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "Invalid",
        message: error.message,
      });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = userSchema({
      mobileNumber: mobileNumber,
      email: email,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      staus: "fail",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    console.log("login", req.body);
    const { email, password } = req.body;
    const error = validationResult(req);

    if (!error.isEmpty())
      return res.status(400).json({ status: "fail", message: error.array() });
    const existingUser = await userSchema.findOne({ email });
    console.log("user check in login", existingUser);

    if (!existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User does not exist please singup your account",
      });
    }

    const isPasswordValid = await bcrypt.compareSync(
      password,
      existingUser.password,
      (err, res) => {
        if (err) {
          console.log("error", err);
        } else {
          console.log(res);
        }
      }
    );
    console.log("validate password", isPasswordValid);

    if (!isPasswordValid)
      return res
        .status(400)
        .json({ status: "fail", message: "invalid password" });

    const token = jwt.sign({ userId: userSchema._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { userId: userSchema._id },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      status: "success",
      message: {
        token,
        refreshToken,
        userId: existingUser._id,
        userRole: existingUser.role,
      },
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const refreshToken = (req, res) => {
    const {refreshToken} = req.body;
    try {
        const payload = jwt.verify(refreshToken,process.env.REFRESH_JWT_SECRET);
        const newToken = jwt.sign({userId: payload.userId},process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.status(200).json({ token: newToken });
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired refresh token" });
    }
};

module.exports = { signUp, login ,refreshToken};
