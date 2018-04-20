'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

let todos = [
	{
		_id: 1,
		title: 'todo 1',
		description: 'todo 1 description',
		status: 'pending'
	},
	{
		_id: 2,
		title: 'todo 2',
		description: 'todo 2 description',
		status: 'completed'
	},
	{
		_id: 3,
		title: 'todo 3',
		description: 'todo 3 description',
		status: 'completed'
	},
	{
		_id: 4,
		title: 'todo 4',
		description: 'todo 4 description',
		status: 'pending'
	},
	{
		_id: 5,
		title: 'todo 5',
		description: 'todo 5 description',
		status: 'completed'
	},
	{
		_id: 6,
		title: 'todo 6',
		description: 'todo 6 description',
		status: 'pending'
	},
	{
		_id: 7,
		title: 'todo 7',
		description: 'todo 7 description',
		status: 'completed'
	}
];

const server = Hapi.server({
	port: 3000,
	host: 'localhost',
	routes: { cors: true }
});

const todoPostHandler = (request, h) => {

	let title, desc;
	let temp = {
		_id: '',
		title: '',
		description: '',
		status: 'pending'
	}

	title = request.payload.title;
	desc = request.payload.desc;

	temp._id = todos.length + 1;
	temp.title = title;
	temp.description = desc;

	console.log('before push',todos);

	todos.push(temp);

	console.log('after push',todos);

	return todos[todos.length - 1];

}

const todoDeleteHandler = (request, h) => {
	let title, desc, status, id;

	id = request.params.id;
	console.log("id is : ",id);
	todos.forEach( (todo,index) => {
		if(todo._id == id)
			todos.splice(index,1);
			// console.log("index is: ",index);
	});

	return todos;
}

const todoPutHandler = (request, h) => {

	let tempTitle, tempDesc, tempStatus, id;

	id = request.params.id;
	tempTitle = request.payload.title;
	tempDesc = request.payload.desc;
	tempStatus = request.payload.status;

	console.log("id is : ",id);
	console.log("title is: ",tempTitle);
	console.log("desc is: ",tempDesc);
	console.log("status is:",tempStatus);

	let i;
	todos.forEach( (todo,index) => {
		if(todo._id == id){
			if(tempTitle == undefined){
				todos[index].title = todos[index].title;
			}else {
				todos[index].title = tempTitle;
			}
			if(tempDesc == undefined){
				todos[index].description = todos[index].description;
			}else{
				todos[index].description = tempDesc;
			}
			if(tempStatus == undefined){
				todos[index].description = todos[index].description;
			}else{
				todos[index].status = tempStatus;
			}

			i = index
		}
	});

	return todos[i];
}

const todoGetHandler = (request,h) => {
	let id,i;

	id = request.params.id;

	console.log("id in get handler: ",id);
	todos.forEach( (todo,index) => {
		if(todo._id == id)
			i = index;
	});

	return todos[i];
}

// get todo list
server.route({
	method: 'GET',
	path: '/todo',
	handler: (request, h) => {
		return todos;
	}
});

// create todo
server.route({
	method: 'POST',
	path: '/todo',
	handler: todoPostHandler,
	options: {
		validate:{
			payload: {
				title: Joi.string().min(3).max(150).required(),
				desc: Joi.string().max(500).required()
			}
		}
	}

});

// delete todo
server.route({
	method: 'DELETE',
	path: '/todo/{id}',
	handler: todoDeleteHandler,
	options: {
		validate:{
			params: {
				id: Joi.string().min(1).required()
			}
		}
	}

});

// update todo
server.route({
	method: 'PUT',
	path: '/todo/{id}',
	handler: todoPutHandler,
	options: {
		validate:{
			payload: {
				title: Joi.string().min(3).max(150),
				desc: Joi.string().max(500),
				status: Joi.string().valid('completed','pending')
			}
		}
	}
});

// get todo
server.route({
	method: 'GET',
	path: '/todo/{id}',
	handler: todoGetHandler
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
