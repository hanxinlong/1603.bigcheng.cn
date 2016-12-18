(function (A) {
	A.fn.slide = function (B) {
		A.fn.slide.deflunt = {
			effect: "fade",
			autoPlay: false,
			delayTime: 1000,
			interTime: 5000,
			defaultIndex: 0,
			titCell: ".hd li",
			mainCell: ".bd",
			trigger: "click",
			scroll: 1,
			vis: 1,
			titOnClassName: "on",
			autoPage: false,
			prevCell: ".prev",
			nextCell: ".next"
		};
		return this.each(function () {
			var Q = A.extend({}, A.fn.slide.deflunt, B);
			var D = Q.defaultIndex;
			var I = A(Q.prevCell, A(this));
			var E = A(Q.nextCell, A(this));
			var C = A(Q.titCell, A(this));
			var M = C.size();
			var O = A(Q.mainCell, A(this));
			var U = O.children().size();
			var S = 0;
			var T = 0;
			var N = 0;
			var J = 0;
			var K = Q.autoPlay;
			var H = null;
			var L = D;
			if (U < Q.vis) {
				return
			}
			if (M == 0) {
				M = U
			}
			if (Q.autoPage) {
				var G = U - Q.vis;
				M = 1 + parseInt(G % Q.scroll != 0 ? (G / Q.scroll + 1) : (G / Q.scroll));
				C.html("");
				for (var F = 0; F < M; F++) {
					C.append("<li>" + (F + 1) + "</li>")
				}
				var C = A("li", C)
			}
			O.children().each(function () {
				if (A(this).width() > N) {
					N = A(this).width();
					T = A(this).outerWidth(true)
				}
				if (A(this).height() > J) {
					J = A(this).height();
					S = A(this).outerHeight(true)
				}
			});
			switch (Q.effect) {
				case"top":
				O.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + Q.vis * S + 'px"></div>').css({
					"position": "relative",
					"padding": "0",
					"margin": "0"
				}).children().css({"height": J});
				break;
				case"left":
				O.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:940px"></div>').css({
					"width": U * T,
					"position": "relative",
					"overflow": "hidden",
					"padding": "0",
					"margin": "0"
				}).children().css({"float": "left", "width": N});
				break;
				case"leftLoop":
				case"leftMarquee":
				O.children().clone().appendTo(O).clone().prependTo(O);
				O.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:width:940px"></div>').css({
					"width": U * T * 3,
					"position": "relative",
					"overflow": "hidden",
					"padding": "0",
					"margin-left": "120px",
					"left": -U * T
				}).children().css({"float": "left", "width": N});
				break;
				case"topLoop":
				case"topMarquee":
				O.children().clone().appendTo(O).clone().prependTo(O);
				O.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + Q.vis * S + 'px"></div>').css({
					"height": U * S * 3,
					"position": "relative",
					"padding": "0",
					"margin": "0",
					"top": -U * S
				}).children().css({"height": J});
				break
			}
			var P = function () {
				switch (Q.effect) {
					case"fade":
					case"top":
					case"left":
					if (D >= M) {
						D = 0
					} else {
						if (D < 0) {
							D = M - 1
						}
					}
					break;
					case"leftMarquee":
					case"topMarquee":
					if (D >= 2) {
						D = 1
					} else {
						if (D < 0) {
							D = 0
						}
					}
					break;
					case"leftLoop":
					case"topLoop":
					var Y = D - L;
					if (M > 2 && Y == -(M - 1)) {
						Y = 1
					}
					if (M > 2 && Y == (M - 1)) {
						Y = -1
					}
					var W = Math.abs(Y * Q.scroll);
					if (D >= M) {
						D = 0
					} else {
						if (D < 0) {
							D = M - 1
						}
					}
					break
				}
				switch (Q.effect) {
					case"fade":
					O.children().stop(true, true).eq(D).fadeIn(Q.delayTime).siblings().hide();
					break;
					case"top":
					O.stop(true, true).animate({"top": -D * Q.scroll * S}, Q.delayTime);
					break;
					case"left":
					O.stop(true, true).animate({"left": -D * Q.scroll * T}, Q.delayTime);
					break;
					case"leftLoop":
					if (Y < 0) {
						O.stop(true, true).animate({"left": -(U - W) * T}, Q.delayTime, function () {
							for (var Z = 0; Z < W; Z++) {
								O.children().last().prependTo(O)
							}
							O.css("left", -U * T)
						})
					} else {
						O.stop(true, true).animate({"left": -(U + W) * T}, Q.delayTime, function () {
							for (var Z = 0; Z < W; Z++) {
								O.children().first().appendTo(O)
							}
							O.css("left", -U * T)
						})
					}
					break;
					case"topLoop":
					if (Y < 0) {
						O.stop(true, true).animate({"top": -(U - W) * S}, Q.delayTime, function () {
							for (var Z = 0; Z < W; Z++) {
								O.children().last().prependTo(O)
							}
							O.css("top", -U * S)
						})
					} else {
						O.stop(true, true).animate({"top": -(U + W) * S}, Q.delayTime, function () {
							for (var Z = 0; Z < W; Z++) {
								O.children().first().appendTo(O)
							}
							O.css("top", -U * S)
						})
					}
					break;
					case"leftMarquee":
					var V = O.css("left").replace("px", "");
					if (D == 0) {
						O.animate({"left": ++V}, 0, function () {
							if (O.css("left").replace("px", "") >= 0) {
								for (var Z = 0; Z < U; Z++) {
									O.children().last().prependTo(O)
								}
								O.css("left", -U * T)
							}
						})
					} else {
						O.animate({"left": --V}, 0, function () {
							if (O.css("left").replace("px", "") <= -U * T * 2) {
								for (var Z = 0; Z < U; Z++) {
									O.children().first().appendTo(O)
								}
								O.css("left", -U * T)
							}
						})
					}
					break;
					case"topMarquee":
					var X = O.css("top").replace("px", "");
					if (D == 0) {
						O.animate({"top": ++X}, 0, function () {
							if (O.css("top").replace("px", "") >= 0) {
								for (var Z = 0; Z < U; Z++) {
									O.children().last().prependTo(O)
								}
								O.css("top", -U * S)
							}
						})
					} else {
						O.animate({"top": --X}, 0, function () {
							if (O.css("top").replace("px", "") <= -U * S * 2) {
								for (var Z = 0; Z < U; Z++) {
									O.children().first().appendTo(O)
								}
								O.css("top", -U * S)
							}
						})
					}
					break
				}
				C.removeClass(Q.titOnClassName).eq(D).addClass(Q.titOnClassName);
				L = D
			};
			P();
			if (K) {
				if (Q.effect == "leftMarquee" || Q.effect == "topMarquee") {
					D++;
					H = setInterval(P, Q.interTime);
					O.hover(function () {
						if (K) {
							clearInterval(H)
						}
					}, function () {
						if (K) {
							clearInterval(H);
							H = setInterval(P, Q.interTime)
						}
					})
				} else {
					H = setInterval(function () {
						D++;
						P()
					}, Q.interTime);
					A(this).hover(function () {
						if (K) {
							clearInterval(H)
						}
					}, function () {
						if (K) {
							clearInterval(H);
							H = setInterval(function () {
								D++;
								P()
							}, Q.interTime)
						}
					})
				}
			}
			var R;
			if (Q.trigger == "onclick") {
				C.hover(function () {
					clearTimeout(R);
					D = C.index(this);
					R = window.setTimeout(P, 200)
				}, function () {
					if (!R) {
						clearTimeout(R)
					}
				})
			} else {
				C.click(function () {
					D = C.index(this);
					P()
				})
			}
			E.click(function () {
				D++;
				P()
			});
			I.click(function () {
				D--;
				P()
			})
		})
}
})(jQuery);
jQuery(".fivebox").slide({mainCell: ".bd ul", effect: "leftLoop", vis: 1, scroll: 1, autoPlay: true});
jQuery(".leftLoop").slide({mainCell: ".bd ul", effect: "leftLoop", vis: 3, scroll: 3, autoPlay: true});
$(document).ready(function () {
	JS_HoverToggle();
	JS_PlaceHolder();
	if ($("#feedlist").length > 0) {
		setInterval("prefer.checkNewFeed()", 6000)
	}
	if ($(".autoshow").size() > 1) {
		$(".autoshow").hide();
		$(".autoshow:gt(0)").show();
		setInterval("autoshowdirect()", 4000)
	}
	if ($("#btn_batchAddFriends").length > 0) {
		$("#btn_batchAddFriends").live("click", function () {
			if ($(this).attr("uid") <= 0) {
				logindialog();
				return false
			}
			$(".careadd").each(function (C, B) {
				$(this).click()
			});
			A()
		})
	}
	$(".ic_change").live("click", function () {
		$.ajax({
			type: "post", url: "/main/getProUsers", data: "", dataType: "html", success: function (B) {
				$("#prousers").html(B)
			}
		})
	});
	$("#newFeedShow").live("click", function () {
		A()
	});
	$("#clk_my").live("click", function () {
		$("#my_shicai").show();
		$("#sl_shicai").hide()
	});
	$("#clk_sl").live("click", function () {
		$("#sl_shicai").show();
		$("#my_shicai").hide()
	});
	$("#prefe_set").live("click", function () {
		$("#prefe_question").show();
		$("#prefe").hide()
	});
	function A() {
		$("#guanzhu_batch").hide();
		$.ajax({
			type: "post",
			url: "/uajax/ajaxFeedlist",
			data: "",
			async: false,
			dataType: "json",
			success: function (B) {
				if (B.status == "OK") {
					if (B.data.data != "") {
						$("#feedlist").html(B.data.data);
						$("#guanzhu_batch").hide()
					} else {
					}
				}
			}
		})
	}
});
function ShowMorePros(A, C) {
	var B = $(A).attr("times");
	$.ajax({
		type: "post",
		url: "/ajax/getProUserList/" + C + "/" + B,
		data: "",
		dataType: "html",
		success: function (D) {
			$("#viplist").html(D);
			$(A).attr("times", (parseInt(B) + 1))
		}
	})
}
function chVipUserLists(A) {
	A = $(A);
	$.ajax({
		url: "/ajax/getProUserList", type: "post", success: function (B) {
			if (B != "") {
				A.parents(".gourmet").find(".clearfix").remove();
				A.parents(".gourmet").append(B)
			} else {
				return false
			}
		}
	})
}
function autoshowdirect() {
	var A = $(".autoshow").size();
	var B = $(".autoshow").index($(".autoshow:visible"));
	var C = new Number(B) + 1;
	if (B == A - 1) {
		$(".autoshow:visible").hide();
		$(".autoshow:first").show()
	} else {
		$(".autoshow:visible").hide();
		$(".autoshow:eq(" + C + ")").show()
	}
}
prefer = {
	icount: "", overtime: "", stop: 0, icount_num: 0, checkNewFeed: function () {
		var A = $("#cur_feedid").val();
		$.ajax({
			type: "post", url: "/uajax/checkNewFeed", data: "cur_feedid=" + A, dataType: "json", success: function (B) {
				if (B.status == "OK") {
					$("#newFeedShow").removeClass("hidden");
					$("#not_feedlist").hide()
				} else {
					return true
				}
			}
		})
	}
};
$(".pertag").live("click", function () {
	var B = $(this).html();
	var A = $(this).attr("info");
	if ($(this).hasClass("tied")) {
		preffect(B, "del")
	} else {
		preffect(B, "add")
	}
});
$("#saveprefer").live("click", function () {
	var C = "";
	C = $("#the_home").val();
	var D = "";
	$("#the_kouwei a").each(function () {
		var F = $(this);
		if (F.hasClass("tied")) {
			D += F.html() + ","
		}
	});
	var A = "";
	$("#the_shicai a").each(function () {
		var F = $(this);
		if (F.hasClass("tied")) {
			A += F.html() + ","
		}
	});
	var B = "";
	$("#the_caishi a").each(function () {
		var F = $(this);
		if (F.hasClass("tied")) {
			B += F.html() + ","
		}
	});
	var E = "";
	$("#the_gongxiao a").each(function () {
		var F = $(this);
		if (F.hasClass("tied")) {
			E += F.html() + ","
		}
	});
	if (C == "") {
		showerrorinfo("提示", "请选择您的家乡！");
		return false
	}
	if (A == "") {
		showerrorinfo("提示", "请选择您的食材偏好！");
		return false
	}
	if (D == "") {
		showerrorinfo("提示", "请选择您的口味！");
		return false
	}
	if (B == "") {
		showerrorinfo("提示", "请选择您偏爱的菜式！");
		return false
	}
	if (E == "") {
		showerrorinfo("提示", "请选择您看重的营养功效！");
		return false
	}
	$.ajax({
		type: "post",
		url: "/main/addUserPersonality",
		data: "home=" + C + "&shicai=" + A + "&kouwei=" + D + "&caishi=" + B + "&gongxiao=" + E,
		dataType: "json",
		success: function (F) {
			if ($("#saveprefer_type").val() == "add") {
				$("#wait_suggest").show();
				getSuggestHtml()
			} else {
				showerrorinfo("提示", "个人偏好修改成功！")
			}
		}
	})
});
function preffect(E, A) {
	var C = $(".pertag").length;
	if (C > 0) {
		for (var B = 0; B < C; B++) {
			var D = $(".pertag").eq(B).html();
			if (E == D) {
				if (A == "add") {
					$(".pertag").eq(B).addClass("tied")
				} else {
					$(".pertag").eq(B).removeClass("tied")
				}
			}
		}
	}
}
function getSuggestHtml(A) {
	if (prefer.stop == 1 || prefer.icount_num > 5) {
		clearInterval(prefer.icount);
		return true
	}
	$.ajax({
		type: "post", url: "/uajax/getSuggest", data: "", dataType: "json", success: function (B) {
			prefer.icount_num = prefer.icount_num + 1;
			if (B.status == "OK") {
				if (B.data.data != "") {
					$("#wait_suggest").hide();
					$("#suggest_ctn").html(B.data.data);
					prefer.stop = 1;
					$("#prefe_question").hide()
				} else {
					prefer.icount = setInterval("getSuggestHtml()", 2000)
				}
			} else {
				prefer.icount = setInterval("getSuggestHtml()", 2000);
				if (B.data.info == "NoLogin") {
					logindialog()
				} else {
				}
			}
		}
	})
}
$(".difenx").live("mouseover mouseout", function (A) {
	var B = $(this).attr("id");
	if (A.type == "mouseover") {
		$("#share" + B).removeClass("hidden")
	} else {
		$("#share" + B).addClass("hidden")
	}
});
$(".guanzhu").live("click", function () {
	var A = $(this).attr("userid");
	var B = "add";
	var C = $(this).hasClass("careadd");
	if (!C) {
		B = "del";
		C = $(this).hasClass("careyed carehxd")
	}
	var D = "userid=" + A + "&info=" + B;
	$.ajax({
		type: "post", url: "/uajax/addDelFriend", data: D, dataType: "json", success: function (E) {
			if (E.data.flag == "NoLogin") {
				logindialog()
			} else {
				if (E.data.flag == "slice") {
					showerrorinfo("提示", E.data.tip)
				} else {
					if (E.data.flag == "Success") {
						if (E.data.status == 0 || E.data.status == -1) {
							$("#guanzhu" + A).removeClass("carehxd");
							$("#guanzhu" + A).removeClass("careyed");
							$("#guanzhu" + A).addClass("careadd");
							$("#guanzhu" + A).attr("title", "+关注")
						} else {
							if (E.data.status == 1) {
								$("#guanzhu" + A).removeClass("carehxd");
								$("#guanzhu" + A).removeClass("careadd");
								$("#guanzhu" + A).addClass("careyed");
								$("#guanzhu" + A).attr("title", "取消关注");
								if (E.data.sharealert == "1") {
									alertObj.shareAlert("guanzhu")
								}
							} else {
								$("#guanzhu" + A).removeClass("careyed");
								$("#guanzhu" + A).removeClass("careadd");
								$("#guanzhu" + A).addClass("carehxd");
								$("#guanzhu" + A).attr("title", "取消关注")
							}
						}
					}
				}
			}
		}
	})
});
/**
 首页验证申请达人
 **/
 function checkRenZheng() {
 	$.ajax({
 		type: 'post',
 		url: '/ajax/ajaxCheckIsVip',
 		data: 'douguo=1',
 		dataType: 'json',
 		success: function (msg) {
 			if (msg.data == 'noLogin' && msg.status == 'ERR') {
 				logindialog();
 			}
 			else if (msg.status == 'ERR') {
 				showerrorinfo('申请美食达人', msg.data);
 			}
 			else {
 				window.location.href = "/user/renzheng";
 			}
 		}
 	})
 }