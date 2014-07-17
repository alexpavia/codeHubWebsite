'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var codehubblogs = require('../../app/controllers/codehubblogs');

	// Codehubblogs Routes
	app.route('/codehubblogs')
		.get(codehubblogs.list)
		.post(users.requiresLogin, codehubblogs.create);

	app.route('/codehubblogs/:codehubblogId')
		.get(codehubblogs.read)
		.put(users.requiresLogin, codehubblogs.hasAuthorization, codehubblogs.update)
		.delete(users.requiresLogin, codehubblogs.hasAuthorization, codehubblogs.delete);

	// Finish by binding the Codehubblog middleware
	app.param('codehubblogId', codehubblogs.codehubblogByID);
};