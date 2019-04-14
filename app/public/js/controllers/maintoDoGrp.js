angular.module('toDoGrpController', [])

	// inject the Todo service factory into our controller
	.controller('mainControllerG', ['$scope','$http','toDoGrps', function($scope, $http, toDoGrps) {
		console.log("toDoGrpController mainControllerG reached");
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		toDoGrps.get()
			.success(function(data) {
				console.log("mainControllerG toDoGrps.get success");
				$scope.toDoGrps = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createToDoGrp = function() {
			console.log("mainControllerG createToDoGrp ");
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				toDoGrps.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.toDoGrps = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteToDoGrp = function(id) {
			$scope.loading = true;

			toDoGrps.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.toDoGrps = data; // assign our new list of todos
				});
		};
	}]);