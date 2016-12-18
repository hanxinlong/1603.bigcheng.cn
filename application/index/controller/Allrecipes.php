<?php
namespace app\index\controller;
use app\index\controller\Auth;
use think\Controller;
use app\index\model\Category;
use app\index\model\Course;
use think\Request;
use think\Db;
use app\index\model\User  as UserModel;
class Allrecipes extends Auth
{
	public function lists()
	{
		
		return $this->fetch();
	}
	public function choice(Course $course)
	{
		$request = Request::instance();
		$data = $request->param();

		$keywords = input('keywords');
		
        if (isset($keywords)) {
            
            $cookData = $data =  Db::table('douguo_user')
				->alias('user')
				->join('__COURSE__ cour', 'cour.user_id = user.id')
				->order('create_time', 'desc')
				->where('title','like',"%$keywords%")
				->select();
            if ($cookData) {
            
           
            $this->assign('cookData',$cookData);
           
            } else {
                $this->error('对不起，没有这道菜', 'index/index');
            } 
        } else {
        	$cookData = $course->courData();
        	$page = $cookData->render();

		
        	$this->assign('cookData', $cookData);
        	$this->assign('page', $page);
         
        }
        return $this->fetch();
	}

	public function classify()
	{
		
		return $this->fetch();
	}

	public function foods()
	{
		
		return $this->fetch();
	}
	public function sousou(Course $course, Ingredient $ingredient, Step $step, User $user)
    {
        $keywords = input('keywords');
        // dump($keywords);die();
        if (isset($keywords)) {
            //获取关键词菜谱总数
            $count = $course->where('title','like',"%$keywords%")->count();
            $this->assign('count',$count);
            $couList = $course->where('title','like',"%$keywords%")->select();
            if ($couList) {
               //获取材料
            $ingList = $ingredient->where('id','>=',1)->select();
            //获取步骤
            $stList = $step->where('id','>=',1)->select();
            //获取主厨信息
            $chefList = $user->where('id','>=',1)->select();
            $page = '';
            $this->assign('couList',$couList);
            $this->assign('ingList',$ingList);
            $this->assign('stList',$stList);
            $this->assign('chefList',$chefList);
            $this->assign('page',$page);
            } else {
                $this->error('对不起，没有这道菜');
            } 
        } else {
            //获取菜谱总数
            $count = $course->where('id','>=',1)->count();
            $this->assign('count',$count);
            //获取菜谱并每页显示5条数据
            $couList = $course->where('id','>=',1)->paginate(5);
            //获取材料
            $ingList = $ingredient->where('id','>=',1)->select();
            //获取步骤
            $stList = $step->where('id','>=',1)->select();
            $chefList = $user->where('id','>=',1)->select();
            $page = $couList->render();
            $this->assign('couList',$couList);
            $this->assign('ingList',$ingList);
            $this->assign('stList',$stList);
            $this->assign('chefList',$chefList);
            $this->assign('page',$page); 
        }
        return $this->fetch();
    }


}