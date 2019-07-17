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
		copywrting:0,	//文案下标
		goodsIndex:0,	// 第二屏轮播下标
		speed:5000,		// 轮播时间
		clientIndex:0,	// 第四屏轮播下标
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
				$(".menu_button_icon,.loading_block").animate({opacity:1},500);
				$(".fix_pinuo_logo").animate({opacity:0},500);
			});
			// 鼠标经过按钮
			$(".section_content_btn,.menu_ul_li").hover(function(){
				/* $(this).css("color","#fff"); */
				$(this).children(".section_content_bg").animate({width:"100%"},300);
			},function(){
				/* $(this).attr("style",""); */
				$(this).children(".section_content_bg").animate({width:"0%"},300);
			});
			// 鼠标经过菜单按钮
			$(".menu_button").hover(function(){
				$(".menu_button_icon").attr("src","img/menu_white_icon.png");
			},function(){
				$(".menu_button_icon").attr("src","img/menu_icon.png");
			});
			$(".menu_icon_main,.bottom_menu").hover(function(){
				$(this).css("background","#ff1c3b");
				$(this).children("img").attr("src","img/menu_white_icon.png");
			},function(){
				$(this).children("img").attr("src","img/menu_icon.png");
				$(this).attr("style","");
			});
			
			// 监听屏滚动
			$(document).bind("DOMMouseScroll mousewheel keydown", function(e){
				index = num;
				if(num>0){
					$(".menu_button,.loading_block").animate({opacity:0},500);
					$(".fix_pinuo_logo").animate({opacity:1},500);
				} else {
					$(".menu_button,.loading_block").animate({opacity:1},500);
					$(".fix_pinuo_logo").animate({opacity:0},500);
				}
				var progress = ((index+1) * winHeight) / scrollHeight;
				$(".page_progress").animate({height:progress*100 + "%"},200);
				
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
			
			// 鼠标经过第三屏
			$("body").on("mouseover",".demo_item",function(){
				$(this).children(".demo_item_bg").animate({opacity:0},50);
				$(this).children(".hover_icon").animate({opacity:1},50);
			});
			$("body").on("mouseleave",".demo_item",function(){
				$(this).children(".demo_item_bg").animate({opacity:1},50);
				$(this).children(".hover_icon").animate({opacity:0},50);
			});
			/* $(".demo_item").hover(function(){
				$(this).children(".demo_item_bg").animate({opacity:0},200);
				$(this).children(".hover_icon").animate({opacity:1},100);
			},function(){
				$(this).children(".demo_item_bg").animate({opacity:1},200);
				$(this).children(".hover_icon").animate({opacity:0},100);
			}); */
			
			// 打开菜单
			$(".menu_button,.menu_icon_main,.bottom_menu").click(function(){
				$(".pinuo_menu_bg").show();
				$(".pinuo_menu_main").animate({left:"0"},500);
				$("#frame").addClass("active");
				$("#view").addClass("active");
			});
			// 关闭菜单
			/* $(document).click(function(e){
				var _con = $('.pinuo_menu_main,.menu_button,.menu_icon_main,.bottom_menu');   
				if(!_con.is(e.target) && _con.has(e.target).length === 0){ 
					app.closeMenu();
				}
			}); */
			/* $(document).click(function(e){
				var target = $(e.target);
				if(target.closest(".pinuo_menu_main").length != 0 && target.closest(".menu_button").length != 0) return;
				app.closeMenu();

			}); */
			$(".navclose,.pinuo_menu_bg_main").click(function(){
				app.closeMenu();
			});
			
			app.checkCopywrting(app.copywrting);
			app.autoCheckBanner(app.goodsIndex,app.speed);
			app.dotAnimate();
			app.clickNextPage();
			app.autoCheckClient(app.clientIndex,app.speed);
		},
		closeMenu() {
			$(".pinuo_menu_main").animate({left:"-300px"},500,function(){
				$(".pinuo_menu_bg").hide();
			});
			$("#frame").removeClass("active");
			$("#view").removeClass("active");
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
		},
		checkCopywrting(copywrting) {		//文案切换
			$(".prev_btn2").click(function(){
				if(copywrting>0){
					copywrting--;
					$(".writing_item").animate({opacity:0},500);
					$(".writing_item").eq(copywrting).animate({opacity:1},500);
				}
			});
			$(".next_btn2").click(function(){
				if(copywrting<3){
					copywrting++;
					$(".writing_item").animate({opacity:0},500);
					$(".writing_item").eq(copywrting).animate({opacity:1},500);
				}
			});
		},
		autoCheckBanner(goodsIndex,speed) { // 第二屏图片文章轮播
			$(".banner_progress_contant").animate({height:"100%"},speed,function(){
				$(".banner_progress_contant").css("height","0");
			});
			setInterval(function(){
				if(goodsIndex<3){
					goodsIndex++;
				} else {
					goodsIndex=0;
				}
				$(".banner_index").text("0"+parseInt(goodsIndex+1));
				$(".banner_info_item").removeClass("active");
				$(".banner_right_img,.banner_info_item").animate({opacity:0},500);
				$(".banner_right_img").eq(goodsIndex).animate({opacity:1},500);
				$(".banner_info_item").eq(goodsIndex).animate({opacity:1},500);
				$(".banner_info_item").eq(goodsIndex).addClass("active");
				$(".banner_progress_contant").animate({height:"100%"},speed,function(){
					$(".banner_progress_contant").css("height","0");
				});
			},speed);
		},
		dotAnimate() {	//第二屏点动画
			var index = 0;
			setInterval(function(){
				if(index<2){
					index++;
				} else {
					index=0;
				}
				$(".dot").css("opacity","0.5");
				$(".dot").eq(index).css("opacity","1");
			},500)
		},
		clickNextPage() { // 第三屏切换动画
			var winWidth = $(window).width();
			var item = $(".demo_item");
			$(".demo_item").css("width",winWidth/4);
			$(".demo_list_main").css("width",item.length*(winWidth/4)+"px");
			var length = item.length;
			var index = 0;
			var step = item.length-4;
			var move = 0;
			var noChangeLength = $('.demo_list_main2 .demo_item').length;
			var nextIndex = 0;
			var preIndex = 0;
			
			$(".prev_btn").click(function(){
				if(preIndex > (noChangeLength-1)){
					preIndex = 1;
				} else {
					preIndex++;
				}
				if(index>0){
					index --;
					move = move + (winWidth/4);
					$(".demo_list_main").animate({"margin-left":move+"px"});
				} else {
					
					length++;
					$(".demo_list_main").css("width",length*(winWidth/4)+"px");
					
					var item = $('.demo_list_main2 .demo_item').eq((noChangeLength-1)-(preIndex-1)).prop('outerHTML');
					$(".demo_list_main").prepend(item);
					
					$(".demo_list_main").css("margin-left",(winWidth/4)*(-1)+"px");
					$(".demo_list_main").animate({"margin-left":"0px"});
					
				}
			});
			$(".next_btn").click(function(){
				//if(index < step){
					if(nextIndex > (noChangeLength-1)){
						nextIndex = 1;
					} else {
						nextIndex ++;
					}
					index++;
					move = move - (winWidth/4);
					$(".demo_list_main").animate({"margin-left":move+"px"},function(){
						length++;
						$(".demo_list_main").css("width",length*(winWidth/4)+"px");
						var item = $('.demo_list_main2 .demo_item').eq(nextIndex-1).prop('outerHTML');
						$(".demo_list_main").append(item);
						//$(".demo_item").eq(0).remove();
					});
				//}
			});
			
			var timer = setInterval(function(){
				$(".next_btn").trigger("click");
			},1000);
			
			$(".op-section.third").hover(function(){
				clearInterval(timer);
			},function(){
				timer = setInterval(function(){
					$(".next_btn").trigger("click");
				},1000);
			});
		},
		autoCheckClient(index,speed) {	// 第四屏切换动画
			$(".client_progress_main").animate({height:"100%"},speed,function(){
				$(".client_progress_main").css("height","0");
			});
			setInterval(function(){
				if(index<3){
					index++;
				} else {
					index=0;
				}
				$(".client_banner_index").text("0"+parseInt(index+1));
				
				$(".client_company_list").removeClass("active");
				
				$(".client_bg,.client_company_list").animate({opacity:0},500);
				
				$(".client_bg").eq(index).animate({opacity:1},500);
				
				$(".client_company_list").eq(index).animate({opacity:1},500);
				$(".client_company_list").eq(index).addClass("active");
				
				$(".client_progress_main").animate({height:"100%"},speed,function(){
					$(".client_progress_main").css("height","0");
				});
			},speed);
		}
		
	}
	
	app.init();
	
});