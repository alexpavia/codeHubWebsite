'use strict';

// Codehubblogs controller
angular.module('codehubblogs').controller('CodehubblogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Codehubblogs',
	function($scope, $stateParams, $location, Authentication, Codehubblogs ) {
		$scope.authentication = Authentication;

		// Create new Codehubblog
		$scope.create = function() {
			// Create new Codehubblog object
			var codehubblog = new Codehubblogs ({
				name: this.name,
                contents: this.contents
			});

			// Redirect after save
			codehubblog.$save(function(response) {
				$location.path('codehubblogs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
            this.contents = '';
		};

		// Remove existing Codehubblog
		$scope.remove = function( codehubblog ) {
			if ( codehubblog ) { codehubblog.$remove();

				for (var i in $scope.codehubblogs ) {
					if ($scope.codehubblogs [i] === codehubblog ) {
						$scope.codehubblogs.splice(i, 1);
					}
				}
			} else {
				$scope.codehubblog.$remove(function() {
					$location.path('codehubblogs');
				});
			}
		};

		// Update existing Codehubblog
		$scope.update = function() {
			var codehubblog = $scope.codehubblog ;

			codehubblog.$update(function() {
				$location.path('codehubblogs/' + codehubblog._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Codehubblogs
		$scope.find = function() {
			$scope.codehubblogs = Codehubblogs.query();
		};

		// Find existing Codehubblog
		$scope.findOne = function() {
			$scope.codehubblog = Codehubblogs.get({ 
				codehubblogId: $stateParams.codehubblogId
			});
		};
	}
]);