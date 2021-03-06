var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    fs = require('fs'),
    util = require('./util/util'),
    pth = require('path');
const { exec } = require('child_process');
const rp = require('request-promise-native');


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
  var linesToTake = (uFileData.length*5)/libFiles.length;
  uFileData=  uFileData.map(line => {
    if(line.length<5) return;
    else return line.concat(",y")
  });
  uFileData[uFileData.length-1]+="\n";
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
  fs.writeFileSync(`${path}/${uid}.txt`, data);
}

function sendTrainingDone(data){
  const baseUrl = 'https://us-central1-smashpass-hacksheffield-4.cloudfunctions.net';
  const aciton = '/registerCallback';
  const url = `${baseUrl}${aciton}`;

  const options = {
  	method: 'POST',
  	uri: url,
  	body: data,
  	json: true,
  };
  return result = rp(options);
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
  var smashLog = body.smashes.join("\n");
  var uid = body.uid
  res.status(202).send();

  //console.log(uid+ " smashes\n "+smashLog)
  //smashLog = smashLog.split("\n");
  storeFile(uid,"userData/smashLib",smashLog);
  var trainingFile = mixMeSomeTrainingData(`${uid}.txt`,"userData/smashLib")
  storeFile(`${uid}`,"userData/trainData",trainingFile);
  runNN(`python3 packages/ml/classifier.smash.py train-fresh`,`userData/${uid}W.json`,`userData/trainData/${uid}.txt`,"0.3","1000","7 10 ",function(err,stdout,stderr) {
    if(err){
      console.log("trainCallback: Error "+ err);
      //res.send("error has ocured ");
      /*var data = {
      	uid: uid,
      	success: false,
      	error: err,
      };
      sendTrainingDone(data)
        .catch(err => console.error(err));
        */
      return;
    }
    var data = {
      uid: uid,
      success: true,
      error: null,
    };
    sendTrainingDone(data)
        .catch(err => console.error(err));

    console.log(stdout);
    //res.send("sucessssssssss \n");
    console.log("-------------end reeached-------------")
  });

});


app.post("/login", function (req, res) {
  var body = req.body; //uid+smash
  console.log(body);
  var smash = body.smash;
  var uid = body.uid;
  storeFile("singleTest","userData/",smash);
  runNN(`python3 packages/ml/classifier.smash.py test`,`userData/${uid}W.json`,`userData/singleTest.txt`,"","","",function(err,stdout,stderr) {
    if(err){
      console.log("trainCallback: Error "+ err);
      res.send("error has ocured ");
      return;
    }
    var out =stdout;
    console.log(stdout);
    var matches = out.match(/\[(.*?)\]/);
    var submatch;
    if (matches) {
      submatch = matches[1];
      submatch = (submatch.split(" ")).slice(1,2);
    }
    else{
      res.send("faill no submatches\n");
    }
    var data = {uid:uid,conf:submatch}
    console.log(submatch);
    res.send(data);
  });
  ///
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
