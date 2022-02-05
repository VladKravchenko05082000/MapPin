const ROUTER = require("express").Router();
const PIN = require("../models/Pin");

//create pin

ROUTER.post('/',  async(req, res)=>{
   const NEWPIN = new PIN(req.body);
   try{
      const SAVEPIN = await NEWPIN.save();
      res.status(200).json(SAVEPIN);
   }catch(err){
      res.status(500).json(err)
   };
});

//get all pin

ROUTER.get('/', async(req, res)=>{
   try{
      const PINS = await PIN.find();
      res.status(200).json(PINS);
   }catch(err){
      res.status(500).json(err);
   };
});

module.exports = ROUTER;