var express = require('express')
var fs = require('fs');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var path = require('path');
app.use(cors());
app.use(express.static('public'));
var dir =  "/";
app.use(express.static(dir)); //current working directory
app.use(express.static(__dirname)); //module directory

app.get('/', function(req, res) {

  var currentDir = dir;
  var query = req.query.path || '';
  if (req.query.init){
  var currentDir = req.query.init;
  dir = req.query.init;
  }
  if (query) currentDir = path.join(currentDir,query);
  fs.readdir(currentDir, function (err, files) {
      if (err) {
         var errmsg = [{Errormsg: "Directory "+currentDir+" not Found!... Kindly Check if the Directory is Valid!"}];
         res.send(errmsg);
         query = null;
         dir = "/ei_dataload/"
         return;
       }
       var data = [];
       if(files.length==0){
        data.push({ Name: "empty",Path : path.join(currentDir)});
       }
       files
       .forEach(function (file) {
         try {
                 var isDirectory = fs.statSync(path.join(currentDir,file)).isDirectory();
                 if (isDirectory) {
                   data.push({ Name : file, IsDirectory: true, Path : path.join(currentDir)});
                 } else {
                   var ext = path.extname(file);      
                   data.push({ Name : file, Ext : ext, IsDirectory: false, Path : path.join(currentDir)});
                 }
 
         } catch(e) {
           console.log(e); 
         }        
         
       });
       res.send(data);
   });
 });

app.listen(5001);

