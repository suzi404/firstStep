/**
 * Created by sui on 2016/7/6.
 */
var app = angular.module("app");
app.controller('menuCtrl',function($scope){
        $scope.changeClass = function(selector,rClass,aClass){
            selector.removeClass(rClass).addClass(aClass);
        }
        var dLabel = $('#dLabel>span>i');
    if (window.console) {
          console.log(dLabel);
    }
        $('#dLabel').on('click',function(){
            $scope.changeClass(dLabel,'icon-xiangxia','icon-xiangshang');
        });
        $('.dropdown-menu li').on('click',function(){
            $scope.changeClass(dLabel,'icon-xiangshang','icon-xiangxia');
            $('#dLabel em').html($(this).text());
            console.log($(this).text());
            return false;
        })


        var searchBtn = $('#search_btn');
        var search = $('.search');
        var input = $('.searchInput');
        var inputLeft = parseInt(input.css('Left'));
        var sIcon = $('#search_btn>i')
        searchBtn.on('click', function(){
           if(inputLeft == 175){
               input.animate({
                   opacity: 1,
                   left: '0px'
               }, 500)
               input.css('display','block');
               sIcon.addClass('sou-hover');
               return false;
           }
        })

    //搜索框
    $(".search-select .search_input").click(function(){
        var textVal = $(this).text();
//        $(".search_input").val(textVal);
        return false;
    });

       $(document).click(function(event){
           var tar = $(event.target).attr("class");
           var inputtext = $('#inputtext');//搜索框input的id
           var select = $('.search-select');
           if( tar != select , inputtext.val() == ""){
           input.animate({
               opacity: 0,
               left: '175px'
           }, 500)
           sIcon.removeClass('sou-hover');
           }
       })
    })

