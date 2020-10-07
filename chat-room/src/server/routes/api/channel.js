module.exports = function(db, app, ObjectID) {

    //get all the channels
    app.get('/api/channels', function(req, res) {
        const collection = db.collection('channels');
        collection.find({}).toArray((err, data) => {
            res.send(data);
        });
    });

    //get all the channels based on group id
    app.get('/api/channels/by/:group_id', function(req, res) {

        group_id = req.params.group_id;
        console.log(group_id);

        var objectid = new ObjectID(group_id);
        console.log("objectid::" + objectid);

        const collection = db.collection('channels');
        collection.find({ group_id: group_id }).toArray((err, data) => {
            res.send(data);
        });

    });

    //get one channel based on channel id
    app.get('/api/channels/:channel_id', function(req, res) {

        channel_id = req.params.channel_id;
        console.log(channel_id);

        var objectid = new ObjectID(channel_id);
        console.log("objectid::" + objectid);

        const collection = db.collection('channels');
        collection.find({ _id: objectid }).limit(1).toArray((err, data) => {
            res.send(data);
        });

    });

    //add one channel
    app.post('/api/channels', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        channel = req.body;
        console.log("channel::" + channel);
        const collection = db.collection('channels');
        //check for duplicate channel name
        collection.find({ 'name': channel.name }).count((err, count) => {
            if (count == 0) {
                //if no duplicate
                collection.insertOne(channel, (err, dbres) => {
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

    // delete channel based on ObjectID
    app.delete('/api/channels/:id', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        channelId = req.params.id;
        console.log(channelId);

        //create a new mongo Object ID from the passed in _id
        var objectid = new ObjectID(channelId);
        const collection = db.collection('channels');
        //Delete a single item based on its unique ID.
        collection.deleteOne({ _id: objectid }, (err, docs) => {
            res.send({ ok: 1 });
        })

    });
}