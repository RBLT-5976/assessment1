module.exports = function(db, app, ObjectID) {

    //get all the groups
    app.get('/api/groups', function(req, res) {
        const collection = db.collection('groups');
        collection.find({}).toArray((err, data) => {
            res.send(data);
        });
    });

    //get one group
    app.get('/api/groups/:id', function(req, res) {

        groupId = req.params.id;
        // console.log(groupId);

        var objectid = new ObjectID(groupId);
        // console.log("objectid::" + objectid);
        const collection = db.collection('groups');
        collection.find({ _id: objectid }).limit(1).toArray((err, data) => {
            res.send(data);
        });
    });

    // add a group
    app.post('/api/groups', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        group = req.body;
        // console.log("group::" + group);
        const collection = db.collection('groups');
        //check for duplicate id's
        collection.find({ 'name': group.name }).count((err, count) => {
            if (count == 0) {
                //if no duplicate
                collection.insertOne(group, (err, dbres) => {

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

    //update a group
    app.put('/api/groups', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400)
        }

        group = req.body;
        //console.log(req);
        var objectid = new ObjectID(group.objid);
        const collection = db.collection('groups');
        collection.updateOne({ _id: objectid }, { $set: { id: group.id, name: group.name } }, () => {
            //Return a response to the client to let them know the delete was successful
            res.send({ 'ok': group.objid });
        })

    });

    //delete group
    app.delete('/api/groups/:id', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        groupId = req.params.id;
        // console.log(groupId);

        //create a new mongo Object ID from the passed in _id
        var objectid = new ObjectID(groupId);
        const collection = db.collection('groups');

        //Delete a single item based on its unique ID.
        collection.deleteOne({ _id: objectid }, (err, docs) => {
            res.send({ ok: 1 });
        })


    });
}