const express = require("express");
const app= express();

app.get("/",function(req,res){
  res.send("Hello");
});

app.get("/contact",function(req,res){
  res.send
});
app.get("/about",function(req,res){
  res.send("Ravi");
});




app.listen(3000,function(){
    console.log("listening on 3000")
});
