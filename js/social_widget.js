(function(){
	
	// alert("鎭枩锛屾鍦ㄨ皟鐢≦E缁勪欢锛�");

	function $(id){
		document.getElementById(id);
	}

	/* 鍒涘缓 link鏍囩閾炬帴骞惰缃� */
	function createLink(cssURL,lnkId,charset,media){
		var head = document.getElementsByTagName('head')[0];
		var	linkTag = null;
		if(!cssURL){ return false;}
		linkTag = document.createElement('link');
		linkTag.setAttribute('id',(lnkId || 'dynamic-style'));
		linkTag.setAttribute('rel','stylesheet');
		linkTag.setAttribute('charset',(charset || 'utf-8'));
		linkTag.setAttribute('media',(media||'all'));
		linkTag.setAttribute('type','text/css');
		linkTag.href = cssURL; 
		head.appendChild(linkTag); 
	}
	createLink('css/social_widget.css','lnkId');

	/* 鍒涘缓 瀹瑰櫒 */
	var QE_obox = document.createElement("div");
	QE_obox.setAttribute("id", "weibo-wrap");
	
	/* 鍒涘缓 鍏抽棴鎸夐挳 */ 
	var QE_close = document.createElement('a');
	QE_close.setAttribute('class','weibo-close');
	QE_close.setAttribute('href','javascript:;');

	/* 鍒涘缓 iframe */ 
	var QE_iframe = document.createElement("iframe");
	QE_iframe.setAttribute('class','share_self');
	QE_iframe.setAttribute('scrolling','no');
	QE_iframe.setAttribute('frameborder','0');
	QE_iframe.setAttribute('width','100%');
	QE_iframe.setAttribute('height','100%');
	QE_iframe.setAttribute('src',QE_iframeSrc);
	console.log(QE_iframeSrc);

	/* 灏唅frame 鎻掑叆 div 瀹瑰櫒 */
	QE_obox.appendChild(QE_iframe);
	QE_obox.appendChild(QE_close);
	document.body.appendChild(QE_obox);

	/* 鍒涘缓鍥哄畾鎮诞logo */
	var QE_fix = document.createElement("div");
	QE_fix.setAttribute("id", "QE-fix");

	/* 鍒涘缓寰崥QQ鎸夐挳 */
	var weibo_btn = document.createElement("a");
	weibo_btn.setAttribute('class','social-btn weibo-btn');
	var qq_btn = document.createElement("a");
	qq_btn.setAttribute('class','social-btn qq-btn');
	qq_btn.setAttribute('target','_blank');
	qq_btn.setAttribute('href',QE_qqSrc);
	qq_btn.setAttribute('title','QQ鍜ㄨ');
	
	/* 鎻掑叆瀹瑰櫒 */ 
	QE_fix.appendChild(weibo_btn);
	QE_fix.appendChild(qq_btn);
	document.body.appendChild(QE_fix);

})();


window.onload = function(){
	// alert('QE缁勪欢鍔犺浇瀹屾瘯');
	/* 璁剧疆涓や釜瀹氭椂鍣ㄥ苟鑾峰彇瀹瑰櫒鐩掑瓙 */
	var timer01,timer02 ;
	var weiboWrap =  document.querySelector('#weibo-wrap');
	var marginR = parseInt(window.getComputedStyle? window.getComputedStyle(weiboWrap).right : boxs.currentStyle.right);
	// 寰崥鍏抽棴鎸夐挳鐐瑰嚮
	document.querySelectorAll('.weibo-close')[0].onclick = function(){
		timer01 = setInterval(function(){YidongR()},1);
		console.log(marginR);
	}
	/* 鍚戝彸绉诲姩浜嬩欢 */
	var YidongR = function(){
		if(marginR >= -300){
			marginR = marginR - 2;
			weiboWrap.style.right = marginR + "px";
		}else{
			clearInterval(timer01);
		}
	}
	/* 寰崥iframe 鎵撳紑鎸夐挳鐐瑰嚮 */
	document.querySelectorAll('.weibo-btn')[0].onclick = function(){
		timer02 = setInterval(function(){YidongL()},1);
	}
	/* 鍚戝乏绉诲姩浜嬩欢 */
	var YidongL = function(){
		if(marginR < 0){
			marginR = marginR + 2;
			weiboWrap.style.right = marginR + "px";
		}else{
			clearInterval(timer02);
		}
	}

	/* 鑾峰彇婊氬姩鏉′簨浠� */ 
	window.onscroll = function () { 
		var t = document.documentElement.scrollTop || document.body.scrollTop;
		if (t > 360) { 
			document.getElementById('QE-fix').style.display = 'block';
		} else { 
			document.getElementById('QE-fix').style.display = 'none';		
		} 
		console.log('t:'+t);
		// var HH = document.body.offsetHeight ;
		// var hh = window.innerHeight || document.documentElement.clientHeight ;

		// if( (HH-hh > 0) || (t > 360) ){
		// 	document.getElementById('QE-fix').style.display = 'block';
		// }else{
		// 	document.getElementById('QE-fix').style.display = 'none';		
		// }

	}
}