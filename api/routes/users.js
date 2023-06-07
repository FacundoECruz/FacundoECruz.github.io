import express from "express";
import User from "../models/User.js";
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

router.get("/search", async (req, res) => {
  const query = req.body
  res.send(query)
  // User.find({ username: { $regex: query, $options: 'i' } })
  //   .then((users) => {
  //     res.json(users);
  //   })
  //   .catch((error) => {
  //     console.error('Error al buscar partidas:', error);
  //     res.status(500).json({ error: 'Error al buscar partidas' });
  //   });
});

export { router };
