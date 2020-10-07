const express = require('express'); // Import exprerss.js
const app = express(); //The app object conventionally denotes the Express application. Create it by 
const http = require('http').Server(app);
const bodyParser = require('body-parser'); //create an instance of body-parser
const cors = require('cors'); //allow Cross site origin requests
const MongoClient = require('mongodb').MongoClient; // require MongoClient functionality
var ObjectID = require('mongodb').ObjectID; //require ObjectID functionality
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const path = require('path');

console.log(__dirname);
app.use(express.static(path.join(__dirname, '../dist/imageupload/')));
app.use('/images', express.static(path.join(__dirname, './userimages')));


app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(bodyParser.json()); //Mounts the specified middleware function
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    //Callback function code. When we have a connection start the rest of the app.
    if (err) { return console.log(err) }
    console.log('connected to Mongodb')
    const dbName = 'mydb';
    const db = client.db(dbName);
    sockets.connect(app, io, db);

    require('./routes/api/login')(app, path);
    require('./routes/api/user.js')(db, app, ObjectID);
    require('./routes/api/group.js')(db, app, ObjectID);
    require('./routes/api/channel.js')(db, app, ObjectID);

    //Start the server listening on port 3000. Outputs message to console once server has started.(diagnostic only)
    app.listen(3000, () => {
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        console.log('Server has been started at : ' + n + ':' + m);
    });

});
// var api = require('./routes/api/login')(app, path);
// var user = require('./routes/api/user')(app, path);
// var group = require('./routes/api/group')(app, path);
// var user = require('./routes/api/channel')(app, path);