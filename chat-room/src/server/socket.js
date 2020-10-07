module.exports = {

    connect: function(app, io, db) {

        var messages = [];

        io.on('connect', (socket) => {
            console.log('a user connected');
            socket.on('updatelist', () => {
                const collection = db.collection('messages');
                collection.find({}).toArray((err, data) => {
                    io.emit('newlist', data);
                });
            });

            socket.on('message', (data) => {
                if (data) {
                    messages.push(data);
                }

                //only keep 6 messages
                if (messages.length > 6) {
                    messages.shift();
                }

                io.emit('message', messages);

            });

            socket.on('msgcount', (data) => {
                const collection = db.collection('messages');
                collection.find({}).count((err, count) => {
                    io.emit('messagescount', count);
                    // res.send({'count':count});
                });

            })

            socket.on('disconnect', () => {
                io.emit("disconnect");
            });
        });
    }
}