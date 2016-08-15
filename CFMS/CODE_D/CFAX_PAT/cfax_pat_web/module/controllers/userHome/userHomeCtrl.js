app.controller('userHomeCtrl', function($scope,$location, publicService,$modal,$rootScope,$cookies,login){

    // 验证是否登录
    /*var pat_memberNo = $rootScope.pat_memberNo
    if(pat_memberNo) $location.path('/home/index');*/

	$scope.left_side = [
		{url:'userHome.userMain',name:'账户总览',icon:'iconfont icon-home'},
        {url:'userHome.userProperty',name:'资产管理',icon:'iconfont icon-asset'},
		{url:'userHome.userAgency',name:'会员资料管理',icon:'iconfont icon-agency'},
//		{url:'userHome.orgAccManage',name:'机构账户管理'},
		{url:'userHome.userList',name:'用户管理',icon:'iconfont icon-user'},
//        {url:'userHome.userManage',name:'用户详情'},
//		{url:'userHome.userProperty4',name:'机构管理'},
//		{url:'userHome.userProperty5',name:'业务审核'},
		{url:'userHome.userMa',name:'我的邀请码',icon:'iconfont icon-ma'}
//		{url:'userHome.userProperty7',name:'帮助中心'}
	];
    

	// 查询当前路由
	var url = $location.url().split("/");
	$scope.current_url = url[1] + "." + url[2];
	$scope.active = false;
	$scope.active = function(){
		$scope.active = true;
	}
	// 查询当前路由对应的数组的位置
	var num = 0;
	for(var i=0; i<$scope.left_side.length; i++){
		if($scope.current_url == $scope.left_side[i].url){
			$scope.current_name = $scope.left_side[i].name;
		}
	}
	// 分页配置
    $scope.maxSize = 5;    
    $scope.totalItems = 180;
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
	// 公告查询
	$scope.search = function(){
	    publicService.post("cfax-public/noticeMgt","queryNotices").success(function(data) {
	        if(data.errorCode == 0000){
	            $scope.data = data.list[0];
	        } else {
	            publicService.prompt(data.errorCode);
	        }
	    }).error(function(data){
	        publicService.prompt('连接失败，请检测网络！');
	    });
	}
	// $scope.search();

	$scope.passDialog = function(message) {
            return $modal.open({
                templateUrl: 'dialog/save.html',
                controller: 'dialogCtrl',
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    message: function() {
                        return message || '操作成功！';
                    }
                }
            });
        };
    $scope.failDialog = function(message) {
            return $modal.open({
                templateUrl: 'dialog/prompt.html',
                controller: 'dialogCtrl',
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    message: function() {
                        return message || '网络错误！';
                    }
                }
            });
        };
    $scope.chooseDialog = function(message){
    	return $modal.open({
    	    templateUrl: 'dialog/choose.html',
    	    controller: 'dialogCtrl',
    	    size: 'sm',
    	    backdrop: 'static',
    	    keyboard: false,
    	    resolve: {
    	        message: function() {
    	            return message || '网络错误！';
    	        }
    	    }
    	});
    };

    $scope.notDialog = function(message){
        return $modal.open({
            templateUrl: 'dialog/not.html',
            controller: 'dialogCtrl',
            size: 'sm',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                message: function() {
                    return message || '保存失败！';
                }
            }
        });
    };

    $scope.loginOut = function() {
        $scope.message = "确定退出？";
        $scope.checkcancel = true;
    };

    // 关闭
    $scope.cancel = function() {
        $scope.checkcancel = false;
    };

    $scope.loginOutok = function(){
        $scope.checkcancel = false;
        $scope.formData = {
            //"pat_memberNo": $cookies.pat_memberNo,
            // "pat_memUserNo": $cookies.pat_memUserNo
        };
        login.loginOut($scope.formData, function (data) {
           // if (data.errorCode == '0000') {
                $cookies.pat_memberNo = "";
                $cookies.pat_memUserNo = "";
                $cookies.pat_memberName = "";
                $cookies.pat_logName = "";
                $cookies.pat_logSecName ="";
                $cookies.pst_cbsOperNo = "";
                $cookies.pat_shortName = "";
                $cookies.pat_nickName ="";
                $cookies.pat_personalUserNo = "";
                $cookies.pat_userName = "";
                $cookies.pat_userNickName = "";
                $cookies.pat_userSex = "";
                $cookies.pat_userLevel = "";
                $cookies.pat_signature = "";
                $cookies.pat_userImg ="";
                $cookies.pat_blackImg = "";
                location.href="../../../index.html";
            //} else {
                //这里需要提示
               // $scope.notDialog(data.errorMsg);
           // }
        });
    };

    $scope.initCookies = function() {
        $rootScope.pat_memberNo = $cookies.pat_memberNo
        $rootScope.pat_memUserNo=$cookies.pat_memUserNo;
        $rootScope.pat_memberName=$cookies.pat_memberName;
        $rootScope.pat_logName=$cookies.pat_logName;
        $rootScope.pat_logSecName=$cookies.pat_logSecName;
        $rootScope.pst_cbsOperNo=$cookies.pst_cbsOperNo;
        $rootScope.pat_shortName=$cookies.pat_shortName;
        $rootScope.pat_nickName=$cookies.pat_nickName;
        $rootScope.pat_personalUserNo=$cookies.pat_personalUserNo;
        $rootScope.pat_userName=$cookies.pat_userName;
        $rootScope.pat_userNickName=$cookies.pat_userNickName;
        $rootScope.pat_userSex=$cookies.pat_userSex;
        $rootScope.pat_userLevel=$cookies.pat_userLevel;
        $rootScope.pat_signature=$cookies.pat_signature;
        $rootScope.pat_userImg=$cookies.pat_userImg;
        $rootScope.pat_blackImg=$cookies.pat_blackImg;
    };

    $scope.initCookies();
});