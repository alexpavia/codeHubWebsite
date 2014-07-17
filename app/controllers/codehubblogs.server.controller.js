'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Codehubblog = mongoose.model('Codehubblog'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Codehubblog already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Codehubblog
 */
exports.create = function(req, res) {
	var codehubblog = new Codehubblog(req.body);
	codehubblog.user = req.user;

	codehubblog.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(codehubblog);
		}
	});
};

/**
 * Show the current Codehubblog
 */
exports.read = function(req, res) {
	res.jsonp(req.codehubblog);
};

/**
 * Update a Codehubblog
 */
exports.update = function(req, res) {
	var codehubblog = req.codehubblog ;

	codehubblog = _.extend(codehubblog , req.body);

	codehubblog.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(codehubblog);
		}
	});
};

/**
 * Delete an Codehubblog
 */
exports.delete = function(req, res) {
	var codehubblog = req.codehubblog ;

	codehubblog.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(codehubblog);
		}
	});
};

/**
 * List of Codehubblogs
 */
exports.list = function(req, res) { Codehubblog.find().sort('-created').populate('user', 'displayName').exec(function(err, codehubblogs) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(codehubblogs);
		}
	});
};

/**
 * Codehubblog middleware
 */
exports.codehubblogByID = function(req, res, next, id) { Codehubblog.findById(id).populate('user', 'displayName').exec(function(err, codehubblog) {
		if (err) return next(err);
		if (! codehubblog) return next(new Error('Failed to load Codehubblog ' + id));
		req.codehubblog = codehubblog ;
		next();
	});
};

/**
 * Codehubblog authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.codehubblog.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};