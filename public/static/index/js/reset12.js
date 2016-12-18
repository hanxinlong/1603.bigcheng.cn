$OOP.create({
    modifier: "PASSPORT.Forget.Rset:PASSPORT.Page.BasePage",
    proto: {
        dependence: [
        ],
        load: function () {
            this.password  = $("#password");
            this.dpasswd   = $("#dpasswd");
            this.token     = $("#token");
            
            this.resetBtn  = $("#reset");
        },
        render: function () {
        },
        compose: function () {
        },
        bind: function () {
            var _this      = this;
            
            $("html").keydown(function(e) {          // 回车事件
                if (e.which == 13) {
                    _this.resetBtn.click();
                }
            });
            _this.resetBtn.click(function() {
                var password    = _this.password.val();
                var dpasswd     = _this.dpasswd.val();
                var token       = _this.token.val();
                
                if (token.length == 0) {
                    _this.showMessage("页面已失效，请刷新后重试");
                    return false;
                }
                
                var errmsg      = _this.checkPassword(password, dpasswd);
                if (errmsg.length != 0) {
                    _this.showMessage(errmsg);
                    return false;
                }
                
                $.ajax({
                    type: "POST",
                    url: "/forget/resetPasswd",
                    data: "&token=" + token + "&password=" + password + "&setpassword=" + dpasswd,
                    dataType: "json",
                    success: function(obj) {
                        if (obj.status == 0) {
                            _this.showMessage("重设密码成功，2秒后自动跳转到登录页面");
                            setTimeout(function(){window.location.href = "/login";}, 2000); 
                        } else {
                            _this.showMessage("重置密码失败，" + obj.resp);
                        }
                    }
                });
            });
        },
        startup: function () {
        },
        checkPassword: function(password, dpasswd) {
            var errmsg          = "";
            if (password.length < 6) {
                errmsg          = '密码长度为6-20位，不能含有空格';
            } else if (dpasswd != password) {
                errmsg          = '两次密码输入不一致，请重新输入';
            }
            
            return errmsg;
        },
        showMessage: function(msg) {
            $('#err').show().html(msg);
        }
    }
});

new PASSPORT.Forget.Rset;