function hex_md5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}
function b64_md5(a) {
    return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}
function str_md5(a) {
    return binl2str(core_md5(str2binl(a), a.length * chrsz))
}
function hex_hmac_md5(a, b) {
    return binl2hex(core_hmac_md5(a, b))
}
function b64_hmac_md5(a, b) {
    return binl2b64(core_hmac_md5(a, b))
}
function str_hmac_md5(a, b) {
    return binl2str(core_hmac_md5(a, b))
}
function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}
function core_md5(a, b) {
    a[b >> 5] |= 128 << b % 32, a[(b + 64 >>> 9 << 4) + 14] = b;
    for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
        var h = c, i = d, j = e, k = f;
        c = md5_ff(c, d, e, f, a[g + 0], 7, -680876936), f = md5_ff(f, c, d, e, a[g + 1], 12, -389564586), e = md5_ff(e, f, c, d, a[g + 2], 17, 606105819), d = md5_ff(d, e, f, c, a[g + 3], 22, -1044525330), c = md5_ff(c, d, e, f, a[g + 4], 7, -176418897), f = md5_ff(f, c, d, e, a[g + 5], 12, 1200080426), e = md5_ff(e, f, c, d, a[g + 6], 17, -1473231341), d = md5_ff(d, e, f, c, a[g + 7], 22, -45705983), c = md5_ff(c, d, e, f, a[g + 8], 7, 1770035416), f = md5_ff(f, c, d, e, a[g + 9], 12, -1958414417), e = md5_ff(e, f, c, d, a[g + 10], 17, -42063), d = md5_ff(d, e, f, c, a[g + 11], 22, -1990404162), c = md5_ff(c, d, e, f, a[g + 12], 7, 1804603682), f = md5_ff(f, c, d, e, a[g + 13], 12, -40341101), e = md5_ff(e, f, c, d, a[g + 14], 17, -1502002290), d = md5_ff(d, e, f, c, a[g + 15], 22, 1236535329), c = md5_gg(c, d, e, f, a[g + 1], 5, -165796510), f = md5_gg(f, c, d, e, a[g + 6], 9, -1069501632), e = md5_gg(e, f, c, d, a[g + 11], 14, 643717713), d = md5_gg(d, e, f, c, a[g + 0], 20, -373897302), c = md5_gg(c, d, e, f, a[g + 5], 5, -701558691), f = md5_gg(f, c, d, e, a[g + 10], 9, 38016083), e = md5_gg(e, f, c, d, a[g + 15], 14, -660478335), d = md5_gg(d, e, f, c, a[g + 4], 20, -405537848), c = md5_gg(c, d, e, f, a[g + 9], 5, 568446438), f = md5_gg(f, c, d, e, a[g + 14], 9, -1019803690), e = md5_gg(e, f, c, d, a[g + 3], 14, -187363961), d = md5_gg(d, e, f, c, a[g + 8], 20, 1163531501), c = md5_gg(c, d, e, f, a[g + 13], 5, -1444681467), f = md5_gg(f, c, d, e, a[g + 2], 9, -51403784), e = md5_gg(e, f, c, d, a[g + 7], 14, 1735328473), d = md5_gg(d, e, f, c, a[g + 12], 20, -1926607734), c = md5_hh(c, d, e, f, a[g + 5], 4, -378558), f = md5_hh(f, c, d, e, a[g + 8], 11, -2022574463), e = md5_hh(e, f, c, d, a[g + 11], 16, 1839030562), d = md5_hh(d, e, f, c, a[g + 14], 23, -35309556), c = md5_hh(c, d, e, f, a[g + 1], 4, -1530992060), f = md5_hh(f, c, d, e, a[g + 4], 11, 1272893353), e = md5_hh(e, f, c, d, a[g + 7], 16, -155497632), d = md5_hh(d, e, f, c, a[g + 10], 23, -1094730640), c = md5_hh(c, d, e, f, a[g + 13], 4, 681279174), f = md5_hh(f, c, d, e, a[g + 0], 11, -358537222), e = md5_hh(e, f, c, d, a[g + 3], 16, -722521979), d = md5_hh(d, e, f, c, a[g + 6], 23, 76029189), c = md5_hh(c, d, e, f, a[g + 9], 4, -640364487), f = md5_hh(f, c, d, e, a[g + 12], 11, -421815835), e = md5_hh(e, f, c, d, a[g + 15], 16, 530742520), d = md5_hh(d, e, f, c, a[g + 2], 23, -995338651), c = md5_ii(c, d, e, f, a[g + 0], 6, -198630844), f = md5_ii(f, c, d, e, a[g + 7], 10, 1126891415), e = md5_ii(e, f, c, d, a[g + 14], 15, -1416354905), d = md5_ii(d, e, f, c, a[g + 5], 21, -57434055), c = md5_ii(c, d, e, f, a[g + 12], 6, 1700485571), f = md5_ii(f, c, d, e, a[g + 3], 10, -1894986606), e = md5_ii(e, f, c, d, a[g + 10], 15, -1051523), d = md5_ii(d, e, f, c, a[g + 1], 21, -2054922799), c = md5_ii(c, d, e, f, a[g + 8], 6, 1873313359), f = md5_ii(f, c, d, e, a[g + 15], 10, -30611744), e = md5_ii(e, f, c, d, a[g + 6], 15, -1560198380), d = md5_ii(d, e, f, c, a[g + 13], 21, 1309151649), c = md5_ii(c, d, e, f, a[g + 4], 6, -145523070), f = md5_ii(f, c, d, e, a[g + 11], 10, -1120210379), e = md5_ii(e, f, c, d, a[g + 2], 15, 718787259), d = md5_ii(d, e, f, c, a[g + 9], 21, -343485551), c = safe_add(c, h), d = safe_add(d, i), e = safe_add(e, j), f = safe_add(f, k)
    }
    return Array(c, d, e, f)
}
function md5_cmn(a, b, c, d, e, f) {
    return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
}
function md5_ff(a, b, c, d, e, f, g) {
    return md5_cmn(b & c | ~b & d, a, b, e, f, g)
}
function md5_gg(a, b, c, d, e, f, g) {
    return md5_cmn(b & d | c & ~d, a, b, e, f, g)
}
function md5_hh(a, b, c, d, e, f, g) {
    return md5_cmn(b ^ c ^ d, a, b, e, f, g)
}
function md5_ii(a, b, c, d, e, f, g) {
    return md5_cmn(c ^ (b | ~d), a, b, e, f, g)
}
function core_hmac_md5(a, b) {
    var c = str2binl(a);
    c.length > 16 && (c = core_md5(c, a.length * chrsz));
    for (var d = Array(16), e = Array(16), f = 0; 16 > f; f++)d[f] = 909522486 ^ c[f], e[f] = 1549556828 ^ c[f];
    var g = core_md5(d.concat(str2binl(b)), 512 + b.length * chrsz);
    return core_md5(e.concat(g), 640)
}
function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
}
function bit_rol(a, b) {
    return a << b | a >>> 32 - b
}
function str2binl(a) {
    for (var b = Array(), c = (1 << chrsz) - 1, d = 0; d < a.length * chrsz; d += chrsz)b[d >> 5] |= (a.charCodeAt(d / chrsz) & c) << d % 32;
    return b
}
function binl2str(a) {
    for (var b = "", c = (1 << chrsz) - 1, d = 0; d < 32 * a.length; d += chrsz)b += String.fromCharCode(a[d >> 5] >>> d % 32 & c);
    return b
}
function binl2hex(a) {
    for (var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++)c += b.charAt(a[d >> 2] >> d % 4 * 8 + 4 & 15) + b.charAt(a[d >> 2] >> d % 4 * 8 & 15);
    return c
}
function binl2b64(a) {
    for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "", d = 0; d < 4 * a.length; d += 3)for (var e = (a[d >> 2] >> 8 * (d % 4) & 255) << 16 | (a[d + 1 >> 2] >> 8 * ((d + 1) % 4) & 255) << 8 | a[d + 2 >> 2] >> 8 * ((d + 2) % 4) & 255, f = 0; 4 > f; f++)c += 8 * d + 6 * f > 32 * a.length ? b64pad : b.charAt(e >> 6 * (3 - f) & 63);
    return c
}
var hexcase = 0, b64pad = "", chrsz = 8;
jQuery.extend({
    loadCSS: function (a, b) {
        var c = null, d = 0;
        if (a)if ($.isArray(a)) {
            if (c = a.length, 0 == c)return void b();
            $.loadLink(a[d], function () {
                d++, c > d ? $.loadLink(a[d], arguments.callee) : b()
            })
        } else $.loadLink(a, b)
    }, loadLink: function (a, b) {
        b = "function" == typeof b ? b : function () {
        }, a || b();
        var c = document.createElement("link");
        c.type = "text/css", c.rel = "stylesheet", c.href = jQuery.getPublicURL(a), document.getElementsByTagName("head")[0].appendChild(c), b()
    }, loadJS: function (a, b) {
        var c = null, d = 0;
        if (a)if ($.isArray(a)) {
            if (c = a.length, 0 == c)return void b();
            $.loadScript(a[d], function () {
                d++, c > d ? $.loadScript(a[d], arguments.callee) : b()
            })
        } else $.loadScript(a, b)
    }, loadScript: function () {
        var a = {};
        return function (b, c) {
            if (!a[b]) {
                c = "function" == typeof c ? c : function () {
                }, b || c();
                var d = document.createElement("script");
                d.type = "text/javascript", d.readyState ? d.onreadystatechange = function () {
                    ("loaded" == d.readyState || "complete" == d.readyState) && (d.onreadystatechange = null, c())
                } : d.onload = function () {
                    c()
                }, d.onerror = function () {
                    c(!1)
                }, d.src = jQuery.getPublicURL(b), document.getElementsByTagName("head")[0].appendChild(d), a[b] = 1
            }
        }
    }(), getPublicURL: function (a) {
        var b = window.__PUBLICPATH;
        return void 0 == b && (b = ""), a = a || "", b + a
    }, getAppURL: function (a) {
        var b = window.__MODULEPATH;
        return void 0 == b && (b = ""), a = a || "", b + a
    }
}), function (a) {
    var b, c = this;
    !function (a) {
        c.__codename = a, b = c[a] = {}
    }(a), function (a) {
        a.OOP = {
            create: function (a) {
                var b, c = /^((static|auto) )?([\w.]+)(:([\w.]+))?/.exec(a.modifier), d = "static" == c[2], e = c[3].replace(/\.\w+$/, ""), f = c[3].match(/(^|\.)(\w+)$/i)[2];
                bc = c[5];
                var g = this.name(e);
                if (!g[f]) {
                    if (d)return g[f] = a.proto, g[f];
                    var h = a.proto, i = h[f] ? h[f] : function () {
                    };
                    if (bc && (bc = this.resolve(bc)), bc) {
                        b = function (a) {
                            return function () {
                                a.prototype.constructor.apply(this, arguments), i.apply(this, arguments)
                            }
                        }(bc);
                        var j = function () {
                        };
                        j.prototype = bc.prototype, b.prototype = new j
                    } else b = i ? i : function () {
                    };
                    var k = b.prototype;
                    for (var l in h)"dependence" == l && h[l] ? (k[l] = k[l] || [], k[l] = k[l].concat(h[l])) : k[l] = h[l];
                    return k.constructor = b, g[f] = b, "auto" == c[2] ? new b : b
                }
            }, name: function (a, b) {
                for (var d, e = b || c, f = a.split("."), g = 0, h = f.length; h > g; g++)d = f[g], e[d] || (e[d] = {}), e = e[d];
                return e
            }, resolve: function (a, b) {
                for (var d = b || c, e = a.split("."), f = 0, g = e.length; g > f && (d = d[e[f]], d); f++);
                return d
            }
        }
    }(b), function (a) {
        c.$OOP = a.OOP
    }(b)
}("PASSPORT"), $OOP.create({
    modifier: "PASSPORT.Page.BasePage", proto: {
        BasePage: function (a) {
            this.dep_css = [], this.dep_js = [], this.dependence ? (this.analyze_dep(), $.loadCSS(this.dep_css, $.proxy(function () {
                $.loadJS(this.dep_js, $.proxy(function () {
                    $($.proxy(this._base_page_init, this))
                }, this, a))
            }, this))) : this._base_page_init()
        }, analyze_dep: function () {
            var a = this;
            $.each(this.dependence, function (b, c) {
                c && (c.indexOf(".css") > -1 ? a.dep_css.push(c) : a.dep_js.push(c))
            })
        }, _base_page_init: function (a) {
            this.load(a), this.render(), this.compose(), this.bind(), this.startup()
        }, load: function () {
        }, render: function () {
        }, compose: function () {
        }, bind: function () {
        }, startup: function () {
        }
    }
}), $OOP.create({
    modifier: "PASSPORT.Client:PASSPORT.Page.BasePage", proto: {
        dependence: [], load: function () {
            this._passport = "https://passport.douguo.com/", this._oauthback = encodeURIComponent(window.location.href), this._callback = "" == window.__CALLBACK || void 0 == window.__CALLBACK ? window.location.href : window.__CALLBACK, this._login = $("#login.dg-passport")
        }, bind: function () {
            var a = this;
            a._login.click(function () {
                var b = $(window).height() / 2 - 150, c = $(window).width() / 2 - 290, d = $(document).height(), e = a._genLoginBox(b, c, "login_box");
                $("body").append(e), $(".blobg").css({height: d})
            }), $(document).on("click", "#passportLogin.dg-passport", function () {
                var b = $("#username").val(), c = $("#password").val();
                return 0 == b.length || 0 == c.length ? ($("#passportErr.dg-passport").css("visibility", "visible").html("登录名或密码为空"), !1) : ($("#passportLogin.dg-passport").html("登录中..."), void $.ajax({
                    type: "post",
                    url: a._passport + "layout/login",
                    data: "&username=" + b + "&password=" + hex_md5(c) + "&code=code&agent_type=web",
                    dataType: "jsonp",
                    jsonpCallback: "showmsg",
                    success: function (b) {
                        return 0 != b.errno ? ($("#passportLogin.dg-passport").html("登录"), $("#passportErr.dg-passport").css("visibility", "visible").html(b.errmsg), !1) : ($("#passportErr.dg-passport").css("visibility", "hidden"), $("#passportLogin.dg-passport").html("登录成功"), a._closeBox("login_box"), window.location.href = a._callback, void 0)
                    }
                }))
            }), $(document).on("click", ".dlclose", function () {
                var b = "login_box";
                a._closeBox(b)
            })
        }, startup: function () {
        }, _genLoginBox: function (a, b) {
            var c = '<div id="login_box" class="dlceng r5 dg-passport" style="z-index: 9999; top: ' + a + "px; left: " + b + 'px;position: fixed;display: block;">';
            return c += '<div class="dlccontent" id="deng">', c += '<a href="javascript:void(0);" class="scengb dlclose trackClick" module="2"></a>', c += '<div class="tith">', c += "<h3>登录豆果</h3>", c += "</div>", c += '<div class="dlrig linee63">', c += '<p class="dlzcchan">还没有豆果账号？<a href="' + this._passport + 'signup" id="ljzc">立即注册</a></p>', c += '<div class="clearfix">', c += '<div class="iput"><input id="username" name="username" value="" placeholder="手机号/邮箱" class="centext2 r5" type="text"></div>', c += "</div>", c += '<div class=" mt15 clearfix">', c += '<div class="iput"><input id="password" name="password" value="" placeholder="密码" class="centext2 r5" maxlength="20" type="password" onkeydown="if(event.keyCode==32){return false;}">', c += '<span class="mt8 dblok"><a href="' + this._passport + 'forget" title="忘记密码">忘记密码</a></span></div>', c += "</div>", c += '<div class="btloo">', c += '<button id="passportLogin" class="dg-passport btncengdl trackClick" module="1">登录</button>&nbsp;&nbsp;<span id="passportErr" class="dg-passport error"></span>', c += "</div>", c += "</div>", c += '<div class="dlrim">', c += "<h3>用以下账号直接登录</h3>", c += '<p class="pl35 mt25">', c += '<a class="btnrqq mbm mr17 left" href="' + this._genOauthBox("tx") + '" title="QQ账号登录">QQ账号登录</a>', c += '<a class="btnrsina mbm mr17 left" href="' + this._genOauthBox("sina") + '" title="新浪微博登录">新浪微博登录</a>', c += "</p>", c += "</div>", c += "</div>", c += "</div>", c += '<div class="blobg"></div>'
        }, _genOauthBox: function (a) {
            return this._passport + "oauth?type=" + a + "&ref=" + this._oauthback
        }, _closeBox: function (a) {
            $("#" + a).remove(), $(".blobg").remove()
        }
    }
}), new PASSPORT.Client;