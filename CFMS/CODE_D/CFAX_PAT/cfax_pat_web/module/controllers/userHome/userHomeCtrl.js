app.controller('userHomeCtrl',['$scope', '$location', function($scope, $location){
	$scope.left_side = [
		{url:'userHome.userMain',name:'账户总览'},
		{url:'userHome.userProperty',name:'资产管理'},
		{url:'userHome.userManage',name:'用户管理'},
		{url:'userHome.userProperty2',name:'资产管理'},
		{url:'userHome.userProperty3',name:'资产管理'},
		{url:'userHome.userProperty4',name:'资产管理'},
		{url:'userHome.userProperty5',name:'资产管理'},
		{url:'userHome.userProperty6',name:'资产管理'},
		{url:'userHome.userProperty7',name:'资产管理'}
	];
	// 查询当前路由
	var url = $location.url().split("/");
	$scope.current_url = url[1] + "." + url[2];
	

	// 查询当前路由对应的数组的位置
	var num = 0;
	for(var i=0; i<$scope.left_side.length; i++){
		if($scope.current_url == $scope.left_side[i].url){
			$scope.current_name = $scope.left_side[i].name;
		}
	}
}])