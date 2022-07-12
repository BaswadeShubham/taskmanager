const express = require("express");
const router = new express.Router();
const Task = require("../models/TaskModel");
router.post("/tasks", async (req, resp) => {
  const task = new Task(req.body);
  try {
    await task.save();
    resp.status(201).send(task);
  } catch (error) {
    resp.status(400).send(error);
  }
});

router.get("/tasks", async (req, resp) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      resp.status(404).send();
    }
    resp.send(tasks);
  } catch (error) {
    resp.status(500).send(error);
  }
});
router.get("/tasks/:id", async (req, resp) => {
  const id = req.params.id;
  console.log(id);
  try {
    const task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return resp.status(404).send();
    }
    resp.send(task);
  } catch (error) {
    resp.status(500).send(error);
  }
});
router.delete("/tasks/:id", async (req, resp) => {
  const id = req.params.id;
  console.log(id);
  try {
    const task = await Task.findByIdAndDelete(id);
    console.log(task);
    if (!task) {
      return resp.status(404).send();
    }
    resp.send(task);
  } catch (error) {
    resp.status(500).send(error);
  }
});

router.patch("/tasks/:id", async (req, resp) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["description", "completed"];
  const isallowedValid = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isallowedValid) {
    return resp.status(404).send("Invalid Update Parameters");
  }
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return resp.status(404).send();
    }
    resp.status(200).send(task);
  } catch (error) {
    resp.status(500).send(error);
  }
});

module.exports = router;
