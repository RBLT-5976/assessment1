var fs = require("fs");

module.exports = function(app, path) {

    var bodyParser = require('body-parser');

    app.use(bodyParser.json());

    app.get('/api/groups', function(req, res) {
        fs.readFile("groups.json", 'utf8', function(err, data) {
            // console.log(data);
            res.end(data);
        });
    });

    // get a certain group
    app.get('/api/groups/:groupid', function(req, res) {

        const groupid = req.params.groupid;
        // console.log(username);

        fs.readFile("groups.json", 'utf8', function(err, data) {
            groups = JSON.parse(data);
            let group = groups.filter(
                item => item.id == groupid
            )[0]; // filter to find the specified username

            res.send(group);

        });
    });

    // add a group
    app.post('/api/groups', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        var group = {};


        fs.readFile("groups.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            // find the maximum id number in file,then add 1 
            group.id = Math.max.apply(Math, data.map(function(o) { return o.id; })) + 1;
            group.name = req.body.name;
            console.log(group.name);
            data.push(group);
            var jsonContent = JSON.stringify(data);

            fs.writeFile("groups.json", jsonContent, 'utf8', function(err) {
                if (err) throw err;
                console.log('complete');
                console.log("JSON file has been saved.");
                // res.status(200).json({
                //     isSuccess: true
                // });
                res.send(group);
            });
        });
    });

    // delete a group
    app.delete('/api/groups/:id', function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        id = req.params.id;
        console.log(id);

        fs.readFile("groups.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            // console.log(data);
            data = data.filter(item => item.id != id);

            var jsonContent = JSON.stringify(data);

            fs.writeFile("groups.json", jsonContent, 'utf8', function(err) {
                if (err) throw err;
                console.log('complete');
                console.log("JSON file has been saved.");
                res.status(200).json({
                    isSuccess: true
                });
            });
        });
    });
}