const express=require("express");
const UserRouter = require("./user");
const AccountRouter=require("./account")
const apiRouter=express.Router();

apiRouter.use("/user",UserRouter)
apiRouter.use("/account",AccountRouter)
module.exports=apiRouter;