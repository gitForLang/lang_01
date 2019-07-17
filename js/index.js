$(document).ready(function(){
	// 全屏滚动效果
	var page = startOnePage({
		frame: "#view",
		container: "#frame",
		sections: ".op-section",
		radio: "#radio",
		radioOn: "#radioOn",
		speed: 500,
		easing: "swing"
	});
	
	//点击按钮
	var app = {
		index:num,	// 当前屏下标
		winHeight:0,	// 屏幕高度
		scrollHeight:0,		// 全部屏加起来的高度 
		client1:999,	//第四屏数据
		client2:300,
		client3:288,
		client4:350,
		init(){
			// 获取屏幕高度
			winHeight = $(window).height();
			scrollHeight = winHeight * 5;
			console.log(num);
			// 第一屏加载条
			$(document).ready(function() { 
				$(".progress").animate({height:"100%"},1000);
			}); 
			// 回到顶部
			$(".goUp_btn").click(function(){
				$(".radio_li").trigger("click");
			});
			// 鼠标经过按钮
			$(".section_content_btn").hover(function(){
				$(this).css("color","#fff");
				$(this).children(".section_content_bg").animate({width:"100%"},500);
			},function(){
				$(this).attr("style","");
				$(this).children(".section_content_bg").animate({width:"0%"},500);
			});
			// 鼠标经过菜单按钮
			$(".menu_button").hover(function(){
				$(".menu_button_icon").attr("src","img/menu_white_icon.png");
			},function(){
				$(".menu_button_icon").attr("src","img/menu_icon.png");
			});
			
			// 监听屏滚动
			$(document).bind("DOMMouseScroll mousewheel keydown", function(e){
				index = num;
				if(num>0){
					$(".menu_button_icon,.loading_block").animate({opacity:0},1000);
					$(".fix_pinuo_logo").animate({opacity:1},1000);
				} else {
					$(".menu_button_icon,.loading_block").animate({opacity:1},1000);
					$(".fix_pinuo_logo").animate({opacity:0},1000);
				}
				var progress = ((index+1) * winHeight) / scrollHeight;
				$(".page_progress").animate({height:progress*100 + "%"},500);
				
				if(index == 3) {
					app.mathAnimate(".client1",app.client1)
					app.mathAnimate(".client2",app.client2)
					app.mathAnimate(".client3",app.client3)
					app.mathAnimate(".client4",app.client4)
				}
			});
			
			// 鼠标经过合作客户
			$(".client_company_item").hover(function(){
				var src = $(this).children("img").attr("src");
				var active = src.replace(".png","_active.png");
				$(this).children("img").attr("src",active);
			},function(){
				var src = $(this).children("img").attr("src");
				var active = src.replace("_active.png",".png");
				$(this).children("img").attr("src",active);
			});
			
		},
		mathAnimate(name,numberName) {	//数字递增动画
			var client1Num = parseInt($(name).text());
			var client1Time = setInterval(function(){
				if(client1Num < numberName){
					client1Num++;
					$(name).text(client1Num);
				} else {
					clearInterval(client1Time)
				}
			},1);
		}
		
	}
	
	app.init();
	
});