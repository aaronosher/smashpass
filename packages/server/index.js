var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    fs = require('fs'),
    util = require('./util/util'),
    pth = require('path');


var app = express();

app.set("view engine","hbs");
app.enable("strict routing");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log(__dirname);

app.get("/", function (req, res) {
  var body = req.body;
  res.send("hello");
});

app.get("/login", function (req, res) {
  var body = req.body;
  res.send(body);
});



app.listen(80).on('error', function(err) { console.log("err")});

console.error("--------", new Date(), "--------");
