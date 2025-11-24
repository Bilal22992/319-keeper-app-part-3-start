import express from "express";
import cors from "cors";

import fs from "fs";


const app = express();



app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
const file = fs.readFileSync("data.json");
let data = JSON.parse(file);
res.send(data);

});

app.post("/",(req,res)=>{
    const newdata=req.body;
  const file=  fs.readFileSync("data.json");
  let data =[];
  data=JSON.parse(file);
  data.push(newdata);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

res.json({result:"success",data:newdata});
    
})


app.listen("5000",()=>{
    console.log("App successfully running");
})