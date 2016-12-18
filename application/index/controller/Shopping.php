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
use app\index\model\Goodscar;
class Shopping extends Auth
{
	public function shopping()
	{
		return $this->fetch();
	}
	public function array1()
	{
		return $this->fetch();
	}
	public function assess()
	{
		return $this->fetch();
	}
	public function payment()
	{
		return $this->fetch();
	}
	public function send()
	{
		return $this->fetch();
	}
	public function car(Goodscar $goodscar)
	{
		$carData = $goodscar -> doCar();
		// dump($carData);die();
		
		$this->assign('carData', $carData);
		return $this->fetch();
	}
}
