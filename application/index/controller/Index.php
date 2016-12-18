<?php
namespace app\index\controller;
use app\index\model\Category;
use app\index\model\User;
use think\Controller;
use think\Db;
use app\index\model\Adv;
use app\index\model\Link;
use app\index\model\Classify;
use app\index\model\Course;
use app\index\model\Goods;
use app\index\model\Step;
use app\index\model\Ingredient;
class Index extends Controller
{
	public function index(category $category, User $user, Link $link, Course $course, Goods $goods, Adv $adv)
	{
		// dump(session('user'));die();
		$site_type= Db::name('siteinfo')->where('id',1)->value('web_type');
		if ($site_type == 0) {
			$this->error('尊敬的吃货，本站点已关闭，为您带来的不便敬请谅解');
		} 
		$result = $category->classFind();
		$result1 = $category->doClass(); 
		$usedata = $user->userData(session('user')['use_id']);
		$data = $user->doSet();
		$showGoods = $goods->showGoods();
		
		$pic = Db::name('Adv')->where('id','>=',1)->select();
		// dump($pic);die();
		$this->assign('pic',$pic);
		// dump($showGoods);die;
		$this->assign('showGoods', $showGoods);
		if (!empty($usedata) && !empty($data)) {
			$this->assign('setInfo', $data[0]);
			
			$this->assign('coin', $usedata[0]['coin']);
		}
		$linkRes = $link->doLink();
		$courRes = $course->doCour();

		$this->assign('courData', $courRes);
		$this->assign('link', $linkRes);
		$this->assign('data', $result);
		$this->assign('data1', $result1);
		return $this->fetch();
	}

	

	public function logout()
	{
		
		session(null);
		$this->success('退出成功', 'index/index');
		
	}
}
