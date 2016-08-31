'use strict';

/* Controllers */

angular.module('app').controller('mainCtrl', ['$rootScope', '$scope','$anchorScroll','$location','$state', function($rootScope, $scope,$anchorScroll,$location,$state) {
    $scope.panels = [{
        "title": "angular",
        "body": [
            { 'name': '测试', 'url': 'main.test' },
            { 'name': '文件上传', 'url': 'main.upload' },
            { 'name': '多选下拉框', 'url': 'main.mulSelect' },
            { 'name': '时间控件', 'url': 'main.datepicker' }
        ]
    }, {
        "title": "js相关",
        "body": [
            { 'name': 'js字符串函数', 'url': 'main.jsStr' },
            { 'name': 'js数组、对象函数', 'url': 'main.jsObj' },
            { 'name': 'js基础', 'url': 'main.jsBasis' },
            { 'name': 'xss攻击', 'url': 'main.xss' }
        ]
    }, {
        "title": "css知识点",
        "body": [
            { 'name': 'input占满剩余宽度', 'url': 'main.css1' },
            { 'name': 'relative和absolute', 'url': 'main.css_relative' },
            { 'name': '相对冷门的css属性', 'url': 'main.css_down' },
            { 'name': 'CSS3新属性', 'url': 'main.css3' },
            { 'name': '遮罩层', 'url': 'main.css2' }
        ]
    }];
    $scope.panels.activePanel = [];

    $scope.jump = function(x){
        $state.go(x);
        // anchorFun();
    }
    // function anchorFun(){
    //     $location.hash('main');
    //     $anchorScroll();
    //     $location.hash('');
    // }
}]);
