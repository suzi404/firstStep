/**
 * Created by sui on 2016/7/7.
 */
app.controller('indexTabCtrl',function($scope){
    $scope.$tab = $("#tab li");
    $scope.$con = $("#con");
    //alert($scope.$tab )
    $scope.$tab.on('click',function(e) {
        e.stopPropagation();
        var t = $(this).index();
        $scope.$tab.removeClass();
        $(this).addClass('active');
        $scope.$con.children('div').hide();
       $scope.$con.children('div').eq(t).show();

    })

})