/**
 * Created by sui on 2016/7/6.
 */
var app = angular.module("app", [
    'ui.router',
    'tm.pagination'
]);
app.config(function($stateProvider,$urlRouterProvider,$httpProvider){
    $urlRouterProvider.when('','/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'module/views/index/indexTemp.html'
        })
        .state('userHome', {
            url: '/userHome',
            templateUrl: 'module/views/userHome/userHome.html'
        })
        .state('userHome.userMain',{
            url:'/userMain',
            templateUrl:'module/views/userHome/userMain.html'
        })
        .state('userHome.userProperty',{
            url:'/userProperty',
            templateUrl:'module/views/userHome/userProperty.html'
        })


//    $urlRouterProvider.otherwise({redirectTo: '/'});

        .state('assets', {
            url: '/assets',
            templateUrl: 'module/views/assets/assetsTemp.html'
        })
        .state('product', {
            url: '/product',
            templateUrl: 'module/views/product/productTemp.html'
        })


//    $urlRouterProvider.otherwise({redirectTo: '/'});
    $httpProvider.interceptors.push('timestampMarker');


})
//loading
app.factory('timestampMarker', ["$injector", function ($injector) {

    var timestampMarker = {
        request: function (config) {
//            if (config.url.toString().indexOf('http://') === 0) {
//                $injector.get('$ionicLoading').show({
                   NProgress.start();//loading开始

//                });
//            }
//            config.headers = config.headers || {};
//            var token = localStorageService.get('token');
//
//            if (token && token.expires_at && token.expires_at > new Date().getTime()) {
//                config.headers.Authorization = 'Bearer ' + token.access_token;
//            }

            return config;
        },
        response: function (response) {
            // $rootScope.loading = false;
            setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 1000);//加载完退出loading
//            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);
