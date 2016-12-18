
/**
 * @desc: 监听鼠标滚动事件
**/
var scrollnum	= 0;

/**
 * 监听浏览器滚动条状态
 * @author yuanhualong
 * @createtime 2014-12-20
 */
 /*
$(window).scroll(function(){
	// 当滚动到最底部以上100像素时， 加载新内容
	if ($(document).height() - $(this).scrollTop() - $(this).height() < 100)
	{
		showMoreGoods();
	}
});
*/
/**
 * ajax动态加载更多商品
 * @author yuanhualong
 * @createtime 2014-12-20
 * @returns {boolean}
 */
function showMoreGoods()
{

	if ($(document).height() - $(this).scrollTop() - $(this).height() > 100)
	{
		return false;
	}

	if(scrollnum++>0)
	{
		return false;
	}

	var parm = $("#param");
	var offset = parseInt(parm.attr('offset'));
	var tag_id = parseInt(parm.attr('tag_id'));

	if ( offset > 0&&offset<totalnum)
	{
		$("#param").ajaxStart(function(){
			$(window).unbind('scroll');
            $(window).bind('scroll',function(){
                var st = $(window).scrollTop();
                    if(st > 30){
                            $(".hobox").addClass("fixed");
                    }else{
                            $(".hobox").removeClass("fixed");
                    }
            })
		});
		offsets = offset + 16;
		parm.attr('offset', offsets);
		$("#showloading").show();
		$.ajax({
			type:"post",
			url:"/mall/getMoreGoods",
			data:"offset="+offset+"&tag_id="+tag_id,
			dataType:"json",
			success: function(msg)
			{
				var html;
				for(var i =0 ; i < msg.length; i++)
				{
					html+= getDietItem(msg[i]);

				}
				var $boxes  = $(html);
				$boxes.fadeIn(2000);
				$('.yshcp.clearfix').append( $boxes );
				scrollnum	= 0;
				$("#showloading").hide();
				window.clearInterval(window.setId);
				window.setId = countDown($(".yyp"), "data-time",function(dom,attribute){
					var sec = $(dom).attr(attribute);
					var str = (function(){
						var day=Math.floor(sec/(60*60*24));
						var hour=Math.floor((sec-day*24*60*60)/3600);
						var minute=Math.floor((sec-day*24*60*60-hour*3600)/60);
						var second=Math.floor(sec-day*24*60*60-hour*3600-minute*60);
						var str = "";
						if(day != 0){
							str += day+"天";
						}
						if(hour != 0){
							str += hour+"小时";
						}
						if(minute != 0){
							str += minute+"分";
						}
						str += second+"后恢复原价";
						return str;
					})();
                    if(sec<=0)
                    {
                        return sec;
                    }
					var sec = (sec - 1) ? sec - 1 : 0;
					$(dom).attr(attribute, sec);
					$(dom).text(str);
				});
			},
			error	: function ()
			{
				scrollnum	= 0;
				$(window).bind("scroll", showMoreGoods);
				$("#showloading").hide();
			}
		});
		$(window).bind("scroll", showMoreGoods);
	}else
	{
		$(window).unbind('scroll');
        $(window).bind('scroll',function(){
                var st = $(window).scrollTop();
                    if(st > 30){
                            $(".hobox").addClass("fixed");
                    }else{
                            $(".hobox").removeClass("fixed");
                    }
            })
	}
}

/**
 * 获取更多商品
 * @author yuanhualong
 * @createtime 2014-12-20
 * @param data
 * @param info
 * @param gs_userid
 * @param gs_purview
 * @param type
 * @returns {Array}
 */
