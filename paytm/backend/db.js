const mongoose=require("mongoose");
const { number } = require("zod");
const User = require("./routes/user");
mongoose.connect("mongodb+srv://admin:admin@cluster0.nq7jkly.mongodb.net/paytmapp");
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        minLength:3
    },
    firstname:String,
    lastname:String,
    password:String
})
const AccountSchema=new mongoose.Schema({
    userid:{type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    balance:Number
})

const Amountdb=mongoose.model("amount",AccountSchema);
const Userdb=mongoose.model("Users",UserSchema);
module.exports={
    Userdb,
    Amountdb
}