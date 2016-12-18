<?php
namespace app\index\controller;
use app\index\model\Category;
use app\index\model\User;
use think\Controller;
use think\Db;
use think\Request;
use app\index\model\Classify;
class Setinfo extends Controller
{
	public function setData(User $user)
	{
		$request = Request::instance();
		$res = $request->param();
		// dump($res);die();
		if (empty($res['email']) || empty($res['nickname'])) {
			$this->error('请检查邮箱和昵称是否添加');
		}
		$data['email'] = $res['email'];
		$data['nickname'] = $res['nickname'];
		$data['sex'] = $res['sex'];
		$data['year'] = $res['year'];
		$data['month'] = $res['month'];
		$data['day'] = $res['day'];
		$data['address'] = $res['province'];
		$data['taste'] = $res['taste'];
		$data['personal'] = $res['description'];

		$result = $user->setIn($data);
		// dump($result);die();
		if ($result) {
			Db::name('user')
				->where('id', session('user')['use_id'])
				->setInc('coin', 5);
			$this->success('保存成功');
		} else {
			$this->error('保存失败');
		}
	} 
	public function upImage(User $user)
	{
		$file = request()->file('fileToUpload');
		$info = $file->move('./upload');
		
		if ($info) {
			$filePath = $info->getSaveName();
			$path = str_replace('\\', '/',  '__WEBSITE__'.$filePath);
			$icons['path'] = $path;
		} else {
			$this->error('请上传头像');
		}
		$iconsRes = $user->upTou($icons);
		if ($iconsRes) {
			Db::name('user')
				->where('id', session('user')['use_id'])
				->setInc('coin', 10);
			$this->success('头像上传成功');
		} else {
			$this->error('头像上传失败');
		}
	}
}