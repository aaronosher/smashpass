var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    fs = require('fs'),
    util = require('./util/util'),
    pth = require('path');

const { exec } = require('child_process');

function runNN(comand,wPath,inPath,alpha,count,layers){
  exec(`${comand} ${wPath} ${inPath} ${alpha} ${count} ${layers}`, (err, stdout, stderr) => {
    if (err) {
      console.log("failled");
      console.log(err);
      return;
    }
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout:`+ stdout);
    console.log(`stderr: ${stderr}`);
});
}

function mixMeSomeTrainingData(uFile, smashLibPath){
  var uFileData;
  fs.readFile(uFile, function read(err, data) {
    if (err) {
        throw err;
    }
    uFileData = data;
  });


}
  console.log(util.getAllFilesSync("userData/smashLib"));

//runNN("python3 packages/ml/classifier.smash.py train-fresh","userData/testW.json","userData/smashSample.txt","0.3","1000"," 10");
//runNN("python3 packages/ml/classifier.smash.py validate","userData/testW.json","userData/smashSampleTest.txt"," "," "," " );
