var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var io = require('socket.io')(app.listen(port));

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
   console.log('Socket Connected'); 
});