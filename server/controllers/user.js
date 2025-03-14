import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/user.js";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function SignIn(req, res) {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exit" });
    }

    const isPasswordCorrent = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrent) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
  }
}

export async function SignUp(req, res) {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ meaasge: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
}
