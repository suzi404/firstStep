'use strict';

/* Controllers */

angular.module('app').controller('xssCtrl', ['$rootScope', '$scope',  function($rootScope, $scope) {

    // 判断当前用户的系统类型和浏览器类型
    var agent = navigator.userAgent.toLowerCase() ;
    // console.log(agent);
    
    /**
     * indexOf函数
     * 判断item在str中的位置
     * 用法：  str.indexOf(item)
     * 返回：如果str中有item，返回对应的下标值(第一个位置为0)；如果没有则返回-1
     *
     */
    var str = '123547';
    console.log(str[3]);
    //console.log(str.indexOf(8));

    /**
     * ||和&&运算符
     * 前者找true，后者找false
     */
    $scope.reNum = function(){
        console.log($scope.num1);
        console.log($scope.num2);
        console.log($scope.num3);
        $scope.testNum = function(){
            return $scope.num1 || $scope.num2 && $scope.num3;
        }
        $scope.testNum = $scope.testNum();
    }

    /**
     * slice
     * 截取字符串或数组
     * 用法：str.slice(start,end);
     * 返回：返回起始位置到结束位置之间的字符串或数组。
     * 说明：start为负数时，从起始位置开始，end也同理。
     * 注意：当start为1是，从第一个位置开始，但不包括1，end也同理。
     */
    // sliceTest();
    function sliceTest(){
        var arr = ['a','b','c','d','e','f'];
         var res = arr.slice(1,-1);
         console.log(res);
         var str = 'abcdef';
         res = str.slice(-2,-1);//截取倒数第二个字符
         console.log(res);
         var l = str.length;// 截取倒数第一个字符
         res = str.slice(l-1,l);
         console.log(res);
    }
     

 
    /**
     * toString()
     * 转换为字符串
     * 用法：arr.toString(num);
     * 说明：num为基数，可以选择转换是2--二进制，10--10进制等等，不填默认为10进制。只有数字类型会被转换，别的不变
     * 返回：字符串
     * 注意：null和defined不能转换，bool类型的会转换为true或false
     */
    // toStringTest();
    function toStringTest(){
        var arr = [1,2,'a'];
        var res = arr.toString(2);
        console.log(res);
        var str = null || '';
        res = str.toString();
        console.log(res);
        var str = false;
        res = str.toString();
        console.log(res);
        var num = 100;//num = '100',字符串类型的数字时，并不会转换
        res = num.toString(8);
        console.log(res);
    }

    // var定义的是局部变量，在函数内可以调用。但是函数内var定义的无法再外部调用;在原生js中
    // 不用var定义的变量是全局变量，但是在angularjs中会报错。
    var a = 1;
    function fun(){
        console.log(a);
        var b = 1;
        a += 1;
        c = 'x';
        console.log(b);
        console.log(c);
    }
    // console.log(c);
    // fun();
    // console.log(a);
}]);
