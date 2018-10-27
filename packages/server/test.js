var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    fs = require('fs'),
    util = require('./util/util'),
    pth = require('path');

const { exec } = require('child_process');

exec('ls -l', (err, stdout, stderr) => {
  if (err) {
    console.log("failled");
    return;
  }


  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
