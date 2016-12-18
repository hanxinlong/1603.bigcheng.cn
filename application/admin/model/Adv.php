<?php 
namespace app\admin\model;
use think\Model;
use think\Db;
/**
* 首页轮播表
*/
class Adv extends Model
{
	//获取轮播信息
	public function getAdv()
	{
		return Db::name('Adv')->where('id','>=',1)->select();
	}

	//添加轮播图操作
	public function addAdv($info,$pic)
	{
		$data = [
			'adv_name'=> $info['adv_name'],
			'adv_path'=> $pic
		];
		return Db::name('Adv')->insert($data);
	}
	//
	public function updateAdv($info,$pic)
	{
		$upTime = date('Y-m-d,H:i:s');
		$adv = new Adv;
		return $adv->save([
					'adv_name'=> $info['adv_name'],
					'adv_path'=> $pic,
					'update_time'=> $upTime
			],['id'=>$info['id']]);
	}
}