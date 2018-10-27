var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    fs = require('fs'),
    util = require('./util/util'),
    pth = require('path');

var upload = multer({ dest: __dirname + "/../uploads" });
var app = express();

app.set("view engine","hbs");
app.enable("strict routing");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log(__dirname);

app.get("/", function (req, res) {
  app.send("hello");
});


app.listen(80).on('error', function(err) { console.log("err")});

console.error("--------", new Date(), "--------");
