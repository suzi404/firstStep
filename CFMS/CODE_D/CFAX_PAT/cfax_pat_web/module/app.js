/**
 * Created by sui on 2016/7/6.
 */
var app = angular.module("app", [
    'ui.router',
    'tm.pagination',
    'ngLoadingSpinner',
    'ui.bootstrap',
    'ngmodel.format',
    "ngCookies"
]).config(function($stateProvider,$urlRouterProvider,$httpProvider,usSpinnerConfigProvider){
    // loading配置
    usSpinnerConfigProvider.setDefaults({color: '#ff8b3d'});

    $urlRouterProvider.otherwise('/home/index');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'module/views/home/homeTemp.html',
            controller:'menuCtrl'
        })
        .state('home.login', {
            url: '/login',
            templateUrl: 'module/views/login/register.html'
        })
        .state('home.loginIn', {
            url: '/loginIn',
            templateUrl: 'module/views/login/loginIn.html'
        })
        .state('home.index', {
            url: '/index',
            templateUrl: 'module/views/index/indexTemp.html',
            controller:'loginCtrl'
        })
        .state('home.notice', {
            url: '/notice',
            templateUrl: 'module/views/notice/noticeList.html',
             controller: 'noticeListCtrl'
        })
        .state('home.noticeDetails', {
            url: '/noticeDetails/:notNo',
            templateUrl: 'module/views/notice/noticeDetails.html',
             controller: 'noticeDetailsCtrl'
        })
        .state('home.assets', {
            url: '/assets',
            templateUrl: 'module/views/assets/assetsTemp.html',
            controller: 'assetsCtrl'
        })
        .state('home.assetDetails_2', {
            url: '/assetDetails_2/:productNo',
            templateUrl: 'module/views/assets/assetDetails_2.html',
            controller:'assetDetails2Ctrl'
        })
        .state('home.product', {
            url: '/product',
            templateUrl: 'module/views/product/productList.html',
            controller:'productListCtrl'
        })
        .state('home.finance',{
            url:'/finance',
            templateUrl:'module/views/finance/finance.html',
            controller: 'financeCtrl'
        })
        .state('home.financeDetails',{
            url:'/financeDetails',
            templateUrl:'module/views/finance/financeDetails.html',
            controller: 'financeApplyCtrl'
        })
        .state('home.financeDetails_2', {
            url: '/financeDetails_2',
            templateUrl: 'module/views/finance/financeDetails_2.html'
        })
        .state('home.fundDetails',{
            url:'/fundDetails/:productNo',
            templateUrl:'module/views/fundDetails/fundDetails.html',
            controller: 'fundDetailsCtrl'
        })
        .state('home.userAgency',{
            url:'/userAgency',
            templateUrl:'module/views/userHome/userAgency.html'
        })
        .state('userHome', {
            url: '/userHome',
            templateUrl: 'module/views/userHome/userHome.html',
             controller: 'userHomeCtrl'
        })
        .state('userHome.userMain',{
            url:'/userMain',
            templateUrl:'module/views/userHome/userMain.html'
        })
        .state('userHome.userProperty',{
            url:'/userProperty',
            templateUrl:'module/views/userHome/userProperty.html',
            controller: 'userPropertyCtrl'
        })
        .state('userHome.tranFinaingDetail',{
            url:'/tranFinaingDetail/:finaRrojNo/:status/:productNo',
            templateUrl:'module/views/userHome/tranFinaingDetail.html',
            controller: 'tranFinaingDetailCtrl'
        })
        .state('userHome.tranTransferDetail',{
            url:'/tranTransferDetail/:flowNo/:status/:productNo/:finaRrojNo',
            templateUrl:'module/views/userHome/tranTransferDetail.html',
            controller: 'tranTransferDetailCtrl'
        })
        .state('userHome.editTranFinaing',{
            url:'/editTranFinaing/:finaRrojNo/:status',
            templateUrl:'module/views/userHome/editTranFinaing.html',
            controller: 'editTranFinaingCtrl'
        })
        .state('userHome.userManage',{
                    url:'/userManage/:memberNo/:memUserNo/:personalUserNo',
                    templateUrl:'module/views/userHome/userManage.html',
                    controller: 'userManageCtrl'
                })

        .state('userHome.userAgency',{
            url:'/userAgency',
            templateUrl:'module/views/userHome/userAgency.html',
            controller:'userAgencyCtrl'
        })

        .state('userHome.orgAccManage',{
            url:'/orgAccManage',
            templateUrl:'module/views/userHome/orgAccManage.html'
        })

        .state('userHome.userList',{
            url:'/userList',
            templateUrl:'module/views/userHome/userList.html'
        })
        .state('userHome.userAdd',{
            url:'/userAdd',
            templateUrl:'module/views/userHome/userAdd.html'
        })
        .state('userHome.userMa',{
            url:'/userMa',
            templateUrl:'module/views/userHome/userMa.html',
            controller: 'userMaCtrl'
        })
        .state('userHome.fundDetails',{
            url:'/fundDetails',
            templateUrl:'module/views/userHome/userMa.html',
            controller: 'userMaCtrl'
        })
        .state('home.helpCenter',{
            url:'/helpCenter',
            templateUrl:'module/views/helpCenter/helpCenter.html'
//            controller: 'helpCenterCtrl'
        })
        .state('home.helpCenter.helpQuestions',{
            url:'/helpQuestions',
            templateUrl:'module/views/helpCenter/helpQuestions.html'
//            controller: 'helpCenterCtrl'
        })
        .state('home.helpCenter.helpGuide',{
            url:'/helpGuide',
            templateUrl:'module/views/helpCenter/helpGuide.html'
//            controller: 'helpCenterCtrl'
        })
        .state('home.helpCenter.helpAbout',{
            url:'/helpAbout',
            templateUrl:'module/views/helpCenter/helpAbout.html'
//            controller: 'helpCenterCtrl'
        })
        .state('home.helpCenter.helpContact',{
            url:'/helpContact',
            templateUrl:'module/views/helpCenter/helpContact.html'
//            controller: 'helpCenterCtrl'
        })
        .state('home.helpCenter.helpPolicy',{
            url:'/helpPolicy',
            templateUrl:'module/views/helpCenter/helpPolicy.html'
//            controller: 'helpCenterCtrl'
        })

