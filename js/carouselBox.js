(function ($) {
    $.fn.carouselBox = function (options) {
        var infoArr  = options.infoArr, // 图片提示信息
            inOut    = options.inOut, // 图片切换效果
            prevNext = options.prevNext, // 左右切换键是否显示
            duration = (options.duration == "default" ? 2500 : options.duration), // 图片轮播间隔时间
            caroselBoxWidth  = $(".caroselBox").width(), // 盒子的宽度
            caroselBoxHeight = $(".caroselBox").height(), // 盒子的高度
            curIndex = 0,
            imgLen   = $('.img').length;

        // 当设置的盒子高度小于180px时不显示提示信息
        if (caroselBoxHeight < 180) {
            infoArr = [];
        }

        //根据获取到的盒子宽度高度设置盒子内的图片、提示信息的大小及位置
        $(".caroselBox").css({"height":caroselBoxHeight,"width":caroselBoxWidth});
        $(".imgList").css({"width": caroselBoxWidth, "height": caroselBoxHeight});
        $(".imgList img").css({"width": caroselBoxWidth, "height": caroselBoxHeight});

        // 图片切换左右键
        var addCtrlHtml = '<div class="addCtrl">'
                        + '<div class="prev"></div>'
                        + '<div class="next"></div></div>';
        // + '<div id="prev"><img class="arrowBtn" src="img/iconfont-arrowleftwhite.png" alt=""></div>'
        // + '<div id="next"><img class="arrowBtn" src="img/iconfont-arrowrightwhite.png" alt=""></div></div>';

        var footerHtml = '<div class="footer"></div>';
        
        $(".caroselBox").append(addCtrlHtml,footerHtml);

        if(prevNext == false){//关闭左右切换键
          $(".addCtrl").hide();
        }
        var infoListSize  = imgLen,
            footerInfoLi  = '<ul class="infoList">',
            footerIndexLi = '<ul class="indexList">';

        for( var i = 0; i < imgLen; i ++ ) {
            if (i == 0) {                    
                footerInfoLi += '<li class="infoOn">' + ( infoArr[i] == null ? "" : infoArr[i] ) + '</li>';
                footerIndexLi +='<li class="indexOn"></li>';
            }else{
                footerInfoLi += '<li>' + ( infoArr[i] == null ? "" : infoArr[i] ) + '</li>';
                footerIndexLi +='<li></li>';                   
            }
        }

        footerIndexLi += '</ul>';
        footerIndexLi += '</ul>';

        $(".infoList").append(footerInfoLi);
        $(".indexList").append(footerIndexLi);
        $(".footer").append(footerInfoLi, footerIndexLi); 

        $(".prev").css({"top": caroselBoxHeight/2.5});
        $(".next").css({"top": caroselBoxHeight/2.5});

        $(".arrowBtn").css({
            "top": caroselBoxHeight/400,
            "position": "absolute"
        })

        var footerH = caroselBoxHeight*0.2 > 50 ? "50" : caroselBoxHeight*0.2;
        $(".footer").css({ "height": footerH});

        //var infoListH = caroselBoxHeight*0.1 > 50 ? "50" ：caroselBoxHeight*0.1; 
        $(".infoList").css({"height": footerH-20});

        $(".indexList").css({ "height": footerH});

        $(".indexList li").css({
            "width": caroselBoxHeight*0.02,
            "height": caroselBoxHeight*0.02
        });

        $(".indexList li:first-child").css({
            "marginLeft": caroselBoxWidth*2/8
        })

        // $(".imgList div:not(:first-child)").hide();
       var autoChange = setInterval(function(){ 
            if(curIndex < imgLen-1){ 
              curIndex ++; 
            }else{ 
              curIndex = 0;
            }
            //调用变换处理函数
            changeTo(curIndex); 
          },2500);
           //左箭头滑入滑出事件处理
          $(".prev").hover(function(){ 
            //滑入清除定时器
            clearInterval(autoChange);
          },function(){ 
            //滑出则重置定时器
            autoChangeAgain();
          });
          //左箭头点击处理
          $(".prev").click(function(){ 
            //根据curIndex进行上一个图片处理
            curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
            changeTo(curIndex);
          });
          //右箭头滑入滑出事件处理
          $(".next").hover(function(){ 
            //滑入清除定时器
            clearInterval(autoChange);
          },function(){ 
            //滑出则重置定时器
            autoChangeAgain();
          });
          //右箭头点击处理
          $(".next").click(function(){ 
            curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
            changeTo(curIndex);
          });
          //对右下角按钮index进行事件绑定处理等
          $(".indexList").find("li").each(function(item){ 
            $(this).hover(function(){ 
              clearInterval(autoChange);
              changeTo(item);
              curIndex = item;
            },function(){ 
              autoChangeAgain();
            });
          });
          //清除定时器时候的重置定时器
          function autoChangeAgain () { 
              autoChange = setInterval(function(){ 
              if(curIndex < imgLen-1){ 
                curIndex ++;
              }else{ 
                curIndex = 0;
              }
            //调用变换处理函数
              changeTo(curIndex); 
            },2500);
            }
          function changeTo (num) { 
            if(inOut == "fade"){
              $(".imgList .img").filter(":visible").fadeOut(500).parent().children().eq(num).fadeIn(1000);
            }else if(inOut == "switch"){   
              $(".imgList").css({"width":caroselBoxWidth*imgLen});           
              var goLeft = num * caroselBoxWidth;
              $(".imgList").animate({left: "-" + goLeft + "px"},500);
            }
            $(".infoList").find("li").removeClass("infoOn").eq(num).addClass("infoOn");
            $(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
          } 
    }
})(jQuery)