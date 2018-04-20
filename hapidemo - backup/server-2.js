// Adding routes
'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

server.route({
	method: 'GET',
	path: '/',
	handler: (request, h) => {
		return 'Hello, World!';
	}
});

server.route({

	// The method parameter can be any valid HTTP method, array of HTTP methods, or an asterisk to allow any method.
	// Example: method: ['PUT', 'POST'],
	method: 'GET',

	// The path parameter defines the path including parameters.
	// It can contain optional parameters, numbered parameters, and even wildcards.
	// The path option must be a string, though it can contain named parameters.
	// To name a parameter in a path, simply wrap it with {}.
	path: '/{name}',

	handler: (request, h) => {

		// Note that we URI encode the name parameter, this is to prevent content injection attacks.
		// Remember, it's never a good idea to render user provided data without output encoding it first!
		return 'hello,' + encodeURIComponent(request.params.name) + '!';
	}
});

const init = async () => {

	await server.start();
	console.log(`server running at: ${server.info.uri}`);

}

process.on('unhandledRejection', (err) =>{
	console.log(err);
	process.exit(1);
});

init();
