
exports.connect = function(socket) {
    socket.on('join', function(data) {
	console.log(data);
	socket.emit('messages', 'Hello from server');
    });   
 
    socket.on('send:message', function (data) {
	console.log(data);
	socket.emit('send:message', data.message);
	
	/*socket.broadcast.emit('send:message', {
	sender: data.sender,
	text: data.text,
	geoLocation : {
	    longitude : data.geoLocation.longitude,
	    latitude : data.geoLocation.latitude
	}
	});*/
    });

    /*socket.on('disconnect', function () {
	socket.broadcast.emit('user:left', {
	    name: name
	});
	userNames.free(name);
    });*/
}  

