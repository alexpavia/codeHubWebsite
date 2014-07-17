'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Codehubblog = mongoose.model('Codehubblog');

/**
 * Globals
 */
var user, codehubblog;

/**
 * Unit tests
 */
describe('Codehubblog Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			codehubblog = new Codehubblog({
				name: 'Codehubblog Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return codehubblog.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			codehubblog.name = '';

			return codehubblog.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Codehubblog.remove().exec();
		User.remove().exec();

		done();
	});
});