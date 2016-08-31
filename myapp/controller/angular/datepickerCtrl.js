'use strict';

/* Controllers */

angular.module('app').controller('datepickerCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.today = function() { // 创建一个方法， 
        $scope.aaa = new Date(); // 定义一个属性来接收当天日期
    };
    $scope.today(); // 运行today方法
    $scope.clear = function() { //当运行clear的时候将dt置为空
        $scope.aaa = null;
    }
    $scope.open = function($event) { // 创建open方法 。 下面默认行为并将opened 设为true
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    }
    // $scope.minDate;
    $scope.disabled = function(date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6))
    }
    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date(); //3元表达式，没啥好说的
    }
    $scope.toggleMin();
    $scope.dateOptions = {
        // formatYear: 'yy',
        // startingDay: 1,
        // minDate: $scope.minDate
    }
    $scope.formats = ['dd-MMMM-yyyy', 'yyy/MM/dd', 'dd.MM.yyyy', 'shortDate']; //日期显示格式 
    $scope.format = $scope.formats[0]; // 将formats的第0项设为默认显示格式 
}]);
