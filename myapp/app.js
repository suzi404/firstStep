var app = angular.module("app", ["ngAnimate", "ui.router", "angularFileUpload" ,'angularjs-dropdown-multiselect','mgcrea.ngStrap.collapse','ngmodel.format']).config(function($stateProvider, $urlRouterProvider ,$collapseProvider) {

    angular.extend($collapseProvider.defaults, {
        animation: 'am-flip-x'
    });
    $urlRouterProvider.otherwise("/main");

    $stateProvider
    .state("main", { url: "/main", templateUrl: "main.html" })
    .state("main.jsStr", { url: "/jsStr", templateUrl: "html/js/jsStr.html" })
    .state("main.jsBasis", { url: "/jsBasis", templateUrl: "html/js/jsBasis.html" })
    .state("main.jsObj", { url: "/jsObj", templateUrl: "html/js/jsObj.html" })
    .state("main.xss", { url: "/xss", templateUrl: "html/js/xss.html" })

    .state("main.test", { url: "/test", templateUrl: "html/angular/test.html" })
    .state("main.upload", { url: "/upload", templateUrl: "html/angular/upload.html" })
    .state("main.mulSelect", { url: "/mulSelect", templateUrl: "html/angular/mulSelect.html" })

    .state("main.css1", { url: "/css1", templateUrl: "html/css/css1.html" })
    .state("main.css_relative", { url: "/css_relative", templateUrl: "html/css/css_relative.html" })
    .state("main.css_down", { url: "/css_down", templateUrl: "html/css/css_down.html" })
    .state("main.css3", { url: "/css3", templateUrl: "html/css/css3.html" })

});

app.filter('currencyChs', function() {
    return function(value) {
        var C = {
            chineseNum: "零壹贰叁肆伍陆柒捌玖", //对应的数字
            nuit: "拾佰仟", //千位以内的单位
            nuitn: "万亿兆", //千位以上的单位
            intnum: "", //小数点前的整数
            numstr: "", //转换成大写汉字的字符串
            decimal: "", //小数点后面的数字
            decimalstr: "", //小数点后面的字符串
            numarr: [], //临时存放数字的数组
            start: function(number) {
                C.numstr = "";
                C.numarr = new Array();
                C.toarray(number);
            },
            toarray: function(number) {
                var str = String(number); //将数字强制转换成字符串进行操作
                if (str != '' && str.indexOf('.') != -1) { // 转换小数部分为大写数字
                    C.decimal = String(str.split('.')[1]);
                    str = str.split('.')[0];
                    C.intnum = str;
                    C.decimalChs();
                }
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
            decimalChs: function() {
                if (C.decimal != '') {
                    var n = C.decimal;
                    var len = n.length;
                    if (len >= 2 && n.charAt(1) != '0') {
                        n = n.substr(0, 2);
                        C.decimalstr = C.chineseNum.charAt(parseInt(n.charAt(0))) + (n.charAt(0) != 0 ? '角' : '') + C.chineseNum.charAt(parseInt(n.charAt(1))) + '分';
                        if (n.charAt(0) == 0 && (C.intnum == '' || C.intnum.charAt(parseInt(C.intnum.length - 1)) == '0')) {
                            C.decimalstr = C.chineseNum.charAt(parseInt(n.charAt(1))) + '分';
                        }
                    } else {
                        n = n.substr(0, 1);
                        C.decimalstr = C.chineseNum.charAt(parseInt(n.charAt(0))) + (n != 0 ? '角' : '');
                    }
                }
            },
            tomChinese: function() {
                if (C.numarr[0].length > 1 && C.numarr[0].charAt(0) == '0') { //删除首位为0
                    C.numarr[0] = String(parseInt(C.numarr[0]));
                }
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
                C.numstr = C.numstr != '' ? C.numstr + '圆' : ''; //加上单位圆
                if (C.decimalstr != '') {
                    if (C.numarr == [] || (C.numarr.length == 1 && C.numarr[0] == '0')) {
                        C.numstr = C.decimalstr;
                    } else {
                        C.numstr += C.decimalstr; //加上小数点后面的数字
                    }
                }
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
            }
        }
        C.start(value);
        return C.numstr;
    }

});
