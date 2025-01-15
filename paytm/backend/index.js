const express = require("express");
const cors=require("cors")
const app=express();
app.use(express.json());
app.use(cors());
const apiRouter = require("./routes");
app.use("/api/v1",apiRouter)
app.listen(3000);

