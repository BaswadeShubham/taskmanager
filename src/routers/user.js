const express = require("express");
const router = new express.Router();
const User = require("../models/UserModel");

router.post("/users", async (req, resp) => {
  const user = new User(req.body);
  try {
    await user.save();
    resp.status(201).send(user);
  } catch (error) {
    resp.status(400).send(error);
  }
});
router.get("/users", async (req, resp) => {
  try {
    const users = await User.find();
    if (!users) {
      return resp.status(404).send();
    }
    resp.send(users);
  } catch (error) {
    resp.status(500).send();
  }
});
router.get("/users/:id", async (req, resp) => {
  const id = req.params.id;

  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) {
      return resp.status(404).send();
    }
    resp.send(user);
  } catch (error) {
    resp.status(500).send(error);
  }
});
router.delete("/users/:id", async (req, resp) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return resp.status(404).send();
    }
    resp.send(user);
  } catch (error) {
    resp.status(500).send(error);
  }
});
router.patch("/users/:id", async (req, resp) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "age", "email", "password"];
  const isallowedValid = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isallowedValid) {
    return resp.status(404).send("Invalid Update Parameters");
  }
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return resp.status(404).send();
    }
    resp.status(200).send(user);
  } catch (error) {
    resp.status(500).send(error);
  }
});

module.exports = router;
