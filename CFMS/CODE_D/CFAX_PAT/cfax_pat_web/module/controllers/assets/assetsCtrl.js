app.controller('assetsCtrl',['$scope', 'publicService', 'assetSer', function($scope, publicService, assetSer) {

    //获得当天日期
    $scope.toDate = function () {
        var d = new Date();
        var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        return today;
        // console.log(today);
    }
    //计算几天后日期方法
    $scope.newDay = function (d) {
        var nowTime = new Date();
        var newDate = new Date();
        var newTime = nowTime.getTime() - (d * 24 * 60 * 60 * 1000);
        newDate.setTime(newTime);
        var endTime = newDate.toLocaleString();
        var dArr = endTime.split(" ")[0];
        dArr = dArr.replace(/\//g, '-');
        return dArr;
    };

    $scope.test = 0;
    $scope.bus = 0;
    $scope.mon = 0;
    $scope.ins = 0;
    $scope.lis = 0;

    var proType;//1
    var minProMoney;//500
    var maxProMoney;//1000
    var minFinDate;//20160723
    var maxFinDate;//20160722
    var strListDate;
    var endListDate;

    //查询方法
    /*    $scope.queryProProducts = function () {
     publicService.post("proProductMgt.do", "queryProProducts", $scope.prame).success(function (data) {
     console.log($scope.prame)
     if (data.errorCode == '0000') {
     $scope.productList = data.list;
     } else {
     publicService.dialog('dialogCtrl','dialog/prompt.html',data.errorMsg);
     }
     })
     };*/

    $scope.showDiv = true;
    $scope.queryProProducts = function () {
        //查询条件
        $scope.prame = {
            "proTypes": proType,//业务类型
            "minProMoney": minProMoney,//最小金额
            "maxProMoney": maxProMoney,//最大金额
            "minFinancDate": minFinDate,//融资开始日期
            "maxFinancDate": maxFinDate,//融资结束日期
            "strListingDate": strListDate,//挂牌开始日期
            "endListingDate": endListDate,//挂牌结束日期
            "isDelete": "0",
            "productTypeNo": "003",
            "isReComd":"1"
        };

        assetSer.queryAssetList($scope.prame,function(data){ 
            if (data.errorCode == '0000') {
                $scope.recomList = data.recomList;
                if(data.recomList.length > 0){
                    $scope.showDiv = false;
                }else{
                    $scope.showDiv = true;
                }
            } else {
                publicService.dialog('dialogCtrl','dialog/prompt.html',data.errorMsg);
            }
        })
    }
    //总查询
    $scope.queryProAll = function(){
        $scope.data = {
            "productNo": "",
            "currVersion":"",
            "isDelete":"",
            "productName":"",
            "productTypeNo":"3",
            "productStatus":"",
            "isDelete": "0",
            "productTypeNo": "003",
            "isReComd":"1"
        };
        assetSer.queryAssetList($scope.data,function(data){
            if (data.errorCode == '0000') {
                $scope.recomList = data.recomList;
                if(data.recomList.length > 0){
                    $scope.showDiv = false;
                }else{
                    $scope.showDiv = true;
                }
            } else {
                publicService.dialog('dialogCtrl','dialog/prompt.html',data.errorMsg);
            }
        })
    };

    //业务类型查询
    $scope.selectBusin = function(v){
        proType = v; 
        $scope.queryProProducts();
    };
    //挂牌金额查询
    $scope.selectMoney = function(minM,maxM){
        minProMoney = minM;
        maxProMoney = maxM;
        $scope.queryProProducts();
    };
    //融资期限查询
    $scope.getInsDate = function(minD,maxD){
        minFinDate = minD;
        maxFinDate = maxD; 
        $scope.queryProProducts();
    };
    //挂牌日期查询
    $scope.getLisDate = function(strD,endD){
        strListDate = strD;
        endListDate = endD;
        $scope.queryProProducts();
    };
    //业务类型
    $scope.businData = [
        {"type": "不限","value": "0"},
        {"type": "信托收益转让","value": "1"},
        {"type": "资产收益权转让", "value": "2"}
    ];

    //挂牌金额
    $scope.moneyData = [
        {"type": "不限", "minPro": "", maxPro: ""},
        {type: "500~1000万元", minPro: "500", maxPro: "10000000"},
        {type: "1000~1亿元", minPro: "1000", maxPro: "100000000"},
        {type: "1亿~10亿元", minPro: "100000000", maxPro: "1000000000"},
        {type: "10亿元以上", minPro: "1000000000", maxPro: ""}
    ];

    //融资期限
    $scope.interestData = [
        {type: "不限", minFin: "", maxFin: ""},
        {type: "1个月以内（含）", minFin: $scope.toDate(), maxFin: $scope.newDay(30)},
        {type: "1个月~3个月（含）", minFin: $scope.toDate(), maxFin: $scope.newDay(90)},
        {type: "3个月~6个月（含）", minFin: $scope.toDate(), maxFin: $scope.newDay(180)},
        {type: "6个月~1年（含）", minFin: $scope.toDate(), maxFin: $scope.newDay(360)},
        {type: "1年以上", minFin: $scope.toDate(), maxFin: ""}
    ];

    //挂牌日期
    $scope.ListingDate= [
        {type: "不限", strDay: "", endDay: ""},
        {type: "最近一周", strDay: $scope.toDate(), endDay: $scope.newDay(7)},
        {type: "最近一月", strDay: $scope.toDate(), endDay: $scope.newDay(30)},
        {type: "最近三月", strDay: $scope.toDate(), endDay: $scope.newDay(90)},
        {type: "最近半年", strDay: $scope.toDate(), endDay: $scope.newDay(180)}
    ];
    //$scope.queryProAll();
    $scope.queryProProducts();

    //推荐资产项目跳转到详情页面
    $scope.turnAssetDetails2 = function(obj){
        window.location.href = "#/home/assetDetails_2/"+obj.pro.productNo;
    }
}]);