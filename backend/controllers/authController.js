import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "all three fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password:hashedPassword,
    });

    return res.status(201).json({
      message: "user created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const loginUser = async(req ,res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        message:"all fields are required"
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if(!user){
      return res.status(400).json({
        message:"Invalid email or password"
      });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({
        message:"Invalid email or password"
      });
    }
    
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
