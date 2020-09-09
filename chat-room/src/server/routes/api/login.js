var fs = require("fs");

module.exports = function(app) {
    var bodyParse = require('body-parser');
    app.use(bodyParse.json());

    app.post('/api/login/', function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        const username = req.body.username;
        const password = req.body.password;
        console.log(username);
        console.log(password);
        fs.readFile("users.json", 'utf8', function(err, data) {
            // console.log(data);
            users = JSON.parse(data);
            let user = users.filter(
                item => item.username == username && item.password == password)[0];
            res.send(user); //&& item.password == password 
        });
    });
}