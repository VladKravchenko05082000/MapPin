const ROUTER = require("express").Router();
const PIN = require("../models/Pin");

//create pin

ROUTER.post("/", async (req, res) => {
  const NEWPIN = new PIN(req.body);
  try {
    const SAVEPIN = await NEWPIN.save();
    res.status(200).json(SAVEPIN);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all pin

ROUTER.get("/", async (req, res) => {
  try {
    const PINS = await PIN.find();
    res.status(200).json(PINS);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete pin

ROUTER.delete("/delete/", async (req, res) => {
  try {
    const DELETEPIN = await PIN.findOne({ _id: req.body._id });
    if (!DELETEPIN) {
      return res.status(400).json({ message: "Pin not found" });
    }
    await DELETEPIN.remove();
    res.status(200).json(DELETEPIN);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = ROUTER;
