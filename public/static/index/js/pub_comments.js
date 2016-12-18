(function (A) {
    comments = {
        ctype: "",
        cid: "",
        gs_userid: 0,
        gs_purview: 0,
        cm_pid: "",
        cm_touid: 0,
        cm_tounick: "",
        cm_touname: "",
        cm_toutnick: "",
        cm_tousource_id: 0,
        cm_total: 0,
        curl: "",
        cname: "",
        comment_container: "comment_container",
        result: {},
        spclass: "",
        orderby: "",
        showComments: function (B, D, C) {
            var E;
            if (comments.orderby == "desc") {
                E = comments.ctype + "/" + comments.cid + "/" + B + "/5/desc/?" + Math.random()
            } else {
                E = comments.ctype + "/" + comments.cid + "/" + B + "?" + Math.random()
            }
            A.getJSON("/ajax/getCommentsList/" + E, function (F) {
                if (comments.cm_total == 0) {
                    comments.cm_total = F.data.total
                }
                if (comments.cm_total > 0 && comments.ctype == "caidan") {
                    A("#comment_total").html('<a href="' + comments.curl + '" class="btnmorp mtl ml30 dblok" id="caidantotalcomment" target="_blank">所有' + comments.cm_total + "条评论</a>")
                }
                comments.result = F;
                if (comments.ctype == "try") {
                    A("#commentTotal").html(F.data.total)
                }
                if (B == 0 && F.data.total > 10) {
                    comments.initCommentsPages(F.data.total)
                }
                if (F.data.total <= 10) {
                    comments.createCommentHTML(F.data);
                    STK.pageletM.start()
                }
            })
        },
        initCommentsPages: function (B) {
            A("#cm_pages").pagination(B, {
                num_edge_entries: 1,
                num_display_entries: 5,
                callback: comments.pageSelCallback,
                items_per_page: 10
            })
        },
        goToPage: function (C, B) {
            A("#cm_pages").pagination(C, {
                num_edge_entries: 1,
                num_display_entries: 5,
                current_page: B,
                callback: comments.pageSelCallback,
                items_per_page: 10
            })
        },
        pageSelCallback: function (C, B) {
            var D;
            if (comments.orderby == "desc") {
                D = comments.ctype + "/" + comments.cid + "/" + C + "/5/desc?" + Math.random()
            } else {
                D = comments.ctype + "/" + comments.cid + "/" + C + "?" + Math.random()
            }
            if (comments.result != "") {
                comments.createCommentHTML(comments.result.data);
                STK.pageletM.start()
            } else {
                A.getJSON("/ajax/getCommentsList/" + D, function (E) {
                    comments.createCommentHTML(E.data);
                    STK.pageletM.start()
                })
            }
        },
        submitComment: function (F, D) {
            var D = A(D).parent().find("textarea");
            var G = A.trim(D.val());
            if (G == "" || G.length < 1) {
                return false
            }
            if (!F || F <= 0) {
                logindialog();
                return false
            }
            var H = 5;
            var B = /@(.+?)\s/g;
            var C = G.match(B);
            var E = 0;
            if (C != null) {
                E = C.length
            }
            if (E >= H) {
                showerrorinfo("提示", "@好友不能超过5个哟");
                return false
            }
            G = encodeURIComponent(G);
            A("#commentbut").attr("disabled", "true");
            A("#commentbut").html("提交中");
            var uid = 0;
            if (this.ctype == 'caipu') {
                uid = $('#user_id').val();
            }
            params = "&pid=" + this.cm_pid + "&touser=" + this.cm_touid + "&nick=" + this.cm_tounick + "&name=" + this.cm_touname + "&type=" + this.ctype + "&id=" + this.cid + "&source_id=" + this.cm_tousource_id + "&tnick=" + this.cm_toutnick + "&comment=" + G + "&user_id=" + uid;
            A(D).parent().find("textarea").val(" ");
            A.ajax({
                type: "post", url: "/uajax/addComment", data: params, dataType: "json", success: function (J) {
                    if (J.status == "OK") {
                        comments.clearComment();
                        var I = parseInt(comments.cm_total);
                        comments.cm_total = I + 1;
                        if (comments.ctype == "store" || comments.ctype == "caidan") {
                            comments.showComments(0)
                        } else {
                            if (I < 10) {
                                comments.showComments(0);
                                document.location = "#cmt_btm"
                            } else {
                                page_offset = Math.ceil((parseInt(I) + 1) / 10);
                                page_offset = ((page_offset - 1) <= 0) ? 0 : (page_offset - 1);
                                comments.goToPage((I + 1), page_offset);
                                comments.goDiv("cm_pages")
                            }
                        }
                        A("#commentbut").removeAttr("disabled");
                        A("#commentbut").html("评论");
                        if (J.data == "sharealert") {
                            alertObj.shareAlert("comment")
                        }
                    } else {
                        if (J.data == "MORE") {
                            showerrorinfo("提示", "亲，@好友不能超过10个呦！")
                        } else {
                            if (J.data == "slice") {
                                showerrorinfo("提示", "您仍处在禁言期内，不能发表或编辑内容。")
                            } else {
                                if (J.data == "dump") {
                                    showerrorinfo("发布失败", "客官~您不能重复提交一样的内容滴！")
                                } else {
                                    if (J.data == "fast") {
                                        showerrorinfo("发布失败", "客官~您说的太快了喝口茶再聊啊！")
                                    } else {
                                        showerrorinfo("提示", "评论失败，请重试")
                                    }
                                }
                            }
                        }
                        A("#commentbut").removeAttr("disabled");
                        A("#commentbut").html("评论")
                    }
                }
            })
        },
        goDiv: function (C) {
            var B = A("#comment_container div:last-child");
            if (B.length > 0) {
                var D = B.offset().top + 200;
                A("html,body").animate({scrollTop: D}, 1)
            }
        },
        reply: function (F, E, D, B) {
            var G = A("#comment_container");
            var C = G.find("textarea");
            if (C.length > 0) {
                C.focus();
                C.val("@" + F + " ");
                this.cm_pid = B;
                this.cm_touid = D;
                this.cm_tounick = F;
                this.cm_touname = E
            } else {
                document.location = "#comment"
            }
        },
        replyThird: function (E, F, C) {
            var D = A("#comment_container");
            var B = D.find("textarea");
            if (B.length > 0) {
                B.focus();
                B.val("回复 " + E + ": ");
                this.cm_tousource_id = F;
                this.cm_toutnick = E
            } else {
                document.location = "#comment"
            }
        },
        commentFormHTML: function (D) {
            var C = [];
            var B = "评论";
            if (this.curl == "") {
                if (this.name) {
                    C.push('<h2 class="mb15" ><a name="comment"></a>' + this.cname + "的评论</h2>")
                }
            } else {
                if (this.ctype == "user") {
                    B = "留言";
                    C.push('<h2 class="mb15 fwb" ><a name="comment"></a><a href="' + this.curl + '" target="_blank"  class="ablack">' + this.cname + '的留言</a><span style="display:none;" class="cm_totals">{{total}}</span></h2>')
                } else {
                    C.push('<h2 class="mb15 fwb" ><a name="comment"></a><a href="' + this.curl + '" target="_blank" class="ablack">' + this.cname + '的评论</a><span style="display:none;" class="cm_totals">{{total}}</span></h2>')
                }
            }
            C.push('<div class="' + this.spclass + ' mbm clearfix">');
            if (D.id == 0) {
                C.push('<div class="coimg mrm"><a href="javascript:void(0);" target="_blank"><img alt="游客" src="/static/img/48.jpg"></a></div>');
                C.push('<div class="cpont">');
                C.push('<div class="textping r3 mbm">');
                C.push('<span class="r3 noping">发表评论，你需要  <a href="javascript:void(0);" onclick="logindialog();">登录</a> 或 <a href="/signup.html" rel="nofollow">注册</a></span>');
                C.push("</div>");
                C.push('<button type="button" disabled="true" class="btnpl">' + B + "</button>")
            } else {
                C.push('<div class="coimg mrm">');
                C.push('<a href="/u/' + D.info.username + '.html" rel="nofollow" target="_blank" rel="nofollow"><img alt="' + D.info.nickname + '" src="' + D.info.headicon + '"></a>');
                C.push("</div>");
                C.push('<div class="cpont" id="weiboDiv">');
                C.push('<textarea name="comment_content" node-type="editor" class="textping r3 mbm"></textarea>');
                C.push('<button name="submit_content_btn" reload="false"  onclick="comments.submitComment(' + D.info.user_id + ', this)" type="button" id="commentbut" class="btnpl">' + B + "</button>");
                C.push("</div>")
            }
            C.push("</div>");
            return (C.join(""))
        },
        commentBoxHTML: function (D) {
            var C = [];
            var B = D.nickname.replace(/\r/ig, "").replace(/\n/ig, "");
            C.push('<div class="' + this.spclass + ' ptb2010 clearfix libdm" data-template="lists" id="' + D.commentid + '">');
            C.push('<div class="coimg mrm">');
            if (D.username != "" && D.nickname != "") {
                C.push('<a href="/u/' + D.username + '.html" rel="nofollow" target="_blank" rel="nofollow"><img alt="' + D.nickname + '" src="' + D.headicon + '"></a>')
            } else {
                if (D.t_username != "" && D.t_username != undefined) {
                    if (D.t_headicon == "") {
                        C.push('<a href="http://t.qq.com/' + D.t_username + '" target="_blank" rel="nofollow"><img src="http://i1.douguo.net/static/img/48.jpg" alt="' + D.t_nickname + '" /></a>')
                    } else {
                        C.push('<a href="http://t.qq.com/' + D.t_username + '" target="_blank" rel="nofollow"><img src="' + D.t_headicon + '/50" alt="' + D.t_nickname + '" /></a>')
                    }
                } else {
                    C.push('<a href="javascript:void(0);" ><img src="' + D.headicon + '" alt="游客" /></a>')
                }
            }
            C.push("</div>");
            C.push('<div class="cpont">');
            C.push('<div class="cppdd clearfix mb10 lineh16">');
            if (D.username != "" && D.nickname != "") {
                C.push('<span class="clo"><a class="user" href="/u/' + D.username + '.html" target="_blank" rel="nofollow">' + D.nickname + "</a></span>")
            } else {
                if (D.t_username != "" && D.t_username != undefined) {
                    C.push('<span class="clo"><a class="user" href="http://t.qq.com/' + D.t_username + '" target="_blank" rel="nofollow">' + D.t_nickname + '</a><a href="' + D.source_url + '" target="_blank" title="消息来自腾讯微博"><em class="icon_txhy"></em></a></span>')
                } else {
                    C.push('<span class="clo"><a class="user" href="javascript:void(0);" >游客</a></span>')
                }
            }
            if (D.vipicon == 1) {
                C.push('<a title="豆果美食企业认证" target="_blank" rel="nofollow" class="picon proqy" href="/user/prodesc"></a>')
            } else {
                if (D.vipicon == 2) {
                    C.push('<a title="豆果美食达人认证" target="_blank" rel="nofollow" class="picon progr" href="/user/prodesc"></a>')
                }
            }
            if (D.local != "") {
                C.push('<span class="fcc mls">(' + D.local + ")</span>")
            }
            C.push('<span class="fcc mls">' + D.createdate + "</span>");
            C.push('<span class="fcc mls">');
            if (this.gs_userid > 0) {
                if (comments.ctype == "subject" || comments.ctype == "dish") {
                    if (this.gs_userid == D.user_id || this.gs_purview == 99) {
                        C.push('<a href="javascript:void(0);" onclick="comments.delcomment(\'' + D.commentid + "', '" + this.ctype + "')\">删除</a>&nbsp;&nbsp;")
                    }
                } else {
                    if (this.gs_userid == D.userid || this.gs_purview == 99) {
                        C.push('<a href="javascript:void(0);" onclick="comments.delcomment(\'' + D.commentid + "', '" + this.ctype + "')\">删除</a>&nbsp;&nbsp;")
                    }
                }
            }
            if (D.username != "") {
                C.push('<a href="javascript:void(0);" onclick="comments.reply(\'' + B + "', '" + D.username + "', '" + D.userid + "','" + D.commentid + "')\">回复</a>")
            } else {
                C.push('<a href="javascript:void(0);" onclick="comments.replyThird(\'' + D.t_nickname + "', '" + D.source_id + "')\">回复</a>")
            }
            C.push("</span>");
            C.push("</div>");
            C.push('<p class="mb10 fsm atcolor">' + D.comment + "</p>");
            C.push("</div>");
            C.push("</div>");
            return (C.join(""))
        },
        commentFormSpHTML: function (C) {
            var B = [];
            B = "";
            B += '<h3 class="mbs">留言</h3>';
            if (C.id == 0) {
                B += '<div class="leworxt r3 mb10">';
                B += '<span class="r3 noping">发表评论，你需要  <a href="javascript:void(0);" onclick="logindialog();">登录</a> 或 <a href="/signup.html" rel="nofollow">注册</a></span>';
                B += "</div>";
                B += '<button type="button" disabled="true" class="btnpl mb10">评论</button>'
            } else {
                B += '<div id="weiboDiv">';
                B += '<textarea name="comment_content" class="leworxt r3 mb10 fcbm" node-type="editor"></textarea>';
                B += '<button name="submit_content_btn" reload="true"  onclick="comments.submitComment(' + C.info.user_id + ', this)" type="button" id="commentbut" class="btnpl mb10">评论</button>';
                B += "</div>"
            }
            return B
        },
        commentBoxSpHTML: function (C) {
            var B = [];
            B = "";
            B += '<div class="wreply pvm litbd clearfix">';
            if (C.username != "") {
                B += '<span><a class="user" href="/u/' + C.username + '.html" target="_blank" rel="nofollow">' + C.nickname + ":</a></span>"
            } else {
                if (C.t_username != "" && C.t_username != undefined) {
                    B += '<span><a class="user" href="http://t.qq.com/' + C.t_username + '" target="_blank" rel="nofollow">' + C.t_nickname + '</a><a href="' + C.source_url + '" target="_blank" title="消息来自腾讯微博"><em class="icon_txhy"></em></a></span>'
                } else {
                    B += '<span><a class="user" href="javascript:void(0);" target="_blank">游客:</a></span>'
                }
            }
            if (C.vipicon == 1) {
                B += '<a title="豆果美食企业认证" target="_blank" rel="nofollow" class="picon proqy" href="/user/prodesc"></a>'
            } else {
                if (C.vipicon == 2) {
                    B += '<a title="豆果美食达人认证" target="_blank" rel="nofollow" class="picon progr" href="/user/prodesc"></a>'
                }
            }
            if (C.local != "") {
                B += '<span class="fcc mls">(' + C.local + ")</span>"
            }
            B += '<span class="fcc mls">' + C.createdate + "</span>";
            B += '<span class="mls">';
            if (this.gs_userid == C.userid || this.gs_purview == 99) {
                B += '<a href="javascript:void(0);" onclick="comments.delcomment(\'' + C.commentid + "', '" + this.ctype + "')\">删除</a>&nbsp;&nbsp;"
            }
            B += '<a href="javascript:void(0);" onclick="comments.reply(\'' + C.nickname + "', '" + C.username + "', '" + C.userid + "','" + C.commentid + "')\">回复</a>";
            B += "</span>";
            B += '<p class="ptm fsm atcolor">' + C.comment + "</p>";
            B += "</div>";
            return B
        },
        createCommentHTML: function (C) {
            this.data = C;
            A("#" + this.comment_container).html("");
            if (this.ctype == "caidan") {
                A("#" + this.comment_container).append(this.commentFormSpHTML(C.uinfo))
            } else {
                A("#" + this.comment_container).append(this.commentFormHTML(C.uinfo))
            }
            for (var B = 0; B < C.lists.length; B++) {
                if (this.ctype == "caidan") {
                    A("#" + this.comment_container).append(this.commentBoxSpHTML(C.lists[B]))
                } else {
                    A("#" + this.comment_container).append(this.commentBoxHTML(C.lists[B]))
                }
            }
            comments.result = ""
        },
        init: function (G, F, D, C, B, E) {
            this.ctype = G;
            this.cid = F;
            this.gs_userid = A("#header_info").attr("uid");
            this.gs_purview = A("#header_info").attr("pur");
            this.curl = B;
            this.cname = E;
            if (this.ctype == "diet" || this.ctype == "subject" || this.ctype == "store" || this.ctype == "user" || this.ctype == "trial" || this.ctype == "try" || this.ctype == "tuan") {
                this.spclass = "joping"
            } else {
                if (this.ctype == "caipu" || this.ctype == "dish" || this.ctype == "jifenpro" || this.ctype == "dgvideos") {
                    this.spclass = "coping"
                }
            }
            if (this.ctype == "caidan") {
                this.orderby = "desc"
            }
        },
        clearComment: function () {
            var C = A("#comment_container");
            var B = C.find("textarea");
            B.blur();
            B.val("");
            this.cm_pid = 0;
            this.cm_touid = 0;
            this.cm_tounick = "";
            this.cm_touname = ""
        },
        delcomment: function (C, B) {
            if (C == "" || B == "") {
                return false
            }
            params = "&commentid=" + C + "&type=" + B;
            A.fn.confirm({
                msg: "确定删除这条评论信息？", callback: function () {
                    A.ajax({
                        type: "post",
                        url: "/uajax/delCommend",
                        data: params,
                        dataType: "json",
                        async: false,
                        success: function (D) {
                            if (D.data.info == "NoLogin") {
                                logindialog()
                            } else {
                                if (D.data.info == "slice") {
                                    showerrorinfo("提示", D.data.tip)
                                } else {
                                    if (D.data.info == "OK") {
                                        comments.cm_total = D.data.tot;
                                        if (B == "try") {
                                            A("#commentTotal").html(D.data.tot)
                                        }
                                        A("#" + C).remove()
                                    } else {
                                        showerrorinfo("操作错误", "删除失败，请重试！")
                                    }
                                }
                            }
                        }
                    })
                }
            })
        }
    }
})(jQuery);
jQuery.fn.pagination = function (A, B) {
    B = jQuery.extend({
        items_per_page: 10,
        num_display_entries: 10,
        current_page: 0,
        num_edge_entries: 0,
        link_to: "javascript:void(0)",
        prev_text: "上一页",
        next_text: "下一页",
        ellipse_text: "...",
        prev_show_always: false,
        next_show_always: false,
        callback: function () {
            return false
        }
    }, B || {});
    return this.each(function () {
        function F() {
            return Math.ceil(A / B.items_per_page)
        }

        function G() {
            var I = Math.ceil(B.num_display_entries / 2);
            var J = F();
            var K = J - B.num_display_entries;
            var M = H > I ? Math.max(Math.min(H - I, K) + 1, 0) : 0;
            var L = H > I ? Math.min(H + I, J) : Math.min(B.num_display_entries, J);
            return [M, L]
        }

        function D(I, J) {
            H = I;
            E();
            var K = B.callback(I, C);
            if (!K) {
                if (J.stopPropagation) {
                    J.stopPropagation()
                } else {
                    J.cancelBubble = true
                }
            }
            return K
        }

        function E() {
            C.empty();
            var J = G();
            var I = Math.ceil(H / 2) - 1;
            var O = F();
            var L = function (Q) {
                return function (R) {
                    return D(Q, R)
                }
            };
            var M = function (Q, R) {
                Q = Q < 0 ? 0 : (Q < O ? Q : O - 1);
                R = jQuery.extend({text: Q + 1, classes: ""}, R || {});
                if (Q == H) {
                    var S = jQuery("<span class='current'>" + (R.text) + "</span>")
                } else {
                    var S = jQuery("<span class='floblock'><a >" + (R.text) + "</a></span>").bind("click", L(Q)).attr("href", B.link_to.replace(/__id__/, Q))
                }
                if (R.classes) {
                    S.addClass(R.classes)
                }
                C.append(S)
            };
            if (B.prev_text && (H > 0 || B.prev_show_always)) {
                M(H - 1, {text: B.prev_text, classes: "prev"})
            }
            if (J[0] > 0 && B.num_edge_entries > 0) {
                var K = Math.min(B.num_edge_entries, J[0]);
                for (var N = 0; N < K; N++) {
                    M(N)
                }
                if (B.num_edge_entries < J[0] && B.ellipse_text) {
                    jQuery("<span class='floblock'>" + B.ellipse_text + "</span>").appendTo(C)
                }
            }
            if (I > 3) {
                M(I);
                jQuery("<span class='floblock'>" + B.ellipse_text + "</span>").appendTo(C)
            }
            for (var N = J[0]; N < J[1]; N++) {
                M(N)
            }
            if (J[1] < O && B.num_edge_entries > 0) {
                if (O - B.num_edge_entries > J[1] && B.ellipse_text) {
                    jQuery("<span class='floblock'>" + B.ellipse_text + "</span>").appendTo(C)
                }
                var P = Math.max(O - B.num_edge_entries, J[1]);
                for (var N = P; N < O; N++) {
                    M(N)
                }
            }
            if (B.next_text && (H < O - 1 || B.next_show_always)) {
                M(H + 1, {text: B.next_text, classes: "next"})
            }
        }

        var H = B.current_page;
        A = (!A || A < 0) ? 1 : A;
        B.items_per_page = (!B.items_per_page || B.items_per_page < 0) ? 1 : B.items_per_page;
        var C = jQuery(this);
        this.selectPage = function (I) {
            D(I)
        };
        this.prevPage = function () {
            if (H > 0) {
                D(H - 1);
                return true
            } else {
                return false
            }
        };
        this.nextPage = function () {
            if (H < F() - 1) {
                D(H + 1);
                return true
            } else {
                return false
            }
        };
        E();
        B.callback(H, this)
    })
};