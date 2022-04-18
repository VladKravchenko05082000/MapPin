const ROUTER = require("express").Router();
const USERS = require("../models/User");
const BCRYPT = require("bcrypt");

ROUTER.post("/register", async (req, res) => {
  try {
    //generate password
    const SALT = await BCRYPT.genSalt(10);
    const HASHPASSWORD = await BCRYPT.hash(req.body.password, SALT);

    //create new user
    const NEWUSER = new USERS({
      username: req.body.username,
      email: req.body.email,
      password: HASHPASSWORD,
    });

    //save user and send response
    const USER = await NEWUSER.save();
    res.status(200).json(USER._id); //it makes no sense to save the entire user, just his id is enough
  } catch (err) {
    res.status(500).json(err);
  }
});

ROUTER.post("/login", async (req, res) => {
  try {
    //find user and email
    const USER = await USERS.findOne({ username: req.body.username });
    const EMAIL = await USERS.findOne({ email: req.body.email });

    //validate password
    const VALIDATE_PASSWORD = await BCRYPT.compare(
      req.body.password,
      USER.password
    );

    if (!USER || !EMAIL || (!VALIDATE_PASSWORD && res.status(400))) {
      return res.status(400).json("Wrong username or email or password");
    } else {
      //send response
      return res.status(200).json({ _id: USER._id, username: USER.username });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = ROUTER;
