//Setup
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var io = require('socket.io')(app.listen(port));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Logic
var callList = {};
var handleSlackEndpoint = function (req, res) {
    var token = req.body.token;
    var query = req.body.text.split(' ');
    var command = query[0] || 'help';

    //Check the slack token in the call
    if(token !== process.env.SLACK_TOKEN){
        res.json({
            error: 'Token Mismatch'
        });
        return;
    }
    
    //Standard response format
    var response = {
        text: "Lorem Ipsum",
        response_type: "ephemeral",
    };
    
    //Command List
    switch(command){
        case 'on':
            callList[req.body.user_id] = req.body.user_name;
            response.text = req.body.user_name + " is going on call! :phone: :zipper_mouth_face:";
            response.response_type = "in_channel";
            break;
        case 'off':
            delete callList[req.body.user_id];
            response.text = req.body.user_name + " is done with their call! :raised_hands:";
            response.response_type = "in_channel";
            break;
        case 'who':
            var people = "";
            for(var index in callList) { 
                people += callList[index] + ", "; 
            }
            if(Object.keys(callList).length > 0)
                response.text = "The following people are on call: " + people;
            else
                response.text = "No one is currently on call!";
            break;
        case 'status':
            if(Object.keys(callList).length > 0)
                response.text = "Call in progress! Keep quiet~";
            else
                response.text = "No one is currently on call!";
            break;
        case 'reset':
            callList = {};
            break;
        case 'help':
        default:
                response.text = "Use `on`/`off` to toggle current call status. `who` will return a list of people on call. `status` will give you a quick status update!";
            break;
    }
    
    io.sockets.emit('status', Object.keys(callList).length);
    
    res.json(response);
};

io.on('connection', function(socket){
   //console.log('Socket Connected'); 
});

//Routes
app.use(express.static(__dirname + '/public'));
app.post('/endpoint', handleSlackEndpoint);