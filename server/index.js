const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PINROUTES = require("./routes/pins");
const USERSROUTES = require("./routes/users");

dotenv.config();

const APPLICATION = express();

APPLICATION.use(express.json());
APPLICATION.use("/api/pins", PINROUTES);
APPLICATION.use("/api/users", USERSROUTES);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => console.log("Database Connect"))
  .catch((err) => console.log(err));

APPLICATION.listen(8800, () => {
  console.log("Back start");
});
