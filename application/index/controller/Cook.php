<?php
namespace app\index\controller;
use app\index\controller\Auth;
use app\index\model\Category;
use app\index\model\User;
use think\Request;
use think\Controller;
use think\Db;
use app\index\model\Course;
use app\index\model\Collect;
use app\index\model\Ingredient;
use app\index\model\Step;
use app\index\model\Comment;
class Cook extends Auth
{
	public function publish(Category $category, User $user)
	{

		$result4 = [1, 2, 3, 4, 5];

		$this->assign('stepem', $result4);

		return $this->fetch();
	}

	public function details(Course $course, Ingredient $ingredient, Step $step, Collect $collect, Comment $comment)
	{
		//获取参数
		$request = Request::instance();
		$data = $request->param();
		// dump($data);die();
		//获取菜谱信息
		$details = $course->detailsData($data['id']);
		//获取主料信息
		$zhuFuData = $ingredient -> zhuFuData($data['id']);
		//获取步骤图
		$stepData1 = $step-> stepData($data['id']);
		//获取评论数据
		$commentData = $comment->commData($data['id']);
		// dump($commentData);die;
		//显示评论数据
		$this->assign('commData', $commentData);
		//判断是否收藏
		$collection = $collect->doCollection($data);
		// if (!empty($collection)) {
		// 	$this->assign('shou', $collection[0]);
		// }
		// dump($collection[0]['delete_time']);die();
		//处理标签数据
		$stepData = [];
		$tag1 = ltrim($details['tag'], ',');
		for ($i = 0; $i < count($stepData1); $i++) {
			if ($i != (count($stepData1) - 1)) {
				array_push($stepData, $stepData1[$i]);
			}
		}
		// dump($details);die();
		//浏览次数
		$increasing = $course->doIncr($data['id']);

		//判断是否收藏
		$yon = $collect->showCollect($data); 
// dump($yon);die();
		//收藏个数
		$numShou = count($yon);
		$this->assign('numShou', $numShou);
		$this->assign('yon', $yon);

		//显示标签
		$this->assign('tag', explode(',', $tag1));
		//显示商品信息
		$this->assign('details', $details);
		//显示主料
		$this->assign('zhuFuData', $zhuFuData);
		//显示辅料
		$this->assign('stepData', $stepData);
		return $this->fetch();
	}
	public function doDel( Comment $comment)
	{
		$request = Request::instance();
		$data = $request->param();
		$comm = $comment->commDel($data['id']);
		// dump($comm);die();
	}
	public function doComment(Comment $comment)
	{
		$request = Request::instance();
		$data = $request->param();
		$comment->doComm($data);
		if ($comment) {
			echo json_encode(['status' => 1, 'msg' => '验证码正确', 'data' => ['id' => $data['id'], 'time' => '111000']]);
		} else {
			echo json_encode(['status' => 0, 'msg' => '验证码正确', 'data' => ['id' => $data['id'], 'time' => '111000']]);
		}
		// dump($commentData);die();
	}
	public function doCollect(Collect $collect)
	{

		$request = Request::instance();
		$data = $request->param();
		// dump($data);die();
		$cangid = explode(',', $data['cangid']);
		// dump($cangid);die();
		$collData = $collect->collectUpdate($cangid);
		// dump($collData);die();
		if ($collData) {
			return ['status'=>1]; 
		} else {
			return ['status'=>0];
		}
		// dump($collData);die();
	}

	public function doCook1(Course $course, Step $step, Ingredient $ingredient)
	{

		$files = request()->file('uploadFile');
		$file = request()->file('images');

		$info = $file->move('./upload');

		if ($info) {
			$filePath = $info->getSaveName();
			$path = str_replace('\\', '/',  '__WEBSITE__'.$filePath);
			$finData['path'] = $path;

		} else {
			$this->error('请上传成品图');
		}

		$stepData = [];
		foreach($files as $key => $file1){

				$info1 = $file1->move('./upload');
				if($info1){
					$filePath1 = $info->getSaveName();
					$path1 = str_replace('\\', '/',  '__WEBSITE__'.$filePath1);
					$stepData[$key] = $path1;

				} else{
					$this->error('请上传步骤图');
				}
			}

		$ip = $_SERVER['REMOTE_ADDR'];
		if (!strcmp($ip, '::1')) {
			$ip = '127.0.0.1';
		}

		$couRes = $course->insertData1($finData, $_POST, ip2long($ip)); 
		if (!$couRes) {
			$this->error('请上传成品图');
		} 
		$stepRes = $step->insertData($stepData, $couRes, $_POST);
		if (!$stepRes) {
			$this->error('请上传步骤图');
		}
		$ingData = $ingredient->insertData($_POST, $couRes);
		if (!$ingData) {
			$this->error('请上传材料');
		}
		if ($ingData && $couRes && $stepRes && $ingData) {
			Db::name('user')
				->where('id', session('user')['use_id'])
				->setInc('coin', mt_rand(10, 30));
			$this->success('发布成功', '__SITE__/index/cook/publish');
		} else {
			$this->error('发布失败');
		}

	}
}
