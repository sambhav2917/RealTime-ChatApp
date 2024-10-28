import User from "../models/user.model.js";
import bcrypt from "bcrypt";

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

    const salt = await bcrypt.genSalt(10); // Asynchronous salt generation
    const hash = await bcrypt.hash(password, salt); // Asynchronous hashing

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    // Exclude sensitive data like password in the response
    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(201).json({ message: "User created successfully", user: userResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
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

      // Exclude sensitive data like password in the response
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      return res.status(200).json({ message: "User logged in successfully", user: userResponse });
      

    } catch (error) {
      
    }

};

export { register, login };
