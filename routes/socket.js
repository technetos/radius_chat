
module.exports = function(socket){
socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      sender: data.sender
      text: data.text,
      geoLocation : {
        longitude : data.geoLocation.longitude,
	latitude : data.geoLocation.latitude
    });
});

    socket.on('disconnect', function () {
	socket.broadcast.emit('user:left', {
	    name: name
	});
	userNames.free(name);
    });
}
