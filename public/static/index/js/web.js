




// $OOP.create({

//     modifier: "PASSPORT.Login.Web:PASSPORT.Page.BasePage",
//     proto: {
//         dependence: [
//         ],
//         load: function () {
//             this.username = $("#username");
//             console.log('this.username');
//             this.password = $("#password");
//             this.code     = $("#code");
//             this.ajaxurl  = $("#ajaxurl");
            
//             this.loginBtn = $("#login");
//             this.captcha  = $("#captcha");
//         },
//         render: function () {
//         },
//         compose: function () {
//         },
//         bind: function () {
//             var _this     = this;
//             $("html").keydown(function(e) {          // 回车事件
//                 if (e.which == 13) {
//                     _this.loginBtn.click();
//                 }
//             });
            
//             _this.username.blur(function(){
//                 var errmsg       = _this.checkUsername($(this).val());
//                 _this.showError(errmsg);
//             });
            
//             _this.password.blur(function(){
//                 var errmsg       = _this.checkPassword($(this).val());
//                 _this.showError(errmsg);
//             });
            
//             _this.password.focus(function(){        // 判断是否需要输入验证码
//                 $.post("/login/signinCapt",{username:_this.username.val()},function(res) {
//                     if (res.status == 1) {
//                         _this.captcha.css("display", "block");          // 需要输入验证码
//                     }
//                 },'json');
//             });
            
//             $("#chgcapt").click(function(){         // 验证码刷新
//                 _this.flushCaptcha();
//             });
            
//             _this.loginBtn.click(function(){
//                 _this.loginSubmit();
//             });
//         },
//         startup: function () {
//         },
//         loginSubmit: function() {
//             var _this    = this;
            
//             var username = _this.username.val();
//             var password = _this.password.val();
//             var code     = _this.code.val();
//             var ajaxurl  = _this.ajaxurl.val();
            
//             if (_this.captcha.css("display") == "block") {      // 只有在验证码开放的情况下才进行校验位数
//                 if (code.length != 4) {
//                     _this.showError("验证码为4位");
//                     return false;
//                 }
//             }
            
//             _this.loginBtn.html("正在登录...");
//             $.ajax({
//                 type: "post",
//                 url: "/login/signin",
//                 data: "&username=" + username + "&password=" + hex_md5(password) + "&code=" + code + "&agent_type=web&ref=" + ajaxurl,
//                 dataType: "json",
//                 success: function(D) {
//                     if (D.status == 0) {
//                         _this.loginBtn.html("登录成功");
//                         var jump  = D.resp;
//                         if (jump != "") {
//                             window.location.href = jump;
//                         } else {
//                             window.location.href = "http://www.douguo.com";
//                         }
//                     } else {
//                         _this.loginBtn.html("登录");
//                         _this.password.focus();
//                         _this.showError(D.resp);
//                         if (_this.captcha.css("display") == "block") {
//                             _this.flushCaptcha();
//                         }
//                         return false;
//                     }
//                 }
//             });
//             return false;
//         },
//         checkUsername: function(username) {
//             var errmsg      = "";
//             if (username.length == 0) {
//                 errmsg      = "邮箱或手机不能为空";
//             } else if (!isEmailOrPhone(username)) {
//                 errmsg      = "邮箱或手机号码错误";
//             }
            
//             return errmsg;
//         },
//         checkPassword: function(password) {
//             var errmsg      = "";
//             if (password.length < 6) {
//                 errmsg      = '密码不能小于6位';
//             }
            
//             return errmsg;
//         },
//         flushCaptcha: function() {
//             $("#codeimg").attr("src","/captcha?type=login&t="+(new Date()).getTime());         // 重新刷新验证码
//         },
//         showError: function(msg) {
//             $('#err').css('visibility','visible').html(msg);
//         },
//         clearError: function() {
//             $('#err').css('visibility','hidden').html("");
//         }
//     }
// });

// new PASSPORT.Login.Web;