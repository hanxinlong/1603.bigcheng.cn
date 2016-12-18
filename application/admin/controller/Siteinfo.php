<?php
namespace app\admin\controller;

use app\admin\model\Siteinfo as Site;
use think\Controller;
/*
 *站点信息控制器
 */
class Siteinfo extends Controller
{	
	//获取上传LOGO信息,更新站点信息
	public function upload(Site $siteinfo){
		// 获取表单上传文件
		$file = request()->file('logo');
		// 移动到框架应用根目录/public/uploads/ 目录下
		$info = $file->move('./upload');
		if($info){
			// 成功上传后 获取上传信息
			$logo = '__WEBSITE__/'.str_replace('\\', '/', $info->getSaveName());
			$result = $siteinfo->updateInfo($logo);
			if ($result) {
				$this->success('站点信息更新成功');
			} else {
				$this->error('站点信息更新失败');
			}
		}else{
		// 上传失败获取错误信息
		echo $file->getError();
		}

	}

	// 查询站点信息 
	public function Info(Site $siteInfo)
	{
		$info = $siteInfo->getInfo();
		$siteInfo = $info['0'];
		$this->assign('siteInfo',$siteInfo);
		return $this->fetch();
	}

	//关闭站点
	public function siteOff(Site $siteInfo)
	{
		$result = $siteInfo->save(['web_type'=> 0],['id'=>1]);
		if ($result) {
			$this->success('站点已关闭，网站将不能浏览');
		} else {
			$this->error('站点关闭失败');
		}
		
	}

	//开启站点
	public function siteOn(Site $siteInfo)
	{
		$result = $siteInfo->save(['web_type'=> 1],['id'=>1]);
		if ($result) {
			$this->success('站点已开启，网站已可正常浏览');
		} else {
			$this->error('站点开启失败');
		}
	}
}
