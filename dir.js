var express = require('express')
var fs = require('fs');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//var path;
var path = require('path');
app.use(cors());
app.use(express.static('public'));
var dir =  "/ei_dataload/";//process.cwd();
//var dir =  process.cwd();
app.use(express.static(dir)); //current working directory
app.use(express.static(__dirname)); //module directory
//var server = http.createServer(app);
//if (process.argv.length <= 2) {
  //  process.exit(-1);
//}

/*app.post("/dir", function(req, res) {
    var path = req.body.dirpath;
    //console.log(path);
    app.use('/', (req, res) => {
      fs.readdir(path, function(err, items) {
          console.log(items);
          res.send(items);
      });
      });
      
}); */



app.get('/', function(req, res) {

  var currentDir = dir;
  var query = req.query.path || '';
  if (req.query.init){
  var currentDir = req.query.init;
  dir = req.query.init;
  }
  console.log(query)
  if (query) currentDir = path.join(currentDir,query);
  console.log(currentDir);
  fs.readdir(currentDir, function (err, files) {
      if (err) {
         console.log(err);
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
                 //  if(program.exclude && _.contains(program.exclude, ext)) {
                 //    console.log("excluding file ", file);
                 //    return;
                 //  }       
                   data.push({ Name : file, Ext : ext, IsDirectory: false, Path : path.join(currentDir)});
                 }
 
         } catch(e) {
           console.log(e); 
         }        
         
       });
      // data = _.sortBy(data, function(f) { return f.Name });
       res.send(data);
   });
 });

//var path = process.argv[2];

app.listen(5001);

