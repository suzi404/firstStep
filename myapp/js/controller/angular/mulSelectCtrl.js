'use strict';

/* Controllers */

angular.module('app').controller('mulSelectCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.selectedIcon = 'Camera';
    $scope.selectedIcons = [];
    $scope.icons = [
        { "value": "Gear", "label": "<i class=\"fa fa-gear\"></i> Gear" },
        { "value": "Globe", "label": "<i class=\"fa fa-globe\"></i> Globe" },
        { "value": "Heart", "label": "<i class=\"fa fa-heart\"></i> Heart" },
        { "value": "Camera", "label": "<i class=\"fa fa-camera\"></i> Camera" }
    ];

    function clearObject(object) {
        for (var prop in object) {
            delete object[prop];
        }
    }

    $scope.example13model = {};
    if(_.isEmpty($scope.example13model)){
        console.log(111);
    }
    
    $scope.getVal = function(){
        console.log($scope.example13model.label);
    }


    var obj = _.fromPairs([['fred', 30], ['barney', 40]]);
    console.log(obj);

    var array = [1, 2, 3, 1, 2, 3];

    _.pull(array, 1, 3);
    console.log(array);

    var array = [{ 'x': 1 , 'y' : 2}, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];

    _.pullAllBy(array,[{'y':2}],'y');
    console.log(array);

    var users = [
      { 'user': 'barney',  'age': 36, 'active': true },
      { 'user': 'fred',    'age': 40, 'active': false },
      { 'user': 'pebbles', 'age': 1,  'active': true }
    ];

    console.log(_.find(users, { 'active': true }));
    console.log(users);
    console.log(_.filter(users, { 'age': 1, 'active': true }));
    console.log(users);

    var oldest = _.chain(users)
      .max(function(o){
        return o.age;
      })
      .value();

    console.log(oldest);

    var yougest = _.chain(users)
      .min(function(o){
        return o.age;
      })
      .value();

    console.log(yougest);

    $scope.example13data = [
        {id: 1, label: "David",key:8},
        {id: 2, label: "Jhon",key:1},
        {id: 3, label: "Lisa",key:2},
        {id: 4, label: "Nicole",key:7},
        {id: 5, label: "Danny",key:3}
    ];
// clearObject($scope.example13data[0]);
    $scope.example13settings = {
        smartButtonMaxItems: 3,
        showCheckAll:false,
        showUncheckAll:false,
        selectionLimit:1,
        displayProp: 'label',
        idProp:'label',
        externalIdProp:'label'
    };

    function myFunction() {
        var C = {
            chineseNum: "零壹贰叁肆伍陆柒捌玖", //对应的数字
            nuit: "拾佰仟", //千位以内的单位
            nuitn: "万亿兆", //千位以上的单位
            numstr: "", //转换成大写汉字的字符串
            numarr: [], //临时存放数字的数组
            start: function(number) {
                C.numstr = "";
                C.numarr = new Array();
                C.toarray(number);
            },
            toarray: function(number) {
                var str = String(number); //将数字强制转换成字符串进行操作
                var len = str.length;
                var es = 0;
                if (len >= 4) { //千位以上的时候
                    es = len % 4 == 0 ? 4 : len % 4;
                    if (len == 4) { //如果为4位数
                        C.numarr.push(str); //将值放入数组
                        C.tomChinese(); //去转换成汉字 
                        return;
                    }
                    C.numarr.push(str.substring(0, es)) //每4位分开放进数组 开头位数为当前字符串长度对4求余的值
                    str = str.substring(es, len) // 丢掉前面放入数组的部分
                    C.toarray(str) //再次运行 直到剩下最后4位 
                } else {
                    str = str.substring(es, len);
                    C.numarr.push(str);
                    C.tomChinese();
                }
            },
            tomChinese: function() {
                var len = C.numarr.length; //numarr是以万亿兆为单位划分出来的数组
                //判断传入的数字是否超出范围 最大为千兆（1兆是不是等于1万亿？）
                if (len > 4) {
                    alert("亲，您写的数值太大了，所有的人民币加起来也没这么多啊！");
                    return false;
                }

                for (i = 0; i < len; i++) {
                    var l = C.numarr[i].length; // 获取数组下标为i的字符串的长度
                    for (j = 0; j < C.numarr[i].length; j++) {
                        var s = C.chineseNum.charAt(parseInt(C.numarr[i][j])); //将字符串中的数字转换成大写汉字
                        var t = s == "零" ? "" : j < 3 ? C.nuit.charAt(l - j - 2) : ""; //将千百十匹配给对应的值 
                        C.numstr += s + t; //整合成一个带有单位的数 比如 三百
                    }
                    C.numstr += i <= C.nuitn.length ? C.nuitn.charAt(len - i - 2) : ""; //将万亿兆匹配到对应的位置
                }
                C.delzo(); //删除零的操作
            },
            delzo: function() {
                if (C.numstr[C.numstr.length - 1] == "零" && C.numstr.length > 1) { //如果字符串最后一位为零且字符串长度大于一位数
                    C.numstr = C.numstr.substring(0, C.numstr.length - 1) //删除最后一位
                    C.delzo(); //再次检测 
                    return;
                }
                for (var i = 0; i < C.numstr.length; i++) {
                    //字符串的倒数第一的位置开始已经没有连续的“零”字 此时对字符串中间连续的零合并
                    if (C.numstr[i] == "零" && (C.numstr[i + 1] == "零" || C.nuitn.indexOf(C.numstr[i + 1]) >= 0)) {
                        //如果当前下标的字符为零和下标+1的位置为零或者万亿兆中的一个 
                        //C.numstr.replace(C.numstr[i],"");//竟然会报错 不晓得为什么。。。
                        C.numstr = C.numstr.substring(0, i) + C.numstr.substring(i + 1, C.numstr.length)
                            //则去掉当前下标位置的零字
                        C.delzo(); //再次检查
                        return;
                    }
                }
                console.log(C.numstr); //输出结果
            }
        }
        var test = document.getElementById("demo").value;

        C.start(test);
        document.getElementById("test").value = C.numstr;


    }
}]);
