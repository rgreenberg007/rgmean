angular.module('toDoGrpService', [])

	// super simple service
	// each function returns a promise object 
	.factory('ToDoGrps', ['$http',function($http) {
		return {
			get : function() {
				console.log("service toDoGrps get");
				return $http.get('/api/toDoGrps');
			},
			create : function(toDoGrpData) {
				console.log("service toDoGrps create");
				return $http.post('/api/toDoGrps', toDoGrpData);
			},
			delete : function(id) {
				console.log("service toDoGrp delete");
				return $http.delete('/api/toDoGrps' + id);
			}
		}
	}]);