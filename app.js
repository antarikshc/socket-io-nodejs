var express     = require('express'),
    app         = express(),
    socket      = require('socket.io');
    
// Set port for Heroku
app.set('port', 5000);

var server = app.listen(app.get('port'), function(){
    console.log("Server is running on " + app.get('port'));
});

// Root route greeting message
app.get('/', function(req, res){
    res.send("Welcome to Socket.IO demo!");
});

// Setup Socket on express app
var io = socket(server);

// Create socket connection
io.on('connection', function(socket){
    console.log("Client " + socket.id + " has been connected!");

    socket.on('message', function(data){
        console.log(data);
    });

    socket.on('disconnect', function(){
        console.log("Client " + socket.id + " has been disconnected!");
    });

});