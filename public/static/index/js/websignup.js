$OOP.create({
    modifier: "PASSPORT.Signup.Web:PASSPORT.Signup.Base",
    proto: {
        dependence: [
        ],
        load: function () {
            this.username       = $("#username");
            this.nickname       = $("#nickname");
            this.password       = $("#password");
            this.dpasswd        = $("#dpasswd");
            this.code           = $("#code");
            this.imgcode        = $("#img_captc_code");
            
            this.sendVercode    = $("#send_vercode");
            this.signupBtn      = $("#signup");
            this.iCount         = 60;
            
            this.signupType     = _SIGNUPTYPE;
            this.agentType      = "web";
        },
        bind: function () {
            var _this           = this;
            
            $("html").keydown(function(e){          // 回车事件
                if (e.which == 13) {
                    _this.signupBtn.click();
                }
            });
            
            _this.username.blur(function(){
                var username    = $(this).val();
                var errmsg      = _this.checkUsername(username);
                if (errmsg == "") {
                    _this.code.removeAttr("disabled");
                    _this.sendVercode.removeAttr("disabled");
                } else {
                    _this.code.attr("disabled", true);
                    _this.sendVercode.attr("disabled", true);
                }
                
                _this.showError("username", errmsg);
            });
            
            _this.nickname.blur(function(){
                var nickname    = $(this).val();
                var errmsg      = _this.checkNickname(nickname);
                
                _this.showError("nickname", errmsg);
            });
            
            _this.password.blur(function(){
                var password    = $(this).val();
                var errmsg      = _this.checkPassword(password);
                
                _this.showError("password", errmsg);
            });
            
            _this.code.blur(function(){
                var errmsg      = _this.checkCode($(this).val());
                _this.showError("public", errmsg);
            });
            
            _this.dpasswd.blur(function(){
                var errmsg         = _this.checkDpasswd($(this).val());
                _this.showError("dpasswd", errmsg);
            });
            
            _this.sendVercode.click(function(){
               _this.sendVerifyCode();
            });
            
            _this.signupBtn.click(function() {
                _this.submitSignup();
            });
            
            $("#img_captc").click(function() {
                _this.flushCaptcha();
            });
            
            $("#verify_imgcaptc").click(function() {
                if (_this.imgcode.val() == "") {
                    alert("请输入图片验证码");
                    return;
                }
                _this.sendVerifyCode();
            });
        },
        startup: function () {
        },
        checkUsername: function(username) {
            var errmsg      = "";
            if (username.length == 0) {
                errmsg      = "请输入" + (this.signupType == "mobile" ? "手机号" : "邮箱");
                return errmsg;
            }
            if (this.signupType == "mobile") {
                if (!isPhone(username)) {
                    errmsg      = "手机号码格式错误";
                } else if (true === this.conditionExist(this.signupType, username)) {
                    errmsg      = "手机号已经被使用";
                }
            } else {
                if (!isEmail(username)) {
                    errmsg      = "邮箱格式错误";
                } else if (true === this.conditionExist(this.signupType, username)) {
                    errmsg      = "邮箱已经被使用";
                }
            }
            
            return errmsg;
        },
        submitSignup: function() {
            var _this       = this;
            if ($("#err_username p").html() != "" || $("#err_nickname p").html() != "" || $("#err_password p").html() != "" || $("#err_dpasswd p").html() != "") {
                _this.showError("public", "注册信息有误，请检查后重新提交");
                return false;
            }
            _this.clearError("public");
            
            var username = _this.username.val();
            var nickname = _this.nickname.val();
            var password = _this.password.val();
            var code     = _this.code.val();
            
            _this.signupBtn.html("正在注册...");
            $.ajax({
                type: "post",
                url: "/signup/regist",
                data: "&username=" + username + "&passwd=" + password + "&nickname=" + nickname + "&code=" + code + "&agent_type=" + _this.agentType + "&signup_type=" + _this.signupType,
                dataType: "json",
                async: false,
                success: function(R) {
                    if (R.status == 0) {
                        _this.signupBtn.html("注册成功");
                        var url = R.resp;
                        window.location.href = url;
                    } else {
                        _this.signupBtn.html("注册");
                        _this.showError("public", R.resp);
                    }
                }
            });
        },
        showError: function(place, msg) {
            if (msg != "") {
                if (place != "public") {
                    $("#err_" + place + " p").removeClass("ver_success").html(msg);
                } else {
                    $("#err_" + place).html(msg);
                }
            } else {
                $("#err_" + place + " p").addClass("ver_success").html("");
            }
        },
        clearError: function(place) {
            $("#err_" + place + " p").addClass("ver_success").html("");
        }
    }
});
new PASSPORT.Signup.Web;