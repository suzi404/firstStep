/**
 * Created by sui on 2016/7/11.
 */
app.controller('assetsCtrl',function($scope){
    $scope.$ass = $(".assets .assets_ul li");
    $scope.$hui = $(".assets .assets_ul .hui");
    $scope.$ass.on('click',function(e) {
        e.stopPropagation();
        $(this).addClass("act");
        $(this).siblings("li").removeClass("act");
    })
    $scope.$hui.on('click',function(e) {
        e.stopPropagation();
        $('.assets .assets_ul li').siblings("li").removeClass("act");
        $('.assets .assets_ul .at').addClass("act");
    })
})