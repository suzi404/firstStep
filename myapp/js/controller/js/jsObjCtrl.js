'use strict';

/* Controllers */

angular.module('app').controller('jsObjCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

    var arr = ['a', 'b', 'c', 'd', 'e'];
    var str = 'abcde';
    var res;

    /**
     * indexOf，判断值在数组和字符串中的位置
     * 返回：返回位置的key，如果查找不到，则返回-1
     */
     console.log(arr.indexOf('e'));
     console.log(str.indexOf('a'));

    /**
     * sort数组排序
     * arr.sort()默认是字母顺序排列，数字默认是首数字大小排序，也就是:22,3,52,6
     * 返回：排序后的数组，原数组会被修改
     */
    // arrSort();
    function arrSort() {
        var arr = ['22', '33', '6', '9', '12', '-12', '-2', 0];
        arr.sort(function(a, b) {
            return a - b;
        })
        console.log(arr);
        arr.forEach(function(i, k) {
            console.log(k + '-' + i);
        })
    }

    /**
     * arr.join('str');
     * 把数组的值用符号连接成一个字符串
     * 返回：拼接的一个字符串，原数组不改变
     */
    //arrJoin();
    function arrJoin() {
        res = arr.join('-');
        console.log(res);
        console.log(arr);
    }

    /**
     * push()       数组尾部添加元素
     * unshift()    数组头部添加元素
     */
    // arrAdd();
    function arrAdd() {
        var arr = ['a', 'b', 'c'];
        arr.push('x');
        console.log(arr);
        arr.unshift('y');
        console.log(arr);
        arr[arr.length] = 'z';
        console.log(arr);
    }

    /**
     * pop()    删除数组尾部元素
     * shift()  删除数组头部元素
     */
    // arrdel();
    function arrdel() {
        var arr = ['a', 'b', 'c', 'd', 'e'];
        console.log(arr);
        arr.pop();
        console.log(arr);
        arr.shift();
        console.log(arr);
        arr.length -= 1;
        console.log(arr);
    }

    /**
     * splice
     * 删除、替换、截取数组
     * 用法：arr.splice(index、num、str1,str2....)
     * 说明：从下标index开始，截取num个值，然后str插入。
     *         当num为1，str值为空，相当于删除相应值。
     *         当num为1，str不为空，相当于替换了相应值。
     *         当num为0，相当于添加了str。
     * 返回：返回截取的数组；
     * 注意：原数组会被改变
     */
    // spliceTest();
    function spliceTest() {
        var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        var res = arr.splice(1, 2, '1', '2');
        console.log(res);
        console.log(arr);
        arr.splice(1, 1);
        console.log(arr);
        arr.splice(1, 1, 'z');
        console.log(arr);
    }


    //使用较少的方法
    //arrTest()
    function arrTest() {
        // filter过滤数组
        var arr = ['a', 'b', 'c', 'd', 'e'];
        var res;
        res = arr.filter(function(v,k){return k % 2 == 0});
        console.log(res);

        // map 修改数组
        var arr = ['a', 'b', 'c', 'd', 'e'];
        var res;
        res = arr.map(function(v,k){return v.toUpperCase();});
        console.log(res);

        // reverse颠倒数组顺序,原数组顺序也会改变
        var arr = ['a', 'b', 'c', 'd', 'e'];
        console.log(arr.reverse());
        console.log(arr);

        //every判断数组中所有的值都满足某条件
        var arr = [1,2,333,55,6];
        console.log(arr.every(function(x){ return x == 1;}));
        console.log(arr.every(function(x){ return x%1 == 0;}));

        //some判断数组中至少一个满足条件的值
        console.log(arr.some(function(x){return x == 1}));
        console.log(arr.some(function(x){return x < 1}));

    }

}]);
