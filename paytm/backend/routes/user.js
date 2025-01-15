const express=require("express");
const {Userdb,Amountdb}=require("../db")

const Zod=require("zod");
const jwt = require("jsonwebtoken");
const  JWT_SECRET  = require("../config");
const {authmiddleware}=require("../middleware")
 const Schema=Zod.object({
    username:Zod.string().email(),
    firstname:Zod.string(),
    lastname:Zod.string(),
    password:Zod.string().min(8)
 })
const User=express.Router();
User.post("/signup",async (req,res)=>{
    const username=req.body.username;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const password=req.body.password;
if(!Schema.safeParse(req.body).success){
 return res.json({message: "Email already taken / Incorrect inputs"})
}
const existingUser=await Userdb.findOne({username});
if(existingUser){
    return res.json({message: "Email already taken / Incorrect inputs"})
}
const user=await Userdb.create({
     username,
     firstname,
     lastname,
     password
})
const userid=user._id
const token=jwt.sign({userid},JWT_SECRET);
const userbalance=await Amountdb.create({
    userid:userid,
    balance:Math.ceil(Math.random()*10000)
})

res.json({
    message: "User created successfully",
    token: token
})

})
const signinBody = Zod.object({
    username: Zod.string().email(),
	password: Zod.string()
})
User.post("/signin",async function(req,res){
const username=req.body.username;
const password=req.body.password;
if(!signinBody.safeParse(req.body).success){
    return res.json({msg:"invalid inputs"})
}


const existingUser=await Userdb.findOne({username,password});
if(!existingUser){
    return res.status(411).json({
        message: "Error while logging in"
    })
}
else{
  const token=jwt.sign({userid:existingUser._id},JWT_SECRET)
    return res.status(200).json({token:token})
}
})

User.put("/",authmiddleware,async (req,res)=>{
    const newpass=req.body.password;
    const newFname=req.body.firstname;
    const newLname=req.body.lastname;
    const userid=req.userid;
    let flag=true;
if(newpass||newFname||newLname){
    const temp= await Userdb.findOne({_id:userid});
    if(temp.password&&temp.password!==newpass){
        flag=false;
       await Userdb.updateOne({
            _id:userid
        },
    {
        $set: { password:newpass} 
    })}

    if(temp.firstname&&temp.firstname!==newFname){
        flag=false;
        await Userdb.updateOne({
            _id:userid
        },
    {
        $set: { firstname:newFname} 
    })}
    if(temp.lastname&&temp.lastname!==newLname){
        flag=false;
       await Userdb.updateOne({
            _id:userid
        },
    {
        $set: {lastname:newLname} 
    })}
}
if(flag){
  return res.status(411).json({msg:"the inputs are same as before"})
}
else{
    return res.status(200).json({msg:"the inputs are updated"})
}
})

User.get("/bulk",async function(req,res){
const filter=req.query.filter||"";

const users= await Userdb.find({
    $or:[{
        firstname:{$regex:filter}
    },
{
    lastname:{$regex:filter}
}]
})
res.json({user:users.map((user)=>({username:user.username,firstname:user.firstname,lastname:user.lastname,_id:user._id}))})
})
module.exports=User;