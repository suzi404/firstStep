'use strict';

/* Controllers */

angular.module('app').controller('testCtrl', function($rootScope, $scope, $http, $timeout, $q, publicSer) {
    $scope.obj = {
        a: 1,
        b: 2
    };
    //console.log($scope.obj.a);
    if ($scope.obj.c == undefined) {
        //$scope.aaa.c 这种未定义的对象下的key是会直接报错的，无法用undefined判断 
        //console.log(111);
    }

    $scope.compare = function() {

        $scope.Value = '000';
    }
    $scope.formValue = {};
    $scope.testSum = '-222222.33';
    $scope.testValue = { v: '1234567890111111111' };
    $scope.Value = '232312222222222222222222222';
    var obj = { 'item1': 'aaa', 'item2': 'bbb' };
    // console.log(_.has(obj, 'item2'));
    var obj = [
            { 'a': '1111', 'b': 'aaaa' },
            { 'a': '1122', 'b': 'aaaa' },
            { 'a': '1133', 'b': 'aaaa' },
            { 'a': '2211', 'b': 'aaaa' },
            { 'a': '1122', 'b': 'cccc' },
            { 'a': '1133', 'b': 'aaaa' }
        ]
        // console.log(_.find(obj, { 'a': '1122' }));
        // console.log(_.findLast(obj, { 'a': '1122' }));
    var str = '111aaabbb';
    // console.log(str.indexOf('bb'));
    // console.log(str.indexOf('cc'));
    // console.log(str.indexOf('1'));
    $scope.blur = function() { console.log('blur'); }
    $scope.click = function() { console.log('click'); }
    $scope.moucseleave = function() { console.log('moucseleave'); }

    $scope.text = '';
    $scope.change = function() {
        alert('change');
    }

    $scope.user = {
        'userName': 'damoqiongqiu',
        'password': ''
    };
    $scope.save = function() {

        $http({
            // timeout:6000,
            url: 'data/test.json',
            method: 'GET'
        }).success(function(data) {
            //响应成功
            console.log('返回数据：'+data);
        }).error(function(data) {
            console.log('请求失败');
            //处理响应失败
        });
    }

    $scope.save();
    console.log(111);
    // 不用提前定义，加上$scope前缀就是控制器内的全局变量
    // $scope.test24;
    test824();
    function test824(){
        $scope.test24 = 11;
    }
    console.log($scope.test24);
    $scope.test23;
    console.log($scope.test23);

    /*
    foo != 10 和 ！foo == 10 运算结果是不一样的。
     */
    $scope.foo = '11';
    if ($scope.foo != '10') {
        // console.log(111);
    } else {
        // console.log(222);
    }
    /*========================================================*/


    /*
    使用$scope声明函数，可以在声明前调用，也可以在声明后调用。
    直接使用原生js声明的函数，必须要在声明后调用，不然报错。
     */
    //$scope.hello();
    $scope.hello = function() {
            console.log('hello');
        }
        // $scope.hello();
        // hello();
    function hello1() {
        alert('hello');
    }
    /*=========================================================*/

    /*
    js的对象属性名是可改变的：
        arr2['str_' + '2'] = 1; 
        console.log(arr2.str_2);//输出1 
     */
    var str = '1,2,3';
    var arr = [];
    var arr2 = {};
    arr = str.split(',');
    arr.forEach(function(v, k) {
            arr2['str_' + v] = true;
        })
        // console.log(arr2);
    var testFun = function(n) {
        n = n || 'zz';
        console.log(n);
    }

    var testF = testFun;
    //testF();
    

    // 自定义时钟
    var updateClock = function() {
        $scope.clock = new Date();
        // updateClock();
        $timeout(function() {
            updateClock();
        }, 1000);
    };
    updateClock();

    // 自定义时钟2，据说，这种更优化
    $scope.clock2 = {now:''};
    var updateClock2 = function(){
        $scope.clock2.now = new Date();
    }
    var t = 0;
    var c = setInterval(function(){
        $scope.$apply(updateClock2);
        t ++ ;
        // 10s后自动停止
        if(t == 10)clearInterval(c);
    },1000);
    updateClock2();
    

    function asyncGreet(name) {  
      var deferred = $q.defer();  
       
      setTimeout(function() {  
        // 因为此function 在未来的事件循环中异步执行,  
        // 我们需要把代码包装到到一个 $apply 调用中,以便正确的观察到 model 的改变  
        $scope.$apply(function() {  
          deferred.notify('即将问候 ' + name + '.');  
       
          if (okToGreet(name)) {  
            deferred.resolve('你好, ' + name + '!');  
          } else {  
            deferred.reject('拒绝问候 ' + name + ' .');  
          }  
        });  
      }, 1000);  
       
      return deferred.promise;  
    }  
       
    // var promise = asyncGreet('小漠漠');  
    // promise.then(function(greeting) {  
    //   alert('成功: ' + greeting);  
    // }, function(reason) {  
    //   alert('失败鸟: ' + reason);  
    // }, function(update) {  
    //   alert('收到通知: ' + update);  
    // });

    function okToGreet(n){
        var res = n ? true : false;
        return res;
    }

    $scope.show = true;
    $scope.getData = function(){
        // 异步请求promise
        publicSer.getData().then(function(res){
            $scope.datas = res;
            console.log($scope.datas);
        },function(err){
            console.log(err);
        },function(progress){
            $scope.progress = progress;
            $scope.show = false;
        })
    }
    

});
