import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in the environment variables.");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(201).json({ message: "User created successfully", user: userResponse });
  } catch (error) {
    console.error("Error in register function:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).json({ message: "User logged in successfully", user: userResponse });
  } catch (error) {
    console.error("Error in login function:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );

    return res.status(200).json(
      {
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      }
    )
  } catch (error) {
    console.error("Error in setAvatar function:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }


}

const allUsers = async (req, res) => {
  try {
    
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in allUsers function:", error.message);
    res.status(500).json({ message: "Internal server error" });
  } 
}


export { register, login,setAvatar,allUsers };