//    $urlRouterProvider.otherwise({redirectTo: '/'});
    $httpProvider.interceptors.push('timestampMarker');
    $httpProvider.interceptors.push('httpInterceptor');

});
//loading
app.factory('timestampMarker', ["$injector", function ($injector) {
    var timestampMarker = {
        request: function (config) {
            NProgress.start();//loading开始
            return config;
        },
        response: function (response) {
            setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 1000);//加载完退出loading
            return response;
        }
    };
    return timestampMarker;
}]);
// session过期拦截
app.factory('httpInterceptor', [ '$q', '$injector', '$location',function($q, $injector, $location) {  
      var httpInterceptor = {  
          'responseError' : function(response) {  
              if (response.status == 401) {  
                $location.path('/login');
                  return $q.reject(response);  
              } else if (response.status === 404) {
                  return $q.reject(response);
              }  
          },  
          'response' : function(response) {
            // console.log(response);
            // console.log(response.config.url);
            if(response.config.url.indexOf(".do") > 0 && response.data.status === 'notSession'){
                alert("会话过期，请重新登录");
                $location.path('/login');
                return $q.reject(response);
            } else if(response.config.url.indexOf(".do") > 0 && response.data.status === "notLogin"){
                alert("无权访问，请重新登录");
                $location.path('/login');
                return $q.reject(response);
            }
            return response;
          }
       }  
      return httpInterceptor;  
  }   
]);
