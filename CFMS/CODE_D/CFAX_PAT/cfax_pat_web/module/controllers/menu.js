/**
 * Created by sui on 2016/7/6.
 */
var app = angular.module("app");
app.controller('menuCtrl', function ($scope,$modal,$cookies,$rootScope,login) {

    $scope.$tab = $(".navbar-collapse .navbar-nav li");
    //alert($scope.$tab )
    $scope.$tab.on('click',function(e) {
        e.stopPropagation();
        var t = $(this).index();
        $scope.$tab.removeClass();
        $(this).addClass('y_on');
    })
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

   /* //获取用户头像
    $scope.loadUserImg = function(){
        $scope.params = {
            "memberNo":$rootScope.pat_memberNo,
            "mUserNo":$rootScope.pat_memUserNo
        };

        login.queryMemberDetail( $scope.params, function (data) {
            if(data.errorCode == '0000'){
                $scope.memDetail=data;
                if(data.userImg != null && data.userImg != null){
                    alert("dsdsd")
                    $scope.showFile(data.userImg);
                }
            }else{
                $scope.failDialog(data.errorMsg);
            }
        });
    }*/

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
                location.href="../../index.html";
           // } else {
                //这里需要提示
              //  $scope.notDialog(data.errorMsg);
           // }
        });
    };
    $scope.initCookies();
});

