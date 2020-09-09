var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

var path = require('path');
var port = process.env.port || 3000;


var api = require('./routes/api/login')(app, path);
var user = require('./routes/api/user')(app, path);
var group = require('./routes/api/group')(app, path);
var user = require('./routes/api/channel')(app, path);


app.listen(port, () => {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server has been started at : ' + n + ':' + m);
});