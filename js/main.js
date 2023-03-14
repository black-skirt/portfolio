

$(window).scroll(function() {			
	npos = $(window).scrollTop();
	SW	=	$(window).width();
	SH	=	$(window).height();
	commonTop.scrollCheck();
});//end scroll





/**********************************
@ header function
**********************************/
var commonTop = {
	h_slide:null,
	gnbMobileSpeed:100,
	gnbMobileTimer:null,
	init:function(){
		if(AgentFlag){
			commonTop.h_slide = $('.h_slider').bxSlider({
				mode:'vertical',
				pager:false,
				pause:2000,
				controls:false,
				auto: true,
				autoHover:true
			});	
			$('#header').find('.h_notice .next a').click(function(){
				commonTop.h_slide.goToNextSlide();
			});
		}
		$('#header').find('.selectData').each(function(){
			var _select = new selectData($(this));
		});

		$('.m_gnb').find('> ul > li > a').click(function(){
			if($(this).next().length > 0){
				if($(this).parent().hasClass('active')){
					$(this).parent().removeClass('active');		
					$(this).next().stop(true).height(0);
				}else{
					$(this).parent().addClass('active');
					$(this).next().stop(true).animate({"height":($(this).next().find("li.on").find("ul").height()+24)});
				}
			}
		});
		$(".m_snb > li").each(function(){
			$(this).on("click", function(){
				$(this).parent(".m_snb").find("> li").removeClass("on").find("ul").hide();
				$(this).addClass("on").find("ul").show();
				$(this).parent(".m_snb").animate({"height":($(this).find("ul").height()+24)});
			})
		});

		$('#header').find('.btn_top_login > a').click(function(){
			commonTop.topLoginOpen(0);
		});
		$('#header').find('.top_login_tab > li > a').click(function(){
			commonTop.topLoginOpen($(this).parent().index());
		});
		$('#header').find('.global_menu').mouseleave(function(){
			commonTop.topLoginClose();
		});
		
		if($('.p_date').length > 0){
			$(".p_date").datepicker({
				showOn:"both",
				buttonImage:"/files/images/content/btn_datapicker02.png",
				buttonImageOnly:true,
				dateFormat: 'yy-mm-dd',
				prevText: '이전 달',
				nextText: '다음 달',
				monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				dayNames: ['일','월','화','수','목','금','토'],
				dayNamesShort: ['일','월','화','수','목','금','토'],
				dayNamesMin: ['일','월','화','수','목','금','토'],
				showMonthAfterYear: true,
				yearSuffix: '년',
				changeMonth: true,
				changeYear: true
			});						
		}



	},
	scrollCheck:function(){
		var _y = $('#header').find('.header_wrap h1').innerHeight()+$('#wrap').offset().top;
		if(SW > 750 && npos >= _y){
			$('.header_block').addClass('fix');
			$('#header .h_search_cont').addClass('fix');
		}else{
			$('.header_block').removeClass('fix');
			$('#header .h_search_cont').removeClass('fix');
		}		

		if(SW < 750 && npos >= $('#wrap').offset().top){
			$('#header').addClass('m_fix');
		}else{
			$('#header').removeClass('m_fix');
		}
	},
	mobileGnbCheck:function(){
		if($('#header').hasClass('mfix')){
			$('#header').removeClass('mfix');
			commonTop.mobileGnbClose();
		}else{
			$('#header').addClass('mfix');						
			commonTop.mobileGnbOpen();								
		}	
	},
	mobileGnbOpen:function(){
		clearInterval(commonTop.gnbMobileTimer);
		var len = $('#header').find('.m_gnb > ul > li').length;
		var _i = 0;
		commonTop.gnbMobileTimer = setInterval(function(){
			if(_i >= len-1){
				clearInterval(commonTop.gnbMobileTimer);
			}
			$('#header').find('.m_gnb > ul > li').eq(_i).addClass('effect');
			_i++
		},commonTop.gnbMobileSpeed);
		if($(".m_gnb").height()+150 > SH){
			$(".m_gnb").height($("#header").height()-150).css("overflow-y","auto")
		}
		$(".h_search_cont").removeClass("on");
	},
	mobileGnbClose:function(){
		clearInterval(commonTop.gnbMobileTimer);
		var _i = $('#header').find('.m_gnb > ul > li').length-1;
		$('#header').find('.m_gnb > ul > li').removeClass('effect');
	},
	topLoginOpen:function(_i){
		$('#header').find('.top_login').stop(true).fadeIn(300);
		$('#header').find('.top_login .top_login_tab_con > div').eq(_i).addClass('actived').siblings().removeClass('actived');
		$('#header').find('.top_login .top_login_tab > li').eq(_i).addClass('actived').siblings().removeClass('actived');
	},
	topLoginClose:function(){
		$('#header').find('.top_login').stop(true).fadeOut(300);
	}
}

