var fs = require("fs");
module.exports = function(app, path) {

    // get all the users
    app.get('/api/users', function(req, res) {
        fs.readFile("users.json", 'utf8', function(err, data) {
            // console.log(data);
            res.end(data);
        });
    });

    // get a certain user
    app.get('/api/users/:username', function(req, res) {

        const username = req.params.username;
        // console.log(username);

        fs.readFile("users.json", 'utf8', function(err, data) {
            users = JSON.parse(data);
            let user = users.filter(
                item => item.username == username
            )[0]; // filter to find the specified username
            res.json(user);
        });
    });

    //add a user
    app.post('/api/users', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }
        var user = {}; // start a new user object
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = user.username;
        user.groupList = []; // by default no group ids in list 
        user.adminGroupList = []; //by default no group ids in list 
        user.ofGroupAdminsRole = false;
        console.log(user);

        fs.readFile("users.json", 'utf8', function(err, data) {
            data = JSON.parse(data);

            data.push(user);
            var jsonContent = JSON.stringify(data);

            fs.writeFile("users.json", jsonContent, 'utf8', function(err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    res.send(err);
                    // return console.log(err);
                }
                console.log("JSON file has been saved.");
                // res.status(200).json({
                //     isSuccess: true
                // });

                res.send(user);
            });
        });
    });

    // modify a user
    app.put('/api/users/:username', function(req, res) {
        username = req.params.username;
        // console.log(username);

        fs.readFile("users.json", 'utf8', function(err, data) {
            users = JSON.parse(data);
            let user = users.filter(
                item => item.username == username
            )[0];

            const index = users.indexOf(user);

            user.email = req.body.email;
            user.groupList = req.body.groupList;
            user.adminGroupList = req.body.adminGroupList;
            user.ofGroupAdminsRole = req.body.ofGroupAdminsRole;

            users[index] = user;

            var jsonContent = JSON.stringify(users);

            fs.writeFile("users.json", jsonContent, 'utf8', function(err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                console.log("JSON file has been saved.");
                // res.status(200).json({
                //     isSuccess: true
                // });

                res.json(users[index]);
            });


        });

    });


    //delete a user
    app.delete('/api/users/:username', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        username = req.params.username;
        console.log(username);

        fs.readFile("users.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            // console.log(data);
            data = data.filter(item => item.username != username);
            console.log(data);
            var jsonContent = JSON.stringify(data);

            fs.writeFile("users.json", jsonContent, 'utf8', function(err) {
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