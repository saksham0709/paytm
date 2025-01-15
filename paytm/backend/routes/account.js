const express=require("express");
const mongoose=require("mongoose")
const {Userdb,Amountdb}=require("../db");
const { authmiddleware } = require("../middleware");
const Router=express.Router();

Router.get("/balance",authmiddleware,async (req,res)=>{
    const user=await Amountdb.findOne({
        userid:req.userid
    })

    res.json({Balance:user.balance})
})

Router.post("/transfer",authmiddleware,async (req,res)=>{
    const session=await mongoose.startSession();
session.startTransaction();
const {amount,to}=req.body;
const account=await Amountdb.findOne({userid:req.userid}).session(session);

if(!account||account.balance<amount){
    await session.abortTransaction();
    return res.json({msg:"Insufficient balance"})
}
const toAccount =await Amountdb.findOne({userid:to}).session(session);

if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
        message: "Invalid account"
    });
}
 await Amountdb.updateOne({userid:req.userid},{$inc:{balance:-amount}}).session(session);
 await Amountdb.updateOne({userid:to},{$inc:{balance:amount}}).session(session);

 await session.commitTransaction();
 res.json({
    msg:"transfer successfull"
 })
})


module.exports=Router;