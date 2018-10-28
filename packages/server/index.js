var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    fs = require('fs'),
    util = require('./util/util'),
    pth = require('path');
const { exec } = require('child_process');

var app = express();

app.set("view engine","hbs");
app.enable("strict routing");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log(__dirname);

////////////////////////////////////////

function runNN(comand,wPath,inPath,alpha,count,layers,callback){
  exec(`${comand} ${wPath} ${inPath} ${alpha} ${count} ${layers}`, (err, stdout, stderr) => callback(err,stdout,stderr));
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


function trainCallback(err,stdout,stderr){
  if(err){
    console.log("trainCallback: Error "+ err);
    return {err:true,errMsg:err};
  }
  console.log(stdout)
  return {stdout}
}
///////////////////////////////////////

//runNN("python3 packages/ml/classifier.smash.py train-fresh","userData/testW.json","userData/smashSample.txt","0.3","1000"," 10",trainCallback);





app.get("/", function (req, res) {
  var body = req.body;
  res.send("hello");
});
app.post("/register", function (req, res) {
  var body = req.body;
  console.log(body);
  var smashLog = body.smashes;
  var uid = body.uid;
  //console.log(uid+ " smashes\n "+smashLog)
  storeFile(uid,"userData/smashLib",smashLog);
  //runNN(`python3 packages/ml/classifier.smash.py train-fresh`,`userData/${uid}W.json`,`userData/trainData/${uid}.txt`,"0.3","1000"," 10",trainCallback);

  res.send("hello "+ body);
});


app.post("/login", function (req, res) {
  var body = req.body; //uid+smash
  console.log(body);
  ///
  //data={isApproved:false,conficence:(sonefloat)}
  res.send(body);
});
/*
app.post("/register", function (req, res) {
  var body = req.body; //all smashes + uid
  ///
  // toSend in post callback data={registerSucess:false ,uid: ,errMsg:}
  res.send(body);
});

*/


app.listen(80).on('error', function(err) { console.log("err")});

console.error("--------", new Date(), "--------");
