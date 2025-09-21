import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    //hash the password
    const bcryptPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcryptPassword,
    });

    await user.save(); // register user in db
    res.status(201).json({
      message: "user saved",
    });
  } catch (err) {
    res.status(500).json({
      message: "user was not saved",
    });
  }
};

export const loginUser = async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (user != null) {
      //compare the db hashed password and user entered hashed password
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) {
        const userData = {
          userId: user._id,
          name: user.name,
          email: user.email,
        };

        //generate jwt token
        const token = jwt.sign(userData, process.env.JWT_KEY, {
          expiresIn: "1h",
        });

        res.json({
          message: "Login successfull",
          token: token,
        });
      } else {
        res.status(403).json({
          message: "Invalid password",
        });
      }
    } else {
      res.status(403).json({
        message: "Invalid email",
      });
    }
  } catch (err) {
    res.status(403).json({
      message: "User cannot login try again",
    });
  }
};
