/**
 * Created by sui on 2016/7/6.
 */
var app = angular.module("app", [
    'ui.router',
    'tm.pagination',
    'ngLoadingSpinner',
    'ui.bootstrap'
]);
app.config(function($stateProvider,$urlRouterProvider,$httpProvider,usSpinnerConfigProvider){
    // loading配置
    usSpinnerConfigProvider.setDefaults({color: '#ff8b3d'});

    $urlRouterProvider.otherwise('/home/index');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'module/views/home/homeTemp.html'
        })
        .state('home.index', {
            url: '/index',
            templateUrl: 'module/views/index/indexTemp.html'
        })
        .state('home.assets', {
            url: '/assets',
            templateUrl: 'module/views/assets/assetsTemp.html'
        })
        .state('home.product', {
            url: '/product',
            templateUrl: 'module/views/product/productTemp.html'
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
        .state('userHome.userManage',{
                    url:'/userManage',
                    templateUrl:'module/views/userHome/userManage.html'
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
