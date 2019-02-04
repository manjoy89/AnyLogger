var express = require('express')
var fs = require('fs');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var path;
app.use(cors());
app.use(express.static('public')); 
//if (process.argv.length <= 2) {
  //  process.exit(-1);
//}

app.post("/dir", function(req, res) {
    var path = req.body.dirpath;
    //console.log(path);
    app.use('/', (req, res) => {
      fs.readdir(path, function(err, items) {
          console.log(items);
          res.send(items);
      });
      });
      
});

//var path = process.argv[2];

app.listen(5001);

