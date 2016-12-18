jQuery.extend({
    loadCSS: function (url, callback) {
        var iLen = null, iCur = 0;
        if (url) {
            if ($.isArray(url)) {
                iLen = url.length;
                if (iLen == 0) { callback(); return; }
                $.loadLink(url[iCur], function () {
                    iCur++;
                    if (iCur < iLen) {
                        $.loadLink(url[iCur], arguments.callee);
                    } else {
                        callback();
                    }
                });
            } else {
                $.loadLink(url, callback);
            }
        }
    },
    loadLink: function (url, callback) {
        callback = typeof callback === 'function' ? callback : function () { };
        if (!url)
            callback();
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = jQuery.getPublicURL(url);
        document.getElementsByTagName("head")[0].appendChild(link);
        callback();
    },
    loadJS: function (url, callback) {
        var iLen = null, iCur = 0;
        if (url) {
            if ($.isArray(url)) {
                iLen = url.length;
                if (iLen == 0) { callback(); return; }
                $.loadScript(url[iCur], function () {
                    iCur++;
                    if (iCur < iLen) {
                        $.loadScript(url[iCur], arguments.callee);
                    } else {
                        callback();
                    }
                });
            } else {
                $.loadScript(url, callback);
            }
        }
    },
    loadScript: (function () {
        var oLoaded = {};//避免重复加载
        return function (url, callback) {
            if (oLoaded[url]) return;
            callback = typeof callback === 'function' ? callback : function () { };
            if (!url)
                callback();
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            }
            else {
                script.onload = function () {
                    callback();
                };
            }
            script.onerror = function () {
                callback(false);
            };
            script.src = jQuery.getPublicURL(url);
            document.getElementsByTagName("head")[0].appendChild(script);
            oLoaded[url] = 1;
        };
    })(),
    getPublicURL: function (url) {
        var publicPath  = window.__PUBLICPATH;
        if (publicPath == undefined) {
            publicPath  = "";
        }
        url = url || '';
        return publicPath + url;
    },
    getAppURL: function (url) {
        var modulePath  = window.__MODULEPATH;
        if (modulePath == undefined) {
            modulePath  = "";
        }
        url = url || '';
        return modulePath + url;
    }
});
//OOP 加载模块
;(function (codename) {
    var host = this, framework;
    //core
    (function (codename, undef) {
        host['__codename'] = codename;
        framework = host[codename] = {};
    })(codename);

    //OOP 类构建
    (function (fk, undef) {
        fk.OOP = {
            //创建类
            create: function (option) {
                var fn,
                modifier = /^((static|auto) )?([\w.]+)(:([\w.]+))?/.exec(option.modifier),//子页面加了auto关键字会自动实例化
                s = modifier[2] == 'static',
                ns = modifier[3].replace(/\.\w+$/, ''),
                cn = modifier[3].match(/(^|\.)(\w+)$/i)[2];
                bc = modifier[5];
                var p = this.name(ns);
                if (p[cn]) return;
                if (s) {
                    p[cn] = option.proto;
                    return p[cn];
                }
                var proto = option.proto;
                var constructor = proto[cn] ? proto[cn] : function () { };
                if (bc) { bc = this.resolve(bc); }
                if (bc) {
                    fn = (function (base) {
                        return function () {
                            base.prototype.constructor.apply(this, arguments);
                            constructor.apply(this, arguments);
                        };
                    })(bc);
                    var fake = function () {
                    };
                    fake.prototype = bc.prototype;
                    fn.prototype = new fake();
                }
                else {
                    fn = constructor ? constructor : function () { };
                }
                var cp = fn.prototype;
                for (var i in proto) {
                    if (i == "dependence" && proto[i]) {
                        cp[i] = cp[i] || [];
                        cp[i] = cp[i].concat(proto[i]);
                    } else {
                        cp[i] = proto[i];
                    }
                };
                cp.constructor = fn;
                p[cn] = fn;
                return modifier[2] == 'auto' ? new fn : fn;
            },
            //创建命名空间
            name: function (path, context) {
                var o = context || host, n = path.split('.'),
                i = 0, l = n.length, s;
                for (; i < l; i++) {
                    s = n[i];
                    if (!o[s])
                        o[s] = {};
                    o = o[s];
                }
                return o;
            },
            //反射
            resolve: function (path, context) {
                var o = context || host, n = path.split('.'), i = 0, l = n.length;
                for (; i < l; i++) {
                    o = o[n[i]];
                    if (!o)
                        break;
                }
                return o;
            }
        };
    })(framework);
    //set shortcut
    (function (fk, undef) {
        host.$OOP = fk.OOP;
    })(framework);
})('PASSPORT');

//页面级js父类
$OOP.create({
    modifier: 'PASSPORT.Page.BasePage',
    proto: {
        BasePage: function (option) {
            this.dep_css = [];
            this.dep_js = [];
            if (this.dependence) {
                this.analyze_dep();
                $.loadCSS(this.dep_css, $.proxy(function () {
                    $.loadJS(this.dep_js, $.proxy(function () {
                        $($.proxy(this._base_page_init, this));
                    }, this, option));
                }, this));
            } else {
                this._base_page_init();
            }
        },
        analyze_dep: function () {
            var _this = this;
            $.each(this.dependence, function (i, item) {
                if (item) {
                    if (item.indexOf('.css') > -1) {
                        _this.dep_css.push(item);
                    } else {
                        _this.dep_js.push(item);
                    }
                }
            });
        },
        _base_page_init: function (option) {            // 此方法子类谨慎覆盖
            this.load(option);
            this.render();
            this.compose();
            this.bind();
            this.startup();
        },
        load: function (option) {
        },
        render: function () {
        },
        compose: function () {
        },
        bind: function () {
        },
        startup: function () {
        }
    }
});