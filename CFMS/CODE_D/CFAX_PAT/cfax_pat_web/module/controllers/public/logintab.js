
$(function(){
//滑动门
    $(".loginBox .loginCont:first").css("display","block");
    $(".loginBox .loginNav li").click(function(){
        $(this).addClass("now-2");
        $(this).siblings("li").removeClass("now-2");

        $(this).parents(".loginBox").find(".loginCont").css("display","none");
        var i=$(this).index();
        $(this).parents(".loginBox").find(".loginCont:eq("+i+")").css("display","block");

    });
})

