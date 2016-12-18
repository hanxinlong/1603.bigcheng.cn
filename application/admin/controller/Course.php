<?php
namespace app\admin\controller;

use app\admin\model\Course as Cour;
use app\admin\model\User;
use app\admin\model\Ingredient;
use app\admin\model\Step;
use think\Controller;
use think\Model;
use traits\model\SoftDelete;//软删除
use think\Db;
/**
* 菜谱控制器
*/
class Course extends Controller
{
	use SoftDelete;
    protected $deleteTime = 'delete_time';

    //获取菜谱总信息
    public function course(Cour $course, Ingredient $ingredient, Step $step, User $user)
    {
        $keywords = input('keywords');
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

    //删除单个菜谱信息
    public function delOne(Cour $course, Ingredient $ingredient, Step $step)
    {
    	$id = input('id');
        $result = $course->delOne($id);
         if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '删除成功']);
        }else{
            echo json_encode(['status'=>0,'msg'=>'删除失败']);
        }
    }

    //批量删除菜谱信息
    public function delMore(Cour $course, Ingredient $ingredient, Step $step)
    {
    	$id = input('id');
        $id = explode(',',$id);
        $course->delMore($id);
    }

    //获取软删除（回收站）菜谱信息
    public function recycle(Cour $course)
	{
		$delCount = $course->onlyTrashed()->count();
		$this->assign('delCount',$delCount); //多少条不可用用户
		//查询不可用用户数据 并且每页显示5条数据
		$delCourse = $course->onlyTrashed()->paginate(5);
		$delPage = $delCourse->render();
		$this->assign('delCourse',$delCourse);
		$this->assign('delPage',$delPage);
		// 渲染模板输出
		return $this->fetch();
	}

	//恢复菜谱浏览权限
	public function recover()
    {
        $id = input('id');
        $result = db('course')->where('id',$id)->update(['delete_time' => null]);
        if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '已恢复菜谱展示权限']);
        } else {
            echo json_encode(['status'=> 0,'msg'=> '恢复展示权限失败']);
        }
    }


	
    
}

