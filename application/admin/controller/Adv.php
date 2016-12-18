<?php
namespace app\admin\controller;

use app\admin\model\Adv as A;
use think\Controller;

/**
* 轮播图控制器
*/
class Adv extends Controller
{
	//获取轮播图信息
	public function adv(A $adv)
	{
		$advInfo = $adv->getAdv();
		$this->assign('advInfo',$advInfo);
		return $this->fetch();
	}

	//添加轮播图操作
	public function addAdv(A $adv)
	{
		$info = $_POST;
		//获取轮播图信息
		$file = request()->file('image');
		// 移动到框架应用根目录/public/uploads/ 目录下
		$picInfo = $file->move('./upload');
		if($picInfo){
		// 成功上传后 获取上传信息
		$pic ='__WEBSITE__/'.str_replace('\\', '/', $picInfo->getSaveName());
		}else{
		// 上传失败获取错误信息
		echo $file->getError();
		}
		$result = $adv->addAdv($info,$pic);
		if ($result) {
			$this->success('添加轮播图成功！');
		} else {
			$this->error('添加轮播图失败！');
		}
	}

	//更新轮播图信息
	public function upInfo(A $adv)
	{
		$info = $_POST;
		$file = request()->file('image');
		// 移动到框架应用根目录/public/uploads/ 目录下
		$picInfo = $file->move('./upload');
		if($picInfo){
		// 成功上传后 获取上传信息
		$pic ='__WEBSITE__/'.str_replace('\\', '/', $picInfo->getSaveName());
		}else{
		// 上传失败获取错误信息
		echo $file->getError();
		}
		$result = $adv->updateAdv($info,$pic);
		if ($result) {
			$this->success('修改信息成功！');
		} else {
			$this->error('修改信息失败！');
		}
	}


}