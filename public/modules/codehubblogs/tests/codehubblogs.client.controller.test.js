'use strict';

(function() {
	// Codehubblogs Controller Spec
	describe('Codehubblogs Controller Tests', function() {
		// Initialize global variables
		var CodehubblogsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Codehubblogs controller.
			CodehubblogsController = $controller('CodehubblogsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Codehubblog object fetched from XHR', inject(function(Codehubblogs) {
			// Create sample Codehubblog using the Codehubblogs service
			var sampleCodehubblog = new Codehubblogs({
				name: 'New Codehubblog'
			});

			// Create a sample Codehubblogs array that includes the new Codehubblog
			var sampleCodehubblogs = [sampleCodehubblog];

			// Set GET response
			$httpBackend.expectGET('codehubblogs').respond(sampleCodehubblogs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.codehubblogs).toEqualData(sampleCodehubblogs);
		}));

		it('$scope.findOne() should create an array with one Codehubblog object fetched from XHR using a codehubblogId URL parameter', inject(function(Codehubblogs) {
			// Define a sample Codehubblog object
			var sampleCodehubblog = new Codehubblogs({
				name: 'New Codehubblog'
			});

			// Set the URL parameter
			$stateParams.codehubblogId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/codehubblogs\/([0-9a-fA-F]{24})$/).respond(sampleCodehubblog);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.codehubblog).toEqualData(sampleCodehubblog);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Codehubblogs) {
			// Create a sample Codehubblog object
			var sampleCodehubblogPostData = new Codehubblogs({
				name: 'New Codehubblog'
			});

			// Create a sample Codehubblog response
			var sampleCodehubblogResponse = new Codehubblogs({
				_id: '525cf20451979dea2c000001',
				name: 'New Codehubblog'
			});

			// Fixture mock form input values
			scope.name = 'New Codehubblog';

			// Set POST response
			$httpBackend.expectPOST('codehubblogs', sampleCodehubblogPostData).respond(sampleCodehubblogResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Codehubblog was created
			expect($location.path()).toBe('/codehubblogs/' + sampleCodehubblogResponse._id);
		}));

		it('$scope.update() should update a valid Codehubblog', inject(function(Codehubblogs) {
			// Define a sample Codehubblog put data
			var sampleCodehubblogPutData = new Codehubblogs({
				_id: '525cf20451979dea2c000001',
				name: 'New Codehubblog'
			});

			// Mock Codehubblog in scope
			scope.codehubblog = sampleCodehubblogPutData;

			// Set PUT response
			$httpBackend.expectPUT(/codehubblogs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/codehubblogs/' + sampleCodehubblogPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid codehubblogId and remove the Codehubblog from the scope', inject(function(Codehubblogs) {
			// Create new Codehubblog object
			var sampleCodehubblog = new Codehubblogs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Codehubblogs array and include the Codehubblog
			scope.codehubblogs = [sampleCodehubblog];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/codehubblogs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCodehubblog);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.codehubblogs.length).toBe(0);
		}));
	});
}());