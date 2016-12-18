<?php
namespace app\index\controller;

use think\Controller;
class Password extends Controller
{
	
	public function con()
	{
		$subject="豆果美食";
		
		$email=input('post.email');
		$key = md5(time());
		// dump($key);die();
		$path = "http://1603.bigcheng.com/index/Forget/reforget";

		$con = '<style class="fox_global_style"> div.fox_html_content { line-height: 1.5;} /* 一些默认样式 */ blockquote { margin-Top: 0px; margin-Bottom: 0px; margin-Left: 0.5em } ol, ul { margin-Top: 0px; margin-Bottom: 0px; list-style-position: inside; } p { margin-Top: 0px; margin-Bottom: 0px } </style><table style="-webkit-font-smoothing: antialiased;font-family:"微软雅黑", "Helvetica Neue", sans-serif, SimHei;padding:35px 50px;margin: 25px auto; background:rgb(247,246, 242); border-radius:5px" border="0" cellspacing="0" cellpadding="0" width="640" align="center"> <tbody> <tr> <td style="color:#000;"> </td> </tr> <tr><td style="padding:0 20px"><hr style="border:none;border-top:1px solid #ccc;"></td></tr> <tr> <td style="padding: 20px 20px 20px 20px;"> Hi 你好 </td> </tr> <tr> <td valign="middle" style="line-height:24px;padding: 15px 20px;"> 感谢您注册phpbryant <br> 请点击以下链接修改您的密码： </td> </tr> <tr> <td style="height: 50px;color: white;" valign="middle"> <div style="padding:10px 20px;border-radius:5px;background: rgb(64, 69, 77);margin-left:20px;margin-right:20px"> <a style="word-break:break-all;line-height:23px;color:white;font-size:15px;text-decoration:none;" href="http://1603.bigcheng.com/index/Forget/reforget">http://1603.bigcheng.com/index/Forget/reforget</a> </div> </td> </tr> <tr> <td style="padding: 20px 20px 20px 20px"> 请勿回复此邮件，如果有疑问，请联系我们：<a style="color:#5083c0;text-decoration:none" href="mailto:liuhao@phpbryant.com">liuhao@phpbryant.com
	</a> </td> </tr><tr> <td style="padding: 20px 20px 20px 20px"> 交流群：000000 </td> </tr> <tr> <td style="padding: 20px 20px 20px 20px"> - phpbryant 团队-帮助你更快的完成项目- phpbryant.com </td> </tr> </tbody> </table>';
	$status = send($email,$subject,$con);
	if($status){
		echo 'success';
	}else{
		echo 'error';
	}

}
}