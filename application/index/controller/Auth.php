<?php
/**
 * 这是一个认证控制器
 */
namespace app\index\controller;
use think\Db;
use think\Controller;
use think\Request;
use app\index\model\User;
use app\index\model\Category;
use app\index\model\Collect;
use app\index\model\Course;
use app\index\model\Siteinfo;
use app\index\model\Goods;
use think\Session;
class Auth extends Controller
{
	public function __construct(Request $request, User $user, Category $category, Collect $collect, Course $course, Goods $goods)
	{
		$site_type= Db::name('siteinfo')->where('id',1)->value('web_type');
		if ($site_type == 0) {
			$this->error('尊敬的吃货，本站点已关闭，为您带来的不便敬请谅解');
		} 
		parent::__construct();
		//个人中心认证
		$userData = $user->doUser();
		if (!empty($userData)) {
			$this->assign('userData', $userData);
		}
		


		$page = $userData->render();
		$this->assign('page', $page);
		$time = $user->doTime();
		$times = count($time);

		$this->assign('times', $times);
		$data = $user->doSet();
	
		
		
		//收藏显示
		$collData = $collect->doColl();
		
	

		$collectId = [];
		if (!empty($collData)) {
			foreach ($collData as $key =>$vas) {
				array_push($collectId, $vas['course_id']);
			}

			$collectCourse = $course->doCourse($collectId);


			$collectTimes = count($collData);
			$this->assign('collectTimes', $collectTimes);
			$this->assign('collectCourse', $collectCourse);
		}
		$collectTimes = count($collData);
		$this->assign('collectTimes', $collectTimes);

		//首页标题认证
		$result = $category->classFind();
		$result1 = $category->doClass();
		$usedata = $user->userData(session('user')['use_id']);

	    if (!empty($usedata) && !empty($data)) {
		$this->assign('setInfo', $data[0]);
		$this->assign('coin', $usedata[0]['coin']);
	    }

		$this->assign('data', $result);
		$this->assign('data1', $result1);

		
	}

	public function checkPhone(user $user)
	{
		$request = Request::instance();
		$data = $request->param();
		$phone = $data['username'];
		$pho = $user->doPhone($phone);
		if($pho){
			echo json_encode(['status' => 1, 'msg' => '验证码正确']);die();
		} else {
			echo json_encode(['status' => 0, 'msg' => '验证码错误']);die();
		}
	}
	public function login(User $user)
	{

		$this->view->engine->layout(false);
		 $usedata = $user->userData(session('user')['use_id']);
	    if (!empty($usedata)) {

	    $this->assign('coin', $usedata[0]['coin']);
	    }

		return $this->fetch();
	}

	public function doLogin(user $user)
	{

		
		$request = Request::instance();
		$data = $request->param();
		$phone = $user->doData($data['username']);

		$phone_num = $phone[0]['phone_number'];
		$password = $phone[0]['password'];
		$user_type = $phone[0]['user_type'];
		$phone1 = $phone[0]['id'];

		if (!strcmp($phone_num, $data['username'])) {
			if (!strcmp($password, md5($data['password']))) {
				Db::name('user')
				->where('id', $phone1)
				->setInc('coin', 1);
				session('user', [
						'phone_number' => $phone_num,
						'user_type' => $user_type,
						'use_id' 	 => $phone1
					]);
				// dump($_SESSION);
				echo json_encode(['status' => 1, 'msg' => '登录成功']);
			} else {
				echo json_encode(['status' => 0, 'msg' => '密码不正确']);die();
			}
		} else {
			echo json_encode(['status' => 0, 'msg' => '手机号码不正确']);die();
		}
	}


	
		
	public function checkLogin()
	{
		return session('user');
	}
	public function doCode()
	{
		$request = Request::instance();
		$data = $request->param();
		$code = $data['code'];
		if(captcha_check($code)){
			echo json_encode(['status' => 1, 'msg' => '验证码正确']);die();
		} else {
			echo json_encode(['status' => 0, 'msg' => '验证码错误']);die();
		}
	}
	public function register()
	{
		$this->view->engine->layout(false);
		return $this->fetch();
	}
	public function doFind(user $user)
	{
		$request = Request::instance();
		$data = $request->param();
		// dump($data);
		$phone_num = $data['username'];
		$query = $user->doNumber($phone_num);
		if ($query) {
				echo json_encode(['status' => 0, 'msg' => '手机号码已注册']);die();
		} else {
				echo json_encode(['status' => 1, 'msg' => '手机号码没注册']);die();
		}
	}
	public function doRegister(user $user)
	{
		// dump($_REQUEST);
		$request = Request::instance();
		$data = $request->param();
		$phone_num = $data['username'];
		if (empty($phone_num)) {
			exit('手机号码不能为空');
		}
		if (!strlen($phone_num) == 11) {
			exit('请检查手机号码长度');
		}
		$query1 = $user->doNumber($phone_num);
		if ($query1) {
			exit('手机号码已存在');
		}
		$result['phone_number'] = $phone_num;
		$nickname = $data['nickname'];
		if (empty($nickname)) {
			exit('昵称不能为空');
		}
		$result['nickname'] = $nickname;
		$password = $data['password'];
		$repassword = $data['repassword'];
		if (empty($password)) {
			exit('密码不能为空');
		}
		if (strlen($password) < 6) {
			exit('密码不能小于6位');
		}
		if (strcmp($password, $repassword)) {
			exit('两次密码不一样');
		}
		$result['password'] = md5($password);
		$ip = $_SERVER['REMOTE_ADDR'];
		if (!strcmp($ip, '::1')) {
			$ip = '127.0.0.1';
		}
	
		$result['ip'] = ip2long($ip);
		$query =  $user->doInsert($result);
		if ($query) {
				Db::name('user')
				->where('id', $query)
				->setInc('coin', 20);
			

				echo json_encode(['status' => 1, 'msg' => '注册成功']);die();
		} else {
				echo json_encode(['status' => 0, 'msg' => '注册失败']);die();
		}

	}



}
