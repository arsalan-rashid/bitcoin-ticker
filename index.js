//jshint esversion:6

const express = require("express");
const bodyParser = require ("body-parser");
const app = express();
const request = require("request");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
var finalURL = baseURL+crypto+fiat;
// https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD
request (finalURL,function(error,response,body){

//console.log(req.body.crypto);
//console.log(body);
var data = JSON.parse(body);
var price =data.last;

res.send("<h1> The current price of "+ crypto+" is: "+price+fiat+"</h1>");


});

});


app.listen(3000,function(){
  console.log("Server started on port 3000");
});
