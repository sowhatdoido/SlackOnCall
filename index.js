require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var io = require('socket.io')(app.listen(port));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.post('/endpoint', function (req, res) {
    var token = req.body.token;

    if(token !== process.env.SLACK_TOKEN){
        res.json({
            error: 'Token Mismatch'
        });
        return;
    }
    
    res.json(req.body);
});

io.on('connection', function(socket){
   console.log('Socket Connected'); 
});