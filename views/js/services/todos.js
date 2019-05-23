angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				console.log("under views service todo get");
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				console.log("under views service todo create");
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				console.log("under views service todo delete");
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);