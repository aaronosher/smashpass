var fs = require("fs"),
    express = require("express"),
    pth = require('path');




// CORECTED form JSON

////////////////////


exports.removeFile = function(path){
  if (fs.existsSync(path)) {
    fs.unlinkSync(path, (err) => {
    if (err) throw err;
    console.log('successfully deleted /tmp/hello');
    });
  }
  else console.log("file for deletion not found");
}

exports.getAllFiles = function(path,callb){
  if (fs.existsSync(path)) fs.readdir(path, callb);
  else console.log("getAllFiles Error: no path");
}

exports.getAllFilesSync = function(path){
  if (fs.existsSync(path)) return fs.readdirSync(path);
  else {
    console.log("getAllFilesSync Error: no path");
    return null;
  }
}

exports.getResponseFilesSync = function(path){
  var files;
  if(files=exports.getAllFilesSync(path)){
    return files.filter((file) => {return file!="request";});
  }
  else return null;
}

exports.getRequestFileSync = function(path){
  if (fs.existsSync(path)) return true;
  else return null;
}

exports.checkFilesType = function(err,files){
  files.forEach(file => {
    if(pth.extname(file)=="");
  })
}

exports.unlinkAllFilesSync = function(path){
  var files = exports.getAllFilesSync(path);
  if(!files) {
    console.log("unlinkAllFilesSync Error: Not found");
    return;
  }
  files.forEach((file)=>exports.removeFile(path+'/'+file))
}
