var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');

app.use(cors());
app.get('/', (req, res) => {
   var readfl = req.query.path;
   console.log(readfl)
    fs.readFile(readfl, (err, data) => {
        if (err) throw err;
        res.send(data);
    });

});

app.listen(5000);