// using plugins
'use strict'

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
	method: 'GET',
	path: '/{name}',
	handler: (request, h) => {

		// request.log is HAPI standard way of logging
		//request.log(['a', 'name'], "Request name");

		// or

		// you can also use a pino instance, which will be faster
		request.logger.info('In handler %s', request.path);

		return `Hello, ${encodeURIComponent(request.params.name)}!`;

	}
});

const init = async () => {

	await server.register({

		plugin: require('hapi-pino'),
		options: {
			prettyPrint: true,
			logEvents: ['response']
		}

	});

	await server.start();
	console.log(`server started at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);

});

init();
