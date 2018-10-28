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

function getFileData(path){
  var data = fs.readFileSync(path);
}

function mixMeSomeTrainingData(uFile, smashLibPath){
  var uFileData =  fs.readFileSync(smashLibPath+"/"+uFile, 'utf8');
  var libFiles = util.getAllFilesSync("userData/smashLib");
  var trainingData=[];
  uFileData = uFileData.split("\n");
  var linesToTake = uFileData.length/libFiles.length;
  uFileData=  uFileData.map(line => {
    if(line.length<5) return;
    else return line.concat(",y")
  });

  trainingData+=uFileData.join("\n");
  //console.log(trainingData);
    for(var i=0;i<libFiles.length;i++){
      var fName = libFiles[i]
      if(uFile==fName) {
        console.log("sucessful skip")
        continue;
      }
      var contents = fs.readFileSync(smashLibPath+"/"+fName, 'utf8');
      //console.log(contents);
      var contArray = contents.split("\n");
      //console.log(contArray);
      contArray=  contArray.map(line => {
        if(line.length<5) return;
        else return line.concat(",n")
      });
      //console.log(contArray);
      shuffleUsingSortFunc(contArray);
      //console.log(contArray.slice(0,linesToTake));
      contArray = contArray.slice(0,linesToTake)
      contArray[contArray.length-1]+="\n";
      trainingData+=contArray.join("\n");
    }
  return trainingData
}

function shuffleUsingSortFunc(array){
 array.sort(function(){
   return 0.5-Math.random();
 });
}
function storeFile(uid,path,data){
  fs.writeFileSync(`${path}/${uid}.txt`, trainingFile);
}
//console.log(getFileData("userData/smashSampleTest.txt"));
//  console.log(util.getAllFilesSync("userData/smashLib"));
var trainingFile = mixMeSomeTrainingData("aaronSmash.txt","userData/smashLib")
storeFile("aaron","userData/trainData",trainingFile);

//runNN("python3 packages/ml/classifier.smash.py train-fresh","userData/testW.json","userData/smashSample.txt","0.3","1000"," 10");
//runNN("python3 packages/ml/classifier.smash.py validate","userData/testW.json","userData/smashSampleTest.txt"," "," "," " );
