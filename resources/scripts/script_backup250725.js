$(document).ready(function(){
    if(navigator.userAgent.indexOf("Trident") > 0){
        if(confirm("해당 사이트는 Internet Explorer 브라우저를 지원하지 않습니다. 확인을 클릭하시면 Edge브라우저로 연결됩니다.")){
            window.location = 'microsoft-edge:' + 'http://jonsoft.co.kr/'
            setTimeout(function(){
                window.open('','_self').close();
            }, 1)
        }else{
            window.open('','_self').close();
        }
    }else if(/MSIE \d |Trident.*rv:/.test(navigator.userAgent)){
        if(confirm("해당 사이트는 Internet Explorer 브라우저를 지원하지 않습니다. 확인을 클릭하시면 Edge브라우저로 연결됩니다.")){
            window.location = 'microsoft-edge:http:' + 'http://jonsoft.co.kr/'
            setTimeout(function(){
                window.open('','_self').close();
            }, 1)
        }else{
            window.open('','_self').close();
        }
    }

    // $('html, body').animate({
    //     scrollTop: 0
    // }, 1);
    setTimeout(function () {
        $("#header").removeClass("active")
        $('#loading').remove();
        $('#loading').off('scroll touchmove mousewheel');
    }, 1)

    $(".fndYr").text(new Date().getFullYear() - 2016 + 1)

    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });
    $(".sidebar-control").click(function(){
        $(this).toggleClass("active")
        $("#header").toggleClass("active")
    })
    
    // NOTE: 연혁이 있는 연도 자동으로 추가
    for(let i = 1; i <= $(".hstry-wrap ul").length; i++){
        $(".year-wrap ul").append('<li data-show-year='+$(".hstry-wrap ul:nth-child("+i+")").data("year")+'>'+$(".hstry-wrap ul:nth-child("+i+")").data("year")+'</li>')
        if(i == 1){$(".year-wrap ul li:first-child").addClass("active"); $("input[name='show-year']").val($(".hstry-wrap ul").data("year")); $("input[name='show-st']").val(1)}
    }
    let input_year = $("input[name='show-year']")
    let input_st = $("input[name='show-st']")
    // NOTE: 표시되는 연도를 알려주는 인풋의 값이 변경되면, 연도 액티브 수정 및 해당 연도의 연혁 액티브, st 1로 초기화
    input_year.change(function(){
        let showed_year = $(this).val()
        $(".year-wrap li[data-show-year="+showed_year+"], .hstry-wrap ul[data-year="+showed_year+"]").addClass("active").siblings().removeClass("active")
        hstryLiHeight_sum = 0;
        for(let hstryLiCnt = 1; hstryLiCnt <= $(".hstry-wrap ul.active li").length; hstryLiCnt++){
            let hstryLiHeight = $(".hstry-wrap ul.active li:nth-child("+hstryLiCnt+")");
            hstryLiHeight_sum = hstryLiHeight_sum + hstryLiHeight.innerHeight()
            if(hstryLiHeight_sum <= hstryLiHeight_max){
                hstryLiHeight.attr("data-st", 1)
            }else if(hstryLiHeight_sum <= hstryLiHeight_max * 2){
                hstryLiHeight.attr("data-st", 2)
            }else if(hstryLiHeight_sum <= hstryLiHeight_max * 3){
                hstryLiHeight.attr("data-st", 3)
            }else if(hstryLiHeight_sum <= hstryLiHeight_max * 4){
                hstryLiHeight.attr("data-st", 4)
            }
        }
        $(".hstry-dots > div").remove()
        let hstryDotsCnt_max = $(".hstry-wrap ul.active li:last-child").data("st");
        for(let hstryDotsCnt = 1; hstryDotsCnt <= hstryDotsCnt_max; hstryDotsCnt++){
            $(".hstry-dots").append('<div data-st="'+hstryDotsCnt+'"></div>')
            if(hstryDotsCnt == 1){$(".hstry-dots > div").addClass("active")}
        }
        input_st.val(1).trigger('change');

        if(input_st.val() == 1){
            if($(".hstry-wrap ul.active").next().data("year") == undefined){$(".hstry-arrow img:last-child").addClass("disabled")}else{$(".hstry-arrow img:last-child").removeClass("disabled");}
            if($(".hstry-wrap ul.active").prev().data("year") == undefined){$(".hstry-arrow img:first-child").addClass("disabled")}else{$(".hstry-arrow img:first-child").removeClass("disabled");}
        }
    })
    input_st.change(function(){
        let showed_st = $(this).val()
        $(".hstry-wrap li").hide()
        $(".hstry-wrap li[data-st="+showed_st+"]").show()
        $(".hstry-dots div[data-st="+showed_st+"]").addClass("active").siblings().removeClass("active")
    })
    $(".year-wrap li").click(function(){input_year.val($(this).data("show-year")).trigger('change');})
    $(".hstry-dots").on("click", "div", function(){input_st.val($(this).data("st")).trigger('change');})
    $(".hstry-arrow img:first-child").click(function(){
        let prevYear = $(".hstry-wrap ul.active").prev().data("year");
        if(prevYear != undefined){
            if(input_st.val() <=  1){
                input_year.val(prevYear).trigger("change")
                input_st.val($(".hstry-wrap ul.active li:last-child").data("st")).trigger("change")
            }else{input_st.val(Number(input_st.val())-1).trigger("change")}
        }
    })
    $(".hstry-arrow img:last-child").click(function(){
        let nextYear = $(".hstry-wrap ul.active").next().data("year");
        if(nextYear != undefined){
            if(input_st.val() >=  $(".hstry-wrap ul.active li:last-child").data("st")){
                input_year.val(nextYear).trigger("change")
            }else{input_st.val(Number(input_st.val())+1).trigger("change")}
        }
    })
    if($("body").width() >= 481){
        hstryLiHeight_max = 620;
        $(".hovered").mouseover(function(){$(".hovered").removeClass("active"); $(this).addClass("active")}).mouseout(function(){$(".hovered").removeClass("active");})
    }else{
        hstryLiHeight_max = 300;
        $(".section-4").on("click", ".hovered", function(){ $(".hovered").removeClass("active"); $(this).addClass("active")})
        $(".section-4").on("click", ".hovered.active", function(){$(".hovered").removeClass("active");})
    }
            














































    // $("#map-wrap")
    for(let ol = 1; ol <= $("#map-wrap > div  > div > div").length; ol++){
        $("#map-wrap ul").append("<li  data-place='"+ol+"'>"+$("#map-wrap > div  > div div:nth-of-type("+ol+") .local-title").text()+"</li>")
        if(ol == 1){$("#map-wrap li").addClass("active")}
    }
    $("#map-wrap li").click(function(){
        $(this).addClass("active").siblings().removeClass("active")
        $("div.section-7 #map-wrap > div > div").css({"top":"calc(-428px * "+$(this).attr("data-place")+" + 428px)"})
    })
    $(".modalClose").click(function(){
        $(".cus-modal").hide()
        $("body").css({"overflow":"unset"})
    })
    $(".moveto").click(function(){
        $($(this).attr("data-moveto")).addClass("aos-animate")
        if($(this).attr("data-moveto") == "#contact-ul"){
            $('html').animate({
                scrollTop: $($(this).attr("data-moveto")).offset().top
            }, 400)
        }else{
            $('html').animate({
                scrollTop: $($(this).attr("data-moveto")).offset().top - 72
            }, 400)
        }
    })

    $(".year-wrap li.active").trigger("click");
    $(".hstry-dots li.active").trigger("click");
})