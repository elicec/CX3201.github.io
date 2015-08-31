define([], function(){
	var _isShow = false;
	var $tag, $category;

	var ctn,radio,scaleW,idx,basicwrap;

	//第一步 -- 初始化
	var reset = function() {
		//设定窗口比率
		radio = document.body.scrollHeight/document.body.scrollWidth;
		//设定一页的宽度
		scaleW = document.body.scrollWidth;
		//设定初始的索引值
		idx = 0;
	};
	//第一步 -- 组合
	var combine = function(){
		if($tag){
			document.getElementById("js-mobile-tagcloud").innerHTML = $tag.innerHTML;
		}else{
			document.getElementById("js-mobile-tagcloud").innerHTML = "暂无信息";

		}
		if($category){
			document.getElementById("js-mobile-categorycloud").innerHTML = $category.innerHTML;
		}else{
			document.getElementById("js-mobile-categorycloud").innerHTML = "暂无信息";
		}
	}
	//第三步 -- 根据数据渲染DOM
	var renderDOM = function(){
		//生成节点
		var $viewer = document.getElementById("viewer");
		if($viewer){
			document.getElementsByTagName("body")[0].removeChild($viewer);
		}
		$viewer = document.createElement("div");
		$viewer.id = "viewer";
		$viewer.className = "hide";
		$tag = document.getElementById("js-tagcloud");
		$category = document.getElementById("js-categorycloud");

		var categoryStr = '<span class="viewer-title">分类</span><div class="viewer-div tagcloud" id="js-mobile-categorycloud"></div>';
		var tagStr = '<span class="viewer-title">标签</span><div class="viewer-div tagcloud" id="js-mobile-tagcloud"></div>';

		$viewer.innerHTML = '<div id="viewer-box">\
		<div class="viewer-box-l">\
			<div class="viewer-box-wrap">'+categoryStr+tagStr+'</div>\
		</div>\
		<div class="viewer-box-r"></div>\
		</div>';

		//主要图片节点
		document.getElementsByTagName("body")[0].appendChild($viewer);
		var wrap = document.getElementById("viewer-box");
		basicwrap = wrap;
		wrap.style.height = document.body.scrollHeight + 'px';
	};

	var show = function(target, idx){
		var w = $(window).width();
		if(w >= 700){
			if(! $(".viewer-box-l").hasClass("viewer-box-l-pc")){
				$(".viewer-box-l").addClass("viewer-box-l-pc");
			}
			if(! $(".viewer-box-r").hasClass("viewer-box-r-pc")){
				$(".viewer-box-r").addClass("viewer-box-r-pc");
			}
		}else{
			if($(".viewer-box-l").hasClass("viewer-box-l-pc")){
				$(".viewer-box-l").removeClass("viewer-box-l-pc");
			}
			if($(".viewer-box-r").hasClass("viewer-box-r-pc")){
				$(".viewer-box-r").removeClass("viewer-box-r-pc");
			}
		}
		document.getElementById("viewer").className = "";
		setTimeout(function(){
			basicwrap.className = "anm-swipe";
		},0);
		_isShow = true;
		document.ontouchstart=function(e){
			if(e.target.tagName != "A"){
				return false;
			}
		}
	}

	var hide = function(){
		document.getElementById("viewer-box").className = "";
		_isShow = false;
		document.ontouchstart=function(){
			return true;
		}
	}

	//第四步 -- 绑定 DOM 事件
	var bindDOM = function(){
		var scaleW = scaleW;
		
		//滑动隐藏
		document.getElementById("viewer-box").addEventListener("webkitTransitionEnd", function(){

			if(_isShow == false){
				document.getElementById("viewer").className = "hide";
				_isShow = true;
			}else{
			}
			
		}, false);

		//点击展示和隐藏
		ctn.addEventListener("touchend", function(){
			show();
		}, false);
		ctn.addEventListener("click", function(){
			show();
		}, false);

		var $right = document.getElementsByClassName("viewer-box-r")[0];
		var touchStartTime;
		var touchEndTime;
		$right.addEventListener("touchstart", function(){
			touchStartTime = + new Date();
		}, false);
		$right.addEventListener("touchend", function(){
			touchEndTime = + new Date();
			if(touchEndTime - touchStartTime < 300){
				hide();
			}
			touchStartTime = 0;
			touchEndTime = 0;
		}, false);
		$right.addEventListener("click", function(){
				hide();
			touchStartTime = 0;
			touchEndTime = 0;
		}, false);

		//滚动样式
		var $overlay = $("#mobile-nav .overlay");
		var $header = $(".js-mobile-header");
		window.onscroll = function(){
		    var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
		    if(scrollTop >= 69){
		    	$overlay.addClass("fixed");
		    }else{
		    	$overlay.removeClass("fixed");
		    }
		    if(scrollTop >= 160){
		    	$header.removeClass("hide").addClass("fixed");
		    }else{
		    	$header.addClass("hide").removeClass("fixed");
		    }
		};
		$header[0].addEventListener("touchstart", function(){
			$('html, body').animate({scrollTop:0}, 'slow');
		}, false);
		$header[0].addEventListener("click", function(){
			$('html, body').animate({scrollTop:0}, 'slow');
		}, false);
	};

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			var link = tags.eq(i).attr("href");
			tags[i].className = "";
			if(link.indexOf("tags") != -1){
				tags.eq(i).addClass("color2");
			}else if(link.indexOf("categories") != -1){
				tags.eq(i).addClass("color1");
			}
		}
	}

	return{
		init: function(){
			//构造函数需要的参数
			ctn = document.getElementsByClassName("slider-trigger")[0];
			//构造四步
			reset();
			renderDOM();
			combine();
			bindDOM();
			resetTags();
		},
		showTag: function(){
			show();
		}
	}
})