const express = require("express");
const bodyParser=require("body-parser")
const app= express();

app.use(bodyParser.urlencoded({extended:true}))

// app.get('/',function(req,res){
//     // console.log(__dirname)
//     res.sendFile(__dirname+"/bmicalculator.html");
// })

app.get('/bmicalculator',function(req,res){
    res.sendFile(__dirname+"/bmicalculator.html");
})

app.post('/bmicalculator',function(req,res){
    res.send("POST executed")
})



app.listen(3000,function(req,res){
console.log("listening on 3000")
})