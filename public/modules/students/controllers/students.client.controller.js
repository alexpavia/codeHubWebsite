'use strict';

// Students controller
angular.module('students').controller('StudentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Students',
	function($scope, $stateParams, $location, Authentication, Students ) {
		$scope.authentication = Authentication;

		// Create new Student
		$scope.create = function() {
			// Create new Student object
			var student = new Students ({
				name: this.name,
                profilePic: this.profilePic,
                linkedIn: this.linkedIn,
                gitHub: this.gitHub,
                bio: this.bio
			});

			// Redirect after save
			student.$save(function(response) {
				$location.path('students/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
            this.profilePic = '';
            this.linkedIn = '';
            this.gitHub = '';
            this.bio = '';
		};

		// Remove existing Student
		$scope.remove = function( student ) {
			if ( student ) { student.$remove();

				for (var i in $scope.students ) {
					if ($scope.students [i] === student ) {
						$scope.students.splice(i, 1);
					}
				}
			} else {
				$scope.student.$remove(function() {
					$location.path('students');
				});
			}
		};

		// Update existing Student
		$scope.update = function() {
			var student = $scope.student ;

			student.$update(function() {
				$location.path('students/' + student._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Students
		$scope.find = function() {
			$scope.students = Students.query();
		};

		// Find existing Student
		$scope.findOne = function() {
			$scope.student = Students.get({ 
				studentId: $stateParams.studentId
			});
		};
	}
]);