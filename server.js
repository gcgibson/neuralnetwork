var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server(8080, 'localhost');


server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
 		directory: {
            path: './',
            listing: false,
            index: true
        }
    }      
});



server.start(function(){
	console.log('server started');
});