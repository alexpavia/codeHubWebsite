'use strict';

//Setting up route
angular.module('codehubblogs').config(['$stateProvider',
	function($stateProvider) {
		// Codehubblogs state routing
		$stateProvider.
		state('listCodehubblogs', {
			url: '/codehubblogs',
			templateUrl: 'modules/codehubblogs/views/list-codehubblogs.client.view.html'
		}).
		state('createCodehubblog', {
			url: '/codehubblogs/create',
			templateUrl: 'modules/codehubblogs/views/create-codehubblog.client.view.html'
		}).
		state('viewCodehubblog', {
			url: '/codehubblogs/:codehubblogId',
			templateUrl: 'modules/codehubblogs/views/view-codehubblog.client.view.html'
		}).
		state('editCodehubblog', {
			url: '/codehubblogs/:codehubblogId/edit',
			templateUrl: 'modules/codehubblogs/views/edit-codehubblog.client.view.html'
		});
	}
]);