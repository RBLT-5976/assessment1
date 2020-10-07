module.exports = function(db, app, ObjectID) {
    const formidable = require('formidable');

    //get all the users
    app.get('/api/users', function(req, res) {
        const collection = db.collection('users');
        collection.find({}).toArray((err, data) => {
            res.send(data);
        });
    });

    //get one user
    app.get('/api/users/:username', function(req, res) {

        username = req.params.username;
        console.log(username);

        const collection = db.collection('users');
        collection.find({ 'username': username }).limit(1).toArray((err, data) => {
            res.send(data);
        });
    });

    //check user credentials
    app.post('/api/checkuser', function(req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }
        username = req.body.username;
        password = req.body.password;
        // console.log(product);
        const collection = db.collection('users');
        //check for duplicate id's
        collection.find({ 'username': username, 'password': password }).count((err, count) => {
            if (count == 0) {
                res.send({ success: 0 });

            } else {
                collection.find({ 'username': username }).limit(1).toArray((err, data) => {
                    // res.send({ success: 1 });
                    res.send(data);
                });
            }
        });
    });

    //add one user
    app.post('/api/users', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        user = req.body;
        user.password = user.username;

        user.channelList = [];
        user.adminChannelList = [];
        user.adminGroupList = [];
        user.groupAdmin = false;
        user.groupAssist = false;

        console.log("user::" + user);
        const collection = db.collection('users');
        //check for duplicate id's
        collection.find({ 'username': user.username }).count((err, count) => {
            if (count == 0) {
                //if no duplicate
                collection.insertOne(user, (err, dbres) => {

                    if (err) throw err;
                    let num = dbres.insertedCount;
                    console.log("insertedCount::" + num);
                    //send back to client number of items instered and no error message
                    res.send({ 'num': num, err: null });
                })
            } else {
                //On Error send back error message
                res.send({ 'num': 0, 'err': "duplicate item" });
            }
        });

    });

    //update a user
    app.put('/api/users', function(req, res) {
        console.log(req);
        if (!req.body) {
            return res.sendStatus(400)
        }

        user = req.body;
        console.log(user);
        // var objectid = new ObjectID(user.objid);
        const collection = db.collection('users');
        collection.updateOne({ username: user.username }, { $set: { email: user.email, ofGroupAdminsRole: user.ofGroupAdminsRole } }, () => {
            //Return a response to the client to let them know the delete was successful
            res.send({ 'ok': user.objid });
        })
    });

    //delete user
    app.delete('/api/users/:id', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        userId = req.params.id;
        console.log(userId);

        //create a new mongo Object ID from the passed in _id
        var objectid = new ObjectID(userId);
        const collection = db.collection('users');
        //Delete a single item based on its unique ID.
        collection.deleteOne({ _id: objectid }, (err, docs) => {
            res.send({ ok: 1 });
        })


    });

    //upload photo
    app.post('/api/upload', (req, res) => {

        var form = new formidable.IncomingForm({ uploadDir: './userimages' });
        form.keepExternsions = true;

        form.on('error', function(err) {

            throw err;

            res.send({
                result: "failed",
                data: {},
                numberOfImages: 0,
                message: "cannot upload images. error is  :" + err
            });

        });

        /* this is where the renaming happens */
        form.on('fileBegin', function(name, file) {
            //rename the incoming file to the file's name
            file.path = form.uploadDir + "/" + file.name;
        });

        form.on('file', function(field, file) {
            res.send({
                result: 'OK',
                data: { 'filename': file.name, 'size': file.size },
                numberOfImages: 1,
                message: "upload successful"
            });
        });

        form.parse(req);
    });
}