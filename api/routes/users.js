import express from "express";
import User from "../models/User.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).redirect("/");
  } catch (err) {
    res.status(400).json(err.message);
  }
}); 

router.patch("/:id", async(req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true, 
  });
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(updatedUser);
})

router.delete("/:id", async(req, res) => {
  const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Successful deleted' });
})

export { router };