function getDietItem(data)
{
	var html= [];    
	html+= '<div class="ysktr">';
	html+= '<div class="yshimg">';
	html+= '<a href="'+data.url+'" target="_blank"><img alt="'+data.goods_name+'" src="'+data.img_url+'"></a>';
    if(data.end_time)
    {
    	if(data.mark==3||data.mark==2)
		{
			html+= '<div class="yym yyp" data-time="'+data.left_time+'">'+data.end_time+'</div>';
		}
		else{
			html+= '<div class="yys yyp" data-time="'+data.left_time+'">'+data.end_time+'</div>';
		}
        
    }
	html+= '</div>';
	html+= '<div class="yshnr">';
	if(data.good_status==2)
    {
        html+= '<a href="'+data.url+'" target="_blank"><h3><i class="ic_xiansq">限时抢</i>'+data.goods_name+'</h3></a>';
    }
    else if(data.good_status==3)
    {
        html+= '<a href="'+data.url+'" target="_blank"><h3><i class="ic_shango">闪购</i>'+data.goods_name+'</h3></a>';
    }
    else if(data.good_status==1)
    {
        html+= '<a href="'+data.url+'" target="_blank"><h3><i class="ic_xinpin">新品</i>'+data.goods_name+'</h3></a>';
    }
    else{
        html+= '<a href="'+data.url+'" target="_blank"><h3>'+data.goods_name+'</h3></a>';
    }    
	/*html+= '<p>'+data.recommend+'</p>';*/
	/*if(data.is_rob == '1'&&data.start_time)
	{
		sellInfo	= data.sellInfo;
		html+= '<div class="jdt">';
	    html+= '<div class="bjs" style="width:'+sellInfo.sell_scale+'%;"></div>';
	    html+= '<div class="ujdt">限量'+sellInfo.stock_num+data.unit+'，已抢购'+sellInfo.sell_scale+'%</div>';
	    html+= '</div>';
	}*/
	if(data.mark==3&&data.is_rob=='1')
	{
		sellInfo	= data.sellInfo;
		html+='<div class="yqg_nr">已抢购'+sellInfo.sell_scale+'%</div>';
	}
	html+= '<div class="jg"><span>￥'+data.price+'</span></div>';
	if(data.mark==2) {
		html += '<div class="kstx"><a href="javascript:void(0)" class="kstxs">开售提醒</a></div>';
	}
    express_show = '';
    if(data.express_fee == '0')
    {
        express_show = '包邮';
    }
    if(data.express_fee > 0)
    {
        express_show = '运费(￥)：'+ data.express_fee;
    }
	html+= '</div>';
    html+= '<div class="yshou">月售 '+(parseInt(data.all_sale_num) + parseInt(data.vir_num))+data.unit+'</div>';
    html+= '<div class="baoy">'+express_show+'</div>';
	html+= '<div class="byseei" style="display:none;">';
	html+= '<div class="cjtd"></div>';
	html+= '<a class="mclos" href="javascript:void(0)"></a>';
	html+= '<div class="brerm">';
	html+= '<img alt="" src="'+data.weixin+'">';
	html+= '<span>下载豆果APP开启预售提醒<br>超值商品不再错过</span>';
	html+= '</div>';
	html+= '</div>';
	html+= '</div>';
	return html;
}
function countDown( domArr, attribute, callback ){
	var code = function(){
		var len = domArr.length;
		for(var i = 0;i < len; i++){
			var foo = Number($(domArr[i]).attr( attribute ));
			callback(domArr[i], attribute);
		}
	}
	var setId = window.setInterval(code, 1000);
	return setId;
}
//优食汇首页
$(document).ready(function(){
    $(".kstxs").live("click",function(){
        $(this).parent().parent().parent().find('.byseei').show();
    });    
});
$(document).ready(function(){
    $(".mclos").live("click",function(){
        $(".byseei").hide();
    });
    var setId = countDown($(".yyp"), "data-time",function(dom,attribute){
        var sec = $(dom).attr(attribute);
        var str = (function(){
            day=Math.floor(sec/(60*60*24));
            hour=Math.floor((sec-day*24*60*60)/3600);
            minute=Math.floor((sec-day*24*60*60-hour*3600)/60);
            second=Math.floor(sec-day*24*60*60-hour*3600-minute*60);
            if(parseInt(day)<0 || parseInt(hour)<0||parseInt(minute)<0)
            {
                return sec;
            }
            var str = "";
            if(day != 0){
                str += day+"天";
            }
            if(hour != 0){
                str += hour+"小时";
            }
            if(minute != 0){
                str += minute+"分";
            }
            str += second+"后恢复原价";
            return str;
        })();
       if(sec<=0)
       {
           return false;
       }
        var sec = (sec - 1) ? sec - 1 : 0;
        $(dom).attr(attribute, sec);
        $(dom).text(str);
    });
})

/**
 * @desc: 监听鼠标滚动事件
 */
var scrollnum	= 0;
/**
 * 监听浏览器滚动条状态
 * @author yuanhualong
 * @createtime 2014-12-20
 */
