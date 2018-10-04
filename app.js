var express     = require('express'),
    app         = express();
    
// Set port for Heroku
app.set('port', 5000);

var server = app.listen(app.get('port'), function(){
    console.log("Server is running on " + app.get('port'));
});

// Root route greeting message
app.get('/', function(req, res){
    res.send("Welcome to Socket.IO demo!");
});
