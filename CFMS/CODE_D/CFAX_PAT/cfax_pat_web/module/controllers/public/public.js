//解决兼容IE9 placeholder
function checkPlaceholder(){
    //判断浏览器是否支持placeholder属性
    supportPlaceholder='placeholder'in document.createElement('input'),

        placeholder=function(input){

            var text = input.attr('placeholder'),

                defaultValue = input.defaultValue;

            if(!defaultValue){

                input.val(text).addClass("phcolor");
            }

            input.focus(function(){
                if(input.val() == text){

                    $(this).val("");
                }
            });


            input.blur(function(){

                if(input.val() == ""){

                    $(this).val(text).addClass("phcolor");
                }
            });

            //输入的字符不为灰色
            input.keydown(function(){

                $(this).removeClass("phcolor");
            });
        };

    placeholder2=function(input){

        var text = input.attr('placeholder'),

            defaultValue = input.defaultValue;

        if(!defaultValue){

            input.val(text).addClass("phcolor");
        }

        input.focus(function(){

            if(input.val() == text){

                $(this).val("");
            }
        });


        input.blur(function(){
            if(input.val() == ""){
                $(this).attr("type","text")
                $(this).val(text).addClass("phcolor");
            }
        });

        //输入的字符不为灰色
        input.keydown(function(){
            $(this).attr("type","password")
            $(this).removeClass("phcolor");
        });
    };
    //当浏览器不支持placeholder属性时，调用placeholder函数
    if(!supportPlaceholder){
        $('textarea').each(function(){
            text = $(this).attr("placeholder");
            placeholder($(this));
        })
        $('input').each(function(){

            text = $(this).attr("placeholder");
            if($(this).attr("type") == "text"){
                placeholder($(this));
            }else if($(this).attr("type") == "password"){
                $(this).attr("type","text")
                placeholder2($(this));
            }

        });
    }

}

// 兼容IE6的弹层  调用方法  $("#step21").layer(); $("#step21")为要弹出来的弹窗
$.fn.layer = function(id){
    var isIE = (document.all) ? true : false;
    var isIE6 = isIE && !window.XMLHttpRequest;
    //var position = !isIE6 ? "fixed" : "absolute";
    //var position = !isIE6 ? "absolute" : "absolute";
    //如果页面太长出现滚动条，则需要设置成fixed才会在屏幕居中，modify by ck
    var position = !isIE6 ? "fixed" : "fixed";
    var containerBox = jQuery(this);
    containerBox.css({"z-index":id,"display":"block","position":position ,"top":"50%","left":"50%","margin-top": -(containerBox.height()/2)+ "px","margin-left": -(containerBox.width()/2) + "px"});
    var layer=jQuery("<div id='layer'></div>");
    layer.css({"width":"100%","height":"100%","position":"fixed","position":position,"top":"0px","left":"0px","background-color":"#000","z-index":id-1,"opacity":"0.4"});
    layer.css({"position":"fixed"});
    jQuery("body").append(layer);
    function layer_iestyle(){
        var maxWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
        var maxHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";

        layer.css({"width" : maxWidth , "height" : maxHeight });
    }
    function containerBox_iestyle(){
        var marginTop = jQuery(document).scrollTop - containerBox.height()/ 2 + "px";
        var marginLeft = jQuery(document).scrollLeft - containerBox.width()/ 2 + "px";
        containerBox.css({"margin-top" : marginTop , "margin-left" : marginLeft });
    }
    if(isIE){
        layer.css("filter","alpha(opacity=40)");
    }
    if(isIE6){
        layer_iestyle();
        containerBox_iestyle();
    }
    jQuery("window").resize(function(){
        layer_iestyle();
    });

    //layer.click(function(){
    //    containerBox.hide();
    //    jQuery(this).remove();
    //});

    $(".close").click(function(){
        containerBox.hide();
        layer.remove();
    });
};


/*保存成功并跳转*/

function runTo(url,time){
    downTime(url,time);
    $("#runNow").click(function(){
        window.location.href=url;
        $("#user_add_success").hide();
        $("#layer").remove();
    });
}
function downTime(url,time){
    setTimeout(function(){
        $("#user_add_success").hide();
        $("#layer").remove();
        window.location.href=url;

    },time);
}

$.fn.extend({
    resetValue: function () {
        $(this).find(":text").val("");
        $(this).find("select").val($(this).find("select option:first").val());
        $(this).find("textarea").val("");
    }
});

//组装报文头
function getPublicMess(){
    //var mes={
    //    "headSysNo":1,
    //    "headUserType":2,
    //    "headUserNo":"88",
    //    "headLogName":4,
    //    "headChannel":5,
    //    "token":6
    //};
    var mes={
        "headSysNo": $.cookie('headSysNo'),
        "headUserType":$.cookie('headUserType'),
        "headUserNo":$.cookie('headUserNo'),
        "headLogName":$.cookie('headLogName'),
        "headChannel":$.cookie('headChannel'),
        "token":$.cookie('token'),
        "sessionFlag":$.cookie('sessionFlag')
    };
    return mes;
}

function getDateTime(dateStr){
    if(dateStr==null || dateStr==''){
        return dateStr;
    }
    return new Date(dateFormat(dateStr+" 00:00:00")).getTime()/1000;
}
function dateFormat(dateStr){
    if(dateStr==null || dateStr==''){
        return dateStr;
    }
    return dateStr.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
}
function timeFormat(timeStr){
    if(timeStr==null || timeStr==''){
        return timeStr;
    }
    return timeStr.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
}
function getDateStr(dateStr){

    if(!/(\d{4})-(\d{2})-(\d{2})/.test(dateStr)){
        return "";
    }
    if(dateStr==null || dateStr==''){
        return dateStr;
    }
    return dateStr.replace(/-|:|\s/g, "");
}

function getToday(){
    var today=new Date();
    return  today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
}

/*tab更换显示样式1*/
/*function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}*/


function returnTop(time ,id) {
    // 窗口滚动检测
    var scroll = $("div[ui-view]").scrollTop();
  /*  window.scrollBy(0, -100);//Only for y vertical-axis*/
   /* $("div[ui-view]").scrollTop(0)*/
    if ( scroll> 0) {
        $("div[ui-view]").animate({scrollTop: '0px'}, 300);
      /*  setTimeout('returnTop()', time);*/

    }
}

function returnTop2(time ,id) {
    // 窗口滚动检测
    var scroll = $("div[ui-view]").scrollTop();
    if ( scroll> 0) {
        $("div[ui-view]").scrollTop(0);

    }
}

/**
 *
 * 解码unicode
 * @param str
 * @returns {*}
 */
var hexToDec = function(str) {
    str=str.replace(/\\/g,"%");
    return unescape(str);
}
/*
$(document).on("keyup","textarea",function(){
    $(this).val($(this).val().substr(0,parseInt($(this).attr("maxlength"))));
});*/