$(window).scroll(function(){
    // 当滚动到最底部以上100像素时， 加载新内容
    if ($(document).height() - $(this).scrollTop() - $(this).height() < 100)
    {
        showMoreGoods();
    }
});
//商品详情页
//咨询评论回复
function huifu(sub)
{
    var obj = $(sub);
    var attr    = obj.attr('attr');
    var sub     = "@"+attr+" ";
    $('#comments').val(sub);
    $('#comments').focus();
    $('#replyid').val(obj.attr('id'));
}
//提交咨询
$('#submitComment').click(function(){	
	if(!user_id)
	{
	    logindialog();
	    return false;
	}
	var tuan_id=$('#tuan_id').val();
	var store_id=$('#store_id').val();
	var comment=$.trim($('#comments').val());
	if(!comment)
	{
	    showerrorinfo('内容为空','请填写咨询内容');
	    return false;
	}
	var biao    = $('#submitComment').attr('attr');
	if(biao==2){
	    return false;
	}
	$('#submitComment').attr('attr',2);
	var replyid = $('#replyid').val();
	$.ajax({
	    type:"post",
	    url:"/mall/ajaxAddComment",
	    data:"tuan_id="+tuan_id+"&store_id="+store_id+"&comment="+encodeURIComponent(comment)+"&replyid="+replyid,
	    dataType:"json",
	    success: function(msg)
	    {
	        showerrorinfo('提交成功','提交成功！');
	        var html    = '';
	        html    += ' <div class="ply clearfix"><div class="plim">';
	        html    += '<a href="/u/'+msg.username+'.html" target="_blank"> <img  src="'+msg.images+'"></a> </div>';
	        html    += '<div class="plright clearfix">';
	        html    += '<span class="pright"><a href="/u/'+msg.username+'.html" class="ht_s" target="_blank"> '+msg.nickname+' </a> '+msg.createdates+'<a href="javascript:void(0)" onclick="huifu(this)" attr="'+msg.nickname+'"  id="'+msg.id+'"> 回复 </a></span>';
	        html    += '<span class="px">'+msg.comment+'</span></div></div>';
	        var len = $('.ply').length;
	        if(len<=0)
	        {
	            $('#good-comment').html(html);
	        }else{
	            $('.ply').eq(0).before(html);
	        }
	        $('#comments').val('');
	        $('#replyid').val('');
	        $('#submitComment').attr('attr',1);
	    },
	    error	: function ()
	    {
	        $('#submitComment').attr('attr',1);
	        showerrorinfo('提交失败','请稍后再试！');
	    }
	});
})
//页面跳转下单
function buy()
{
    $('.xiangou').hide();
    $('#buynum').html('');
    //alert(xiangou);
    var num=$('#goods_num').val();
    //alert(num);
    if(num<=0||num=="")
    {
    	showerrorinfo('数量有误','购买数量必须为大于0的整数');
        $('#goods_num').val(1);
        return false;
    }
    if(parseInt(num)>parseInt(kucun))
    {
        $('#buynum').html('');
        $('.xiangou').html(' 库存不足 ');
        $('.xiangou').show();
        return ;
    }
    if(parseInt(num)>parseInt(xiangou)&&parseInt(xiangou)!=0)
    {
        $('#buynum').html('');
        $('.xiangou').html(' 最多限购<span id="buynum">'+xiangou+'</span>'+unit);
        $('.xiangou').show();
        return ;
    }
    location.href='/mall/submitOrder?goods_id='+goods_id+'&num='+num;
}
$(function(){
    $(".sobinav").find('a').click(function(){
        var attr    = $(this).attr('class');
        if(attr!='ljgm_hs')
        {
            $(this).addClass('mon');
            $(this).parent().siblings().find('a').removeClass('mon');
        }
    });
    $(".chans").click(function(){
       // $('html,body').animate({scrollTop:$('#cpjs').offset().top}, 600);
    });
	// TODO　定位的id有错误
    $(".siyo").click(function(){
        $('#report').parent().addClass('ls');
        $('#report_div').removeClass('hidden');
        $('#comment').parent().removeClass('ls');
        //$('html,body').animate({scrollTop:$('#report').offset().top}, 600);
    });
	$(".jies").click(function(){
		$('#comment').parent().addClass('ls');
        $('#report').parent().removeClass('ls');
        $('#report_div').addClass('hidden');
       // $('html,body').animate({scrollTop:$('#comment').offset().top}, 600);
	});
    $(".pilo").click(function(){
        $('#comment').parent().addClass('ls');
        $('#report').parent().removeClass('ls');
        $('#report_div').addClass('hidden');
       // $('html,body').animate({scrollTop:$('#comment_div').offset().top}, 600);
    });	
    // 图片滚动特效代码
    if (!$('#slidepic')[0]) return;
    var i = 0,
        p = $('#slidepic ul'),
        pList = $('#slidepic ul li'),
        len = pList.length;
    var eleprev = $('#prev'),
        eleNext = $('#next');
    //var firstClick = false;
    var w = 90,
        num = 3;
    p.css('width', w * len);
    if (len <= num) eleNext.addClass('gray');
    function prev() {
        if (eleprev.hasClass('gray')) {
            return;
        }
        p.animate({
                marginTop: -(i) * w
            },
            500);
        if (i < len - num) {
            eleNext.removeClass('gray');
        }
        if (i == 0) {
            eleprev.addClass('gray');
        }
    }
    function next() {
        if (eleNext.hasClass('gray')) {
            return;
        }
        //p.css('margin-left',-(++i) * w);
        p.animate({
                marginTop: -(i) * w
            },
            500);
        if (i != 0) {
            eleprev.removeClass('gray');
        }
        if (i == len - num) {
            eleNext.addClass('gray');
        }
    }
    eleprev.bind('click', prev);
    eleNext.bind('click', next);
    pList.each(function(n, v) {
        $(this).click(function() {
            if (n - i == 2) {
                next();
            }
            if (n - i == 0) {
                prev()
            }
            $('#slidepic ul li.cur').removeClass('cur');
			//$('#slidepic ul li.curb').removeClass('curb');
            $(this).addClass('cur');
            show(n);
        }).mouseover(function() {
            $(this).addClass('hover');
            $('#slidepic ul li.cur').removeClass('cur');
            //$('#slidepic ul li.curb').removeClass('curb');
            $(this).addClass('cur');
            show(n);
        }).mouseout(function() {
            $(this).removeClass('hover');
        })
    });
    $('#goods_num').keyup(function(){
        $('.xiangou').hide();
        $('#buynum').html('');
        var num=$('#goods_num').val();
        if(isNaN(num))
        {
        	showerrorinfo('不能为空','请输入数字！');
            $('#goods_num').val(1);
            return false;
        }
        if(num<0)
        {
            $('#goods_num').val(1);
            return false;
        }
        if(parseInt(num)>parseInt(kucun))
        {
            $('#buynum').html('');
            $('.xiangou').html(' 库存不足');
            $('.xiangou').show();
            $('.minus').addClass('minus1');
            $('.plus').removeClass('minus1');
            return false;
        }
        if(parseInt(num)>parseInt(xiangou)&&parseInt(xiangou)!=0)
        {
            $('#buynum').html('');
            $('.xiangou').html(' 最多限购<span id="buynum">'+xiangou+'</span>'+unit);
            $('.xiangou').show();
            $('.minus').addClass('minus1');
            $('.plus').removeClass('minus1');
            return false;
        }
        if(num>1)
        {
            $('.minus').addClass('minus1');
            $('.plus').addClass('minus1');
        }
        else{
            $('.minus').removeClass('minus1');
            $('.plus').addClass('minus1');
        }
    })
});
function show(i) {
    var ad = areaDailyList[i];
    $('#dailyImage').attr('src', ad.image);
}
$(window).load(function(){
    var setId = countDown($("#count-down"), "data-time",function(dom,attribute){
        var sec = $(dom).attr(attribute);
		if(!(sec > "0")){
            return;
		}
		var time = new Array();
        time[0]=Math.floor(sec/(60*60*24));
        time[1]=Math.floor((sec-time[0]*24*60*60)/3600);
        time[2]=Math.floor((sec-time[0]*24*60*60-time[1]*3600)/60);
        time[3]=Math.floor(sec-time[0]*24*60*60-time[1]*3600-time[2]*60);
        sec = (sec - 1 > 0) ? sec - 1 : 0;
        if(time[1]<10)
        {
            time[1] = "0"+time[1];
        }
        if(time[2]<10)
        {
            time[2] = "0"+time[2];
        }
        if(time[3]<10)
        {
            time[3] = "0"+time[3];
        }
		$(dom).attr(attribute, sec);
		var domArr = $(dom).find(".xsbj");
		for(var i = 0; i < 4; i++){
			if($(domArr[i]).text() != time[i]){
				$(domArr[i]).text(time[i]);
			}
		}
    });
})
//我要咨询分页列表
function getComments1(offset){
    var limit = 10;
    var url	= "/mall/ajaxGetComment?goods_id="+goods_id+"&offset="+offset;
    $.get(
        url,
        {},
        function(data){
            var nodeArr	= data.list;
            var total	= data.total;
            var nodes	= '';
            var pages	= '';
            var nodeArrLen = nodeArr.length;
            for(var i = 0; i < nodeArrLen; i++){
                nodes 	+= '<div class="ply clearfix"><div class="plim">'
                    +'<a href="/u/'+nodeArr[i]['username']+'" target="_blank"><img src="'+nodeArr[i]['userimage']+'"></a></div>'
                    +'<div class="plright clearfix">'
                    +'<span class="pright"><a href="/u/'+nodeArr[i]['username']+'.html" class="ht_s">'
                    +nodeArr[i]['nickname']
                    +'</a>'
                    +nodeArr[i]['createdate']
                    +'<a href="javascript:void(0)" onclick="huifu(this)" attr="'+nodeArr[i]['nickname']+'" user="'+nodeArr[i]['user_id']+'" id="'+nodeArr[i]['commentid']+'"> 回复 </a></span>'
                    +'<span class="px">'
                    +nodeArr[i]['comment']
                    +'</span></div></div>';
            }
            var currentPage	= Math.floor(offset/limit) + 1;
            var totalPage	= Math.ceil(total/limit);
            var pagesHtml	= data.pages;

            $("#cm_pages").html(pagesHtml);
            $("#good-comment").html(nodes);
            $("html,body").animate({scrollTop:$("#spzx").offset().top},1);
        },
        "json"
    );
}
function yincang(type){
    var aid = type.id;
    $('#haopin').removeClass('hpbjs');
    $('#zhongpin').removeClass('hpbjs');
    $('#chapin').removeClass('hpbjs');
    $("#"+aid).addClass('hpbjs');
    $('.haopnr').html('');
    $("#spage").html('');
    score   = $(type).attr('data-type');
    getOrders(0);
}
function getOrders(offset){
    var limit = 10
    var url	= "/mall/ajaxShowOrder?goods_id="+goods_id+"&score="+score+"&limit="+limit+"&offset="+offset;
    $.get(
        url,
        {},
        function(data){
            if(!data){
                return;
            }
            if(data['total']<=0)
            {
                $('#comment .haopnr').html('<div style="height: 50px;font-size: 14px; text-align:center;width:940px;color:#999;" >「 暂无评价 」</div>');
                return false;
            }
            var comments = data['list'];
            var total	= data['total'];
            var score 	= data['score'];
            var commentHtml = '';
            var len = comments.length;
            for(var i = 0; i < len; i++ ){
                commentHtml	+= '<div class="hpdl"><a href="/u/'+comments[i]['username']+'.html" target="_blank"><img class="ghd_s" src="'
                    +comments[i]['userimage']
                    +'"></a><div class="hdltd"><h2>'
                    +'<a href="/u/'+comments[i]['username']+'.html" target="_blank">'+comments[i]['nickname']+"</a>"
                    +'</h2><p>'
                    +comments[i]['content']
                    +'</p><div class="tplb_ol clearfix">';
                var img		= comments[i]['img'];
                var vimg    = comments[i]['vimg'];
                var imgLen	= img.length;
                for(var j = 0; j < imgLen; j++){
                    if(img[j]){
                    commentHtml += '<a class="cboxElement" rel="recipe_img" href="'+vimg[j]+'"><img class="mr" src="'
                        +img[j]
                        +'" alt=" " /></a>';
                    }
                }
                commentHtml +='</div><span>'
                    +comments[i]['createtime']
                    +'</span></div><div class="tagg clearfix"><em></em><span></span></div></div>';
            }
            var pagesHtml	= data.pages;

            $("#spage").html(pagesHtml);
            $("#comment .haopnr").html(commentHtml);
            $("a[rel=recipe_img]").fancybox({
                      'titlePosition' : 'over',
                      'cyclic'        : true,
                      'titleFormat'   : function(title, currentArray, currentIndex, currentOpts) {
                      return '<span id="fancybox-title-over">' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
                      }
				});
        },
        "json"
    );
}
//减少购买数量
function minus()
{
    var num = $('#goods_num').val();
    if(num>0&&!isNaN(num))
    {
        num=num-1
        if(num>=1){
            $('.minus').addClass('minus1');
            $('.plus').addClass('minus1');
            $('#goods_num').val(num);

        }
        if(num==1)
        {
            $('.plus').addClass('minus1');
            $('.minus').removeClass('minus1');
        }
    }else{
        $('#goods_num').val(1)
    }
}
//添加购买商品数量
function plus()
{
    var num = $('#goods_num').val();
    if(num>0&&!isNaN(num))
    {
        num=parseInt(num)+1;
        if(judgeNum(num)){
            $('.minus').addClass('minus1');
            $('#goods_num').val(num);
        }
    }else{
        $('#goods_num').val(1)
    }
}
//判断购买数量
function judgeNum(num){
    var shuliang = xiangou;
    if(num>shuliang&&shuliang!=0)
    {
        $('.plus').removeClass('minus1');
        return false;
    }
    if(num==shuliang&&shuliang!=0)
    {
        $('.xiangou').show();
        $('.plus').removeClass('minus1');
    }
     return true;
}