const ROUTER = require("express").Router();
const USERS = require("../models/User");
const BCRYPT = require("bcrypt");

ROUTER.post("/register", async(req,res)=>{
   try{
      //generate password
      const SALT = await BCRYPT.genSalt(10);
      const HASHPASSWORD = await BCRYPT.hash(req.body.password, SALT);

      //create new user
      const NEWUSER = new USERS({
         username:req.body.username,
         email:req.body.email,
         password:HASHPASSWORD
      });

      //save user and send response
      const USER = await NEWUSER.save();
      res.status(200).json(USER._id);//it makes no sense to save the entire user, just his id is enough
      
   }catch(err){
      res.status(500).json(err);
   }
})


module.exports = ROUTER;