'use strict';

/* Controllers */

angular.module('app').controller('jsBasisCtrl', ['$rootScope', '$scope',  function($rootScope, $scope) {




    /**
     * this
     */
    console.log(this);
    console.log(window);

    // 获取当前元素的坐标
    var h1 = document.getElementsByTagName('h1');
    // var coord = h1.offsetTop;
    var coord = $('h1').offset().top;
    console.log(coord);
    /**
     * js基础类型和相关的判断方法
     * string、number、boolean、undefined 值类型
     * array、object、null、function  new 引用类型
     */
    // cate();
    
    
    function cate(){
        //值类型判断很简单，typeof
        console.log('值类型判断：');
        //在==情况下，null和undefined值是一样的
        if(d == null)console.log('d的值为null或undefined');
        if(h == null)console.log('h的值为null或undefined');
        var a = 'str', b = 11, c = false, d = undefined;
        console.log(typeof(a));
        console.log(typeof(b));
        console.log(typeof(c));
        console.log(typeof(d));
        console.log(typeof(e));

        //引用类型中，绝大部分用typeof判断都是对象，只有function判断是正确
        console.log('引用类型判断：');
        var f = [], g = {}, h = null, i = function(){}, j = new Number(10);
        console.log(typeof(f));
        console.log(typeof(g));
        console.log(typeof(h));
        console.log(typeof(i));//所以typeof也可以判断function
        console.log(typeof(j));

        //数组用两个连续的arr instanof Object和arr instanceof Array;两个都是true就是数组了
        //前一个判断正确，后一个判断错误，就是对象了
        console.log(f instanceof Object);
        console.log(f instanceof Array);
        console.log(g instanceof Object);

        console.log(g instanceof Array);
        console.log(h instanceof Object);
        console.log(j instanceof Object);
        console.log('isArray');
        console.log(Array.isArray(a));
        console.log(Array.isArray(b));
        console.log(Array.isArray(c));
        console.log(Array.isArray(d));
        console.log(Array.isArray(f));
        console.log(Array.isArray(g));
        console.log(Array.isArray(h));
        console.log(Array.isArray(i));
        console.log(Array.isArray(j));

    }
    
}]);
