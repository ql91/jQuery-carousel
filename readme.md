#jquery实现图片轮播plug--in

---
##使用方式
> * 引入css: **carouselBox.css**<br/>
> * 引入js: **jquery.js**、 **carouselBox.js**<br/>
> * html代码:
```
<div class="caroselBox" id="demo1" >
        <div class="imgList">
            <div class="img"><a href="#"><img src="img/banner1.jpg" alt="图片一"></a></div>
            <div class="img"><a href="#"><img src="img/banner2.jpg" alt="图片二"></a></div>
            <div class="img"><a href="#"><img src="img/banner3.jpg" alt="图片三"></a></div>
            <div class="img"><a href="#"><img src="img/banner1.jpg" alt="图片一"></a></div>
            <div class="img"><a href="#"><img src="img/banner2.jpg" alt="图片二"></a></div>
            <div class="img"><a href="#"><img src="img/banner3.jpg" alt="图片三"></a></div>
        </div>
    </div>
```   
> * js代码:
```
jQuery(document).ready(function($) {
    // 设置参数
    $("#demo1").carouselBox({
        "infoArr": ['dsasda'], // 图片信息,若无则数组为空
        "duration": "5000", // 自动切换时间 default:2500
        "inOut": "fade", // fade:淡入淡出, switch:左右切换
        "prevNext": true // 左右切换键是否显示,默认显示
    });
});
```
## 效果图
![](https://github.com/ql91/jQuery-summary/blob/master/Carousel.gif)
