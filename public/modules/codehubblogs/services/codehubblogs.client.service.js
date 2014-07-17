'use strict';

//Codehubblogs service used to communicate Codehubblogs REST endpoints
angular.module('codehubblogs').factory('Codehubblogs', ['$resource',
	function($resource) {
		return $resource('codehubblogs/:codehubblogId', { codehubblogId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);