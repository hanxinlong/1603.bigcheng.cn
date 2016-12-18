<?php
namespace app\admin\model;
use think\Model;
use think\Db;

class Siteinfo extends Model
{
	//更新站点信息
	public function updateInfo($logo)
	{
		$siteinfo = new Siteinfo;
		return $siteinfo->save([
			'web_name'=>$_POST['web_name'],
			'web_domain'=>$_POST['web_domain'],
			'web_keywords'=>$_POST['keywords'],
			'web_des'=>$_POST['web_des'],
			'web_host'=>$_POST['web_host'],
			'web_tel'=>$_POST['web_tel'],
			'web_QQ'=>$_POST['web_QQ'],
			'web_email'=>$_POST['web_email'],
			'web_bottom'=>$_POST['web_bottom'],
			'web_logo'=>$logo,
			'web_address'=>$_POST['web_address']
		],['id'=>1]);
		// return Step::destroy($id);
	}
	//获取站点信息
	public function getInfo()
	{

		return Db::name('siteinfo')->where('id','>=',1)->select();

	}
}