var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var useragent = require('useragent');
var path = require('path');

var five = require('johnny-five');
var board = new five.Board();
var led;

app.use(express.static('public'));
app.get('/', function(req, res){
	var agent = useragent.parse(req.headers['user-agent']);
	// console.log('get: \'/\' groupify.req.headers: '+req.headers);
	console.log('get: \'/\' useragent: '+agent);

	res.sendFile(path.join(__dirname + '/index.html'));
});

board.on('ready', function(){
	led = new five.Led(13);
});


server.listen(8000, "0.0.0.0", function(){
	console.log("node running");
});

io.on('connection', function(socket){
	socket.on('toggleLed', function(d){
		led.toggle();
	});
});


