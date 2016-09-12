var app = angular.module("app");
app.factory('publicSer',function($q, $http){
	var getData = function(){
		var defer = $q.defer();
		var promise = defer.promise;
		var progress;
		$http.get("./data/content.json")
		.success(function(data){
			var res = [];
			for(var i=0; i<data.data.length; i++){
				res.push(data.data[i].name);
				progress = (i + 1)/data.data.length * 100;
			}
			defer.notify(progress);
			defer.resolve(res);
		})
		.error(function(err){
			defer.reject('获取数据失败！');
		})
		return promise;
	}
	// 用$q方法查询数据
	return{
		getData:getData
	}
})