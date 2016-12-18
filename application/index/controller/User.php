<?php
namespace app\index\controller;
use app\index\controller\Auth;
use app\index\model\Category;
use app\index\model\Collect;
use app\index\model\Course;
use app\index\model\User as UserModel;
use think\Request;
class User extends Auth
{
	public function rule()
	{

		return $this->fetch();
	}
	public function profile(UserModel $user)
	{
		// $userData = $user->doUser();
// die();
		return $this->fetch();
	}
	public function brand()
	{

		return $this->fetch();
	}

	public function collect(Collect $collect, Course $course)
	{
		$collData = $collect->doColl();
		


		$collectId = [];
		if (!empty($collData)) {
			foreach ($collData as $key =>$vas) {
				array_push($collectId, $vas['course_id']);
			}

			$collectCourse = $course->doCourse($collectId);
// dump($collectCourse);die();

			$collectTimes = count($collData);
			$this->assign('collectTimes', $collectTimes);
			$this->assign('collectCourse', $collectCourse);
		}
		
		$collectTimes = count($collData);
		$this->assign('collectTimes', $collectTimes);

		return $this->fetch();
	}
	public function comment()
	{

		return $this->fetch();
	}
	public function dish()
	{

		return $this->fetch();
	}
	public function fans()
	{

		return $this->fetch();
	}
	public function friends()
	{

		return $this->fetch();
	}
	public function base()
	{

		return $this->fetch();
	}
	public function passchange()
	{
		return $this->fetch();
	}
	public function basemodel()
	{
		return $this->fetch();
	}
	public function setinfo(UserModel $user)
	{
		$data = $user->doSet();
		 //dump($data);die();
		$this->assign('setinfo', $data[0]);
		return $this->fetch();
	}
	public function checkOrignPwd(UserModel $user)
	{

		$request = Request::instance();
		$data = $request->param();
		$pwd = $user->pwd();
		if (!strcmp($pwd[0]['password'], md5($data['passwd']))) {
			return ['status' => 1];
		} else {
			return ['status' => 0];
		}
	}
	public function doUpdate (UserModel $user) {
		$request = Request::instance();
		$data = $request->param();
		$res = $user->updatePwd($data['newpasswd']);
		if ($res) {
			echo json_encode(['status' => 1, 'msg' => '修改成功']);die();
		} else {
			echo json_encode(['status' => 0, 'msg' => '修改失败']);die();
		}
	}
	//取消收藏
	public function quCang(Collect $collect)
	{
		$request = Request::instance();
		$data = $request->param();
		
		$qucang = $collect->quShou($data);

		if ($qucang) {
			return ['status' => 1];
		} else {
			return ['status' => 0];
		}
	}
}