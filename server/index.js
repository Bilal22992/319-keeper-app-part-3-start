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


app.delete("/:id",(req,res)=>{
    const id = Number(req.params.id);
    const file = fs.readFileSync("data.json");
    const data = JSON.parse(file);
    const filtered = data.filter(item => item.id !==id);
    filtered.map((data,index)=>{
        data.id=index+1;
    })
    fs.writeFileSync("data.json",JSON.stringify(filtered,null,2));

    res.send({success:true});
    
})


app.listen("5000",()=>{
    console.log("App successfully running");
})