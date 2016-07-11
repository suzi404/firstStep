app.controller('userPropertyCtrl',['$scope', '$location', function($scope, $location){
	// li切换
	$scope.color1 = 0;
	$scope.changeColor1 = function(n){
		$scope.color1 = n;
	};
	$scope.color2 = 0;
	$scope.changeColor2 = function(n){
		$scope.color2 = n;
	};
}]);