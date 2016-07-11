app.controller('userHomeCtrl',['$scope', '$location', function($scope, $location){
	$scope.left_side = [
		{url:'userHome.userMain',name:'账户总览'},
		{url:'userHome.userProperty',name:'资产管理'},
		{url:'userHome.userProperty1',name:'资产管理'},
		{url:'userHome.userProperty2',name:'资产管理'},
		{url:'userHome.userProperty3',name:'资产管理'},
		{url:'userHome.userProperty4',name:'资产管理'},
		{url:'userHome.userProperty5',name:'资产管理'},
		{url:'userHome.userProperty6',name:'资产管理'},
		{url:'userHome.userProperty7',name:'资产管理'}
	];
	var url = $location.url().split("/");
	$scope.current_url = url[1] + "." + url[2];
}])