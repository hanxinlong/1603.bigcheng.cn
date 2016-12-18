$(".cdoard").live("mouseover mouseout", function (A) {
    if (A.type == "mouseover") {
        $(this).find(".bu_edite").removeClass("hidden");
        $(this).find(".bu_delete").removeClass("hidden")
    } else {
        $(this).find(".bu_edite").addClass("hidden");
        $(this).find(".bu_delete").addClass("hidden")
    }
});
$(".myone").live("mouseover mouseout", function (A) {
    if (A.type == "mouseover") {
        $(this).find(".bu_edite").removeClass("hidden");
        $(this).find(".bu_delete").removeClass("hidden")
    } else {
        $(this).find(".bu_edite").addClass("hidden");
        $(this).find(".bu_delete").addClass("hidden")
    }
});
$(".dmone").live("mouseover mouseout", function (A) {
    if (A.type == "mouseover") {
        $(this).find(".bu_edite").removeClass("hidden");
        $(this).find(".bu_delete").removeClass("hidden")
    } else {
        $(this).find(".bu_edite").addClass("hidden");
        $(this).find(".bu_delete").addClass("hidden")
    }
});
$(".dietDelBtn").click(function () {
    var A = $(this).attr("diet_id");
    $.fn.confirm({
        msg: "确定删除这条美食日记？", callback: function () {
            $.ajax({
                type: "post",
                url: "/uajax/delDiet",
                data: "id=" + A,
                dataType: "json",
                async: false,
                success: function (B) {
                    if (B.data == "OK") {
                        window.location.reload()
                    } else {
                        if (B.data == "slice") {
                            showerrorinfo("提示", "您仍处在禁言期内，不能发表或编辑内容。")
                        } else {
                            if (B.data == "NOLOGIN") {
                                logindialog()
                            } else {
                                showerrorinfo("提示", "删除失败！")
                            }
                        }
                    }
                }
            })
        }
    })
});
$(".caidandelbanner").click(function () {
    var A = $(this).attr("caidanid");
    $.fn.confirm({
        msg: "确定删除这个菜单？", callback: function () {
            $.ajax({
                type: "post",
                url: "/uajax/getDelcaidan",
                data: "caidanid=" + A,
                dataType: "json",
                async: false,
                success: function (B) {
                    if (B.data.flag == "Success") {
                        window.location.href = "/caipu/caidan"
                    } else {
                        if (B.data.flag == "slice") {
                            showerrorinfo("提示", B.data.tip)
                        } else {
                            if (B.data.flag == "NoLogin") {
                                logindialog()
                            } else {
                                showerrorinfo("提示", "删除失败！")
                            }
                        }
                    }
                }
            })
        }
    })
});
$(".caipudelbanner").click(function () {
    var B = $(this).attr("cookid");
    var A = $(this).attr("uid");
    $.fn.confirm({
        msg: "确定删除这个菜谱？", callback: function () {
            $.ajax({
                type: "post",
                url: "/uajax/actionDelCaipu",
                data: "cookid=" + B + "&uid=" + A,
                dataType: "json",
                async: false,
                success: function (C) {
                    if (C.data.flag == "Success") {
                        window.location.reload()
                    } else {
                        if (C.data.flag == "slice") {
                            showerrorinfo("提示", C.data.tip)
                        } else {
                            if (C.data.flag == "NoLogin") {
                                logindialog()
                            } else {
                                showerrorinfo("提示", "删除失败！")
                            }
                        }
                    }
                }
            })
        }
    })
});
$(".editdiscount").live("click", function () {
    var A = $(this).attr("disnum");
    $("#disinfo" + A).hide();
    $("#showdisinfo" + A).show();
    $("#showaction" + A).hide()
});
$(".exitinfo").live("click", function () {
    var A = $(this).attr("disnum");
    $("#disinfo" + A).show();
    $("#showdisinfo" + A).hide();
    $("#showaction" + A).show()
});
$(".saveinfo").live("click", function () {
    var B = $(this).attr("disnum");
    var A = $("#showmydescription" + B).val();
    $.ajax({
        type: "post",
        url: "/uajax/actionEditInfo",
        data: "id=" + B + "&desctext=" + A,
        dataType: "json",
        async: false,
        success: function (C) {
            if (C.data.flag == "Success") {
                $("#disinfo" + B).html(A);
                $("#showmydescription" + B).html(A);
                $("#disinfo" + B).show();
                $("#showdisinfo" + B).hide();
                $("#showaction" + B).show()
            } else {
                showerrorinfo("提示", "删除失败！")
            }
        }
    })
});
$(".delinfo").live("click", function () {
    var A = $(this).attr("disnum");
    $.ajax({
        type: "post",
        url: "/uajax/actionDelInfo",
        data: "id=" + A,
        dataType: "json",
        async: false,
        success: function (B) {
            if (B.data.flag == "Success") {
                $("#youhui" + A).remove()
            } else {
                showerrorinfo("提示", "删除失败！")
            }
        }
    })
});
$("#addDisInfo").live("click", function () {
    var A = '<div id="addshowinfo" class="togdesc"><textarea name="" cols="36" rows="8" class="reldesc" id="addTextareaInfo"></textarea><br/><input type="button" name="subinfo" id="addInfo" value="保存优惠信息"/>　<a href="javascript:void(0)" id="addDelInfo">取消</a></div>';
    $(this).parent().hide();
    $(this).parent().before(A)
});
$("#addDelInfo").live("click", function () {
    $(".pvs").show();
    $("#addshowinfo").remove()
});
$("#addInfo").live("click", function () {
    var A = $("#addTextareaInfo").val();
    $.ajax({
        type: "post",
        url: "/uajax/actionAddInfo",
        data: "desctext=" + A,
        dataType: "json",
        async: false,
        success: function (C) {
            if (C.data.flag == "Success") {
                $("#addshowinfo").remove();
                $(".pvs").show();
                var D = C.data.insertid;
                var B = addhtml(D, A);
                $(".pvs").before(B)
            } else {
                showerrorinfo("提示", "删除失败！")
            }
        }
    })
});
function addhtml(C, B) {
    var A = '<div id="youhui' + C + '" class="pfob libufo">';
    A += '<p id="disinfo' + C + '">' + B + "</p>";
    A += '<span id="showaction' + C + '" class="pedit pvm dblok">';
    A += '<a class="editdiscount" disnum="' + C + '" href="javascript:void(0)">编辑</a>';
    A += '　<a href="javascript:void(0)" disnum="' + C + '" class="delinfo">删除</a>';
    A += "</span>";
    A += '<div id="showdisinfo' + C + '" class="togdesc" style="display: none;">';
    A += '<textarea name="" cols="36" rows="8" class="reldesc" id="showmydescription' + C + '">' + B + "</textarea><br/>";
    A += '<input type="button" name="subinfo" disnum="' + C + '" value="保存优惠信息" class="saveinfo"/>　<a href="javascript:void(0)" disnum="' + C + '" class="exitinfo">取消</a>';
    A += "</div>";
    A += "</div>";
    return A
}
function doUpProfile(C) {
    var A = encodeURIComponent($("#update_profile_text").val());
    var B = "desctext=" + A + "&id=" + C;
    $.ajax({
        type: "post",
        url: "/uajax/updateUserDescription",
        data: B,
        dataType: "json",
        async: false,
        success: function (E) {
            if (E.data.flag == "Success") {
                $("#uchome_desc_update").toggle();
                var D = "吃货都会写介绍";
                if (E.data.cont != "") {
                    D = E.data.cont
                }
                $("#uchome_desc_full").html(D).append('<a href="javascript:void(0)" onclick="upProfile(' + C + ')">（修改）</a>').show()
            } else {
                if (E.data.flag == "NoLogin") {
                    logindialog()
                } else {
                    showerrorinfo("提示", E.data.tip)
                }
            }
        }
    })
}
function upProfile(A) {
    if ($("#uchome_desc_update").length > 0) {
        $("#uchome_desc_full").hide();
        $("#uchome_desc_update").toggle();
        $("#update_profile_text").focus()
    }
}
function cancelUpProfile() {
    if ($("#uchome_desc_update").length > 0) {
        $("#uchome_desc_full").toggle();
        $("#uchome_desc_update").toggle()
    }
}
function sendMsg(B, A) {
    if (B == 0 || A == 0) {
        logindialog();
        return
    }
    window.location.href = "/message/sendmsg/" + A
}
$(".caitiedel").click(function () {
    var A = $(this).attr("data-id");
    $.fn.confirm({
        msg: "确定删除这个菜贴？", callback: function () {
            $.ajax({
                type: "post",
                url: "/uajax/delCaitieInfo",
                data: "caitieid=" + A,
                dataType: "json",
                async: false,
                success: function (B) {
                    if (B.data.info == "NoLogin") {
                        logindialog()
                    } else {
                        if (B.data.info == "OK") {
                            window.location.reload()
                        } else {
                            showerrorinfo("操作错误", "删除失败，请重试！")
                        }
                    }
                }
            })
        }
    })
});
$(".opone").live("mouseover mouseout", function (A) {
    if (A.type == "mouseover") {
        $(this).find(".bu_edite").removeClass("hidden");
        $(this).find(".bu_delete").removeClass("hidden")
    } else {
        $(this).find(".bu_edite").addClass("hidden");
        $(this).find(".bu_delete").addClass("hidden")
    }
});
$(".dishdel").click(function () {
    var B = $(this).attr("dishid");
    var C = $(this).attr("cookid");
    var A = $(this).attr("uid");
    $.fn.confirm({
        msg: "确定删除这个作品？", callback: function () {
            $.ajax({
                type: "post",
                url: "/uajax/delDish",
                data: "c_id=" + C + "&user_id=" + A + "&d_id=" + B,
                dataType: "json",
                async: false,
                success: function (D) {
                    if (D.data.flag == "OK") {
                        window.location.reload()
                    } else {
                        if (D.data.flag == "NoLogin") {
                            logindialog()
                        } else {
                            if (D.data.flag == "slice") {
                                showerrorinfo("提示", D.data.tip)
                            } else {
                                showerrorinfo("提示", "删除失败！")
                            }
                        }
                    }
                }
            })
        }
    })
});
$(".zkbtn").click(function () {
    var A = $(this).attr("pid");
    $(this).hide();
    $(".zk" + A).removeClass("hidden");
    $(".zk" + A).show()
});
$(".sqbtn").click(function () {
    var A = $(this).attr("pid");
    $(".zkbtn").each(function () {
        if ($(this).attr("pid") == A) {
            $(".zk" + A).hide();
            $(this).show()
        }
    })
});
$(".del").click(function () {
    var B = $(this).attr("pid");
    var A = $(this).attr("cookid");
    $.fn.confirm({
        msg: "营养点评对大家有非常大的帮助，您确定要删除吗？", callback: function () {
            $.ajax({
                type: "post",
                url: "/uajax/ajaxDelPoint",
                data: "id=" + B + "&cookid=" + A,
                dataType: "json",
                async: false,
                success: function (C) {
                    if (C.status == "OK") {
                        window.location.reload()
                    } else {
                        showerrorinfo("提示", "删除失败！")
                    }
                }
            })
        }
    })
});
$(".like").live("click", function () {
    if ($(this).hasClass("dialike")) {
        return false
    }
    if ($(this).hasClass("dialike2")) {
        return false
    }
    var B = $(this).attr("dietid");
    var A = $("#comment_container").find(".coimg > a > img").attr("src");
    var D = $("#comment_container").find(".coimg > a > img").attr("alt");
    var C = $("#comment_container").find(".coimg > a").attr("href");
    params = "dietid=" + B;
    $.ajax({
        type: "post", url: "/uajax/addfavNum", data: params, dataType: "json", success: function (F) {
            if (F.data.flag == "NoLogin") {
                logindialog()
            } else {
                if (F.data.flag == "slice") {
                    showerrorinfo("提示", F.data.favs)
                } else {
                    if (F.data.flag == "OK") {
                        $(".creno").parent().attr("class", "xrenzan clearfix");
                        var E = "";
                        E = $(".creno").parent().find("h3 a").html();
                        if (E && $(".creno").parent().attr("class") == "xrenzan clearfix") {
                            newnum = new Number(E.substr(1, E.length - 2));
                            $(".creno").parent().find("h3 a").html("(" + (++newnum) + ")")
                        }
                        if ($(".creno > a").html()) {
                            $(".creno > a").first().before("<a href='" + C + "' title='" + D + "' target='_blank'><img alt='" + D + "' src='" + A + "' /></a>")
                        } else {
                            $(".creno").append("<a href='" + C + "' title='" + D + "' target='_blank'><img alt='" + D + "' src='" + A + "' /></a>")
                        }
                        if ($("#like" + B).hasClass("dilike")) {
                            $("#like" + B).removeClass("dilike").addClass("dialike")
                        }
                        $("#like" + B).html('<a href="javascript:void(0);">赞' + F.data.favs + "</a>");
                        $(this).html('<a href="javascript:void(0);">赞' + F.data.favs + "</a>");
                        if (F.data.sharealert == "1") {
                            alertObj.shareAlert("like")
                        }
                    }
                }
            }
        }
    });
    $(window).bind("scroll", showMoreDiet)
});
$(".share").live("mouseover mouseout", function (A) {
    if (A.type == "mouseover") {
        $("#shareinfo").removeClass("hidden")
    } else {
        $("#shareinfo").addClass("hidden")
    }
});
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
$(".uc_guanzhu").live("click", function () {
    var A = $(this).attr("userid");
    var B = "add";
    var C = $(this).hasClass("baddf");
    if (!C) {
        B = "del";
        C = $(this).hasClass("barightf baeachf")
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
                            $("#guanzhu" + A).removeClass("barightf");
                            $("#guanzhu" + A).removeClass("baeachf");
                            $("#guanzhu" + A).addClass("baddf");
                            $("#guanzhu" + A).attr("title", "关注")
                        } else {
                            if (E.data.status == 1) {
                                $("#guanzhu" + A).removeClass("baeachf");
                                $("#guanzhu" + A).removeClass("baddf");
                                $("#guanzhu" + A).addClass("barightf");
                                $("#guanzhu" + A).attr("title", "取消关注");
                                if (E.data.sharealert == "1") {
                                    alertObj.shareAlert("guanzhu")
                                }
                            } else {
                                $("#guanzhu" + A).removeClass("barightf");
                                $("#guanzhu" + A).removeClass("baddf");
                                $("#guanzhu" + A).addClass("baeachf");
                                $("#guanzhu" + A).attr("title", "取消关注")
                            }
                        }
                    }
                }
            }
        }
    })
});
$("#useryaoqinginfo").click(function () {
    var A = $(this).attr("type");
    var B = "type=" + A;
    $.ajax({
        type: "post", url: "/uajax/sendyaoqing", data: B, dataType: "json", success: function (C) {
            if (C.data.info == "NOLOGIN") {
                logindialog()
            } else {
                if (C.data.info == "OK") {
                    showerrorinfo("提示信息", "邀请成功，微博已发送！")
                } else {
                    if (C.data.info == "Fail") {
                        showerrorinfo("提示信息", "邀请失败，请重新使用微博账号登陆！")
                    }
                }
            }
        }
    })
});
$(".newgz").live("click", function () {
    var A = $(this).attr("userid");
    var B = "add";
    var C = $(this).hasClass("jiaf");
    if (!C) {
        B = "del";
        C = $(this).hasClass("quxiaof")
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
                            $("#guanzhu" + A).removeClass("quxiaof");
                            $("#guanzhu" + A).addClass("jiaf");
                            $("#guanzhu" + A).attr("title", "+关注")
                        } else {
                            if (E.data.status == 1) {
                                $("#guanzhu" + A).removeClass("jiaf");
                                $("#guanzhu" + A).addClass("quxiaof");
                                $("#guanzhu" + A).attr("title", "取消关注")
                            } else {
                                $("#guanzhu" + A).removeClass("jiaf");
                                $("#guanzhu" + A).addClass("quxiaof");
                                $("#guanzhu" + A).attr("title", "取消关注")
                            }
                        }
                    }
                }
            }
        }
    })
});
$(".newgzz").live("click", function () {
    var A = $(this).attr("userid");
    var B = "add";
    var C = $(this).hasClass("careadd2");
    if (!C) {
        B = "del";
        C = $(this).hasClass("quxiaof")
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
                            $("#guanzhu" + A).removeClass("careyed2");
                            $("#guanzhu" + A).removeClass("carehxd");
                            $("#guanzhu" + A).addClass("careadd2").html("+关注");
                            $("#guanzhu" + A).attr("title", "+关注");
                            $("#guanzhu" + A).attr("onmouseout", '$(this).removeClass("carehqxd").html("+关注")');
                            $("#guanzhu" + A).removeAttr("onmouseover")
                        } else {
                            if (E.data.status == 1) {
                                $("#guanzhu" + A).removeClass("careadd2");
                                $("#guanzhu" + A).removeClass("carehxd");
                                $("#guanzhu" + A).addClass("careyed2").html("已关注");
                                $("#guanzhu" + A).attr("title", "取消关注");
                                $("#guanzhu" + A).attr("onmouseover", '$(this).addClass("carehqxd").html("取消关注")');
                                $("#guanzhu" + A).attr("onmouseout", '$(this).removeClass("carehqxd").html("已关注")');
                                $("#guanzhu" + A).attr("onclick", '$(this).removeClass("carehqxd").html("")');
                                if (E.data.sharealert == "1") {
                                    alertObj.shareAlert("guanzhu")
                                }
                            } else {
                                $("#guanzhu" + A).removeClass("careadd2");
                                $("#guanzhu" + A).removeClass("careyed2");
                                $("#guanzhu" + A).addClass("careyed2").html("互相关注");
                                $("#guanzhu" + A).attr("title", "取消关注");
                                $("#guanzhu" + A).attr("onmouseover", '$(this).addClass("carehqxd").html("取消关注")');
                                $("#guanzhu" + A).attr("onmouseout", '$(this).html("互相关注")');
                                $("#guanzhu" + A).attr("onclick", '$(this).removeClass("carehqxd").html("")')
                            }
                        }
                    }
                }
            }
        }
    })
});