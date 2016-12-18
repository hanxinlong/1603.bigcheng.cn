<?php
namespace app\admin\controller;

use app\admin\model\Goodpic;
use think\Controller;
use traits\model\SoftDelete;//软删除
use app\admin\model\Goods as Good;
use app\admin\model\Orders;
use app\admin\model\User;
use think\Db;

/**
* 商品类表
*/
class Goods extends Controller
{
	use SoftDelete;
    protected $deleteTime = 'delete_time';

	public function addGoods()
	{

		return $this->fetch();
	}

	//	添加商品操作
	public function upload(Goodpic $goodpic, Good $goods)
	{
		// 获取表单上传文件
		$goodsInfo = $_POST;
		// dump($_POST);
		// exit();
		$goodsId =$goods->addGoods($goodsInfo);
		//获取商品展示图
		$files = request()->file('goods');
		foreach($files as $file){
		// 移动到框架应用根目录/public/uploads/ 目录下
			$info = $file->move('./upload');

			if($info){
			//获取图片路径信息
			$picInfo =  $info->getSaveName();
			// 成功上传后 获取上传信息
			$result1 = $goodpic->addPic($picInfo,$goodsId);
			}else{
			// 上传失败获取错误信息
			echo $file->getError();
			}
		}
		//获取商品详情图
		$details = request()->file('details');
		foreach($details as $detail){
		// 移动到框架应用根目录/public/uploads/ 目录下
			$detInfo = $detail->move('./upload');
			if($detInfo){
			//获取图片路径信息
			$detPic = $detInfo->getSaveName();
			// 成功上传后 获取上传信息
			$result2 = $goodpic->detail($detPic,$goodsId);
			}else{
			// 上传失败获取错误信息
			echo $detail->getError();
			}
		}

		//获取封面图
		$cover = request()->file('cover');
		$covInfo = $cover->move('./upload');
		if($covInfo){
		// 成功上传后 获取上传信息
		$covPic = $covInfo->getSaveName();
		// 成功上传后 获取上传信息
		$result3 = $goodpic->cover($covPic,$goodsId);
		}else{
		// 上传失败获取错误信息
		echo $file->getError();
		}

		//判断是否上传成功
		if ($result1 && $result2 && $result3) {
			$this->success('添加商品成功');
		} else {
			$this->error('添加商品失败');
		}
	}

	//获取商品信息操作
	public function goods(Goodpic $goodpic, Good $goods)
	{
		//获取商品总数
		$count = $goods->where('id','>=',1)->count();
		$this->assign('count',$count);
		//获取商品列表且每页显示五条
		$goodList = Db::name('goods')->where('id','>=',1)->paginate(5);
		//获取商品图片
		$goodPic = $goodpic->where('id','>=',1)->where('pic_type','=',1)->select();
		$page =$goodList->render();
		$this->assign('goodList',$goodList);
		$this->assign('goodPic',$goodPic);
		$this->assign('page',$page);
		return $this->fetch();
	}

	//下架单个商品操作
	public function delOne(Good $goods)
    {
    	$id = input('id');
        $result = $goods->delOne($id);
         if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '商品下架成功']);
        }else{
            echo json_encode(['status'=>0,'msg'=>'商品下架失败']);
        }
    }

     //批量下架商品
    public function delMore(Good $goods)
    {
    	$id = input('id');
        $id = explode(',',$id);
        $goods->delMore($id);
    }

    //商品回收站
    public function recycle(Goodpic $goodpic, Good $goods)
	{
		//多少件不可用商品
		$delCount = $goods->onlyTrashed()->count();
		$this->assign('delCount',$delCount); 
		//查询下架商品数据 并且每页显示5条数据
		$delGoods = $goods->onlyTrashed()->paginate(5);
		$goodPic = $goodpic->where('id','>=',1)->where('pic_type','=',1)->select();
		$delPage = $delGoods->render();
		$this->assign('delGoods',$delGoods);
		$this->assign('goodPic',$goodPic);
		$this->assign('delPage',$delPage);
		// 渲染模板输出
		return $this->fetch();
	}

	//恢复商品上架权限
	public function recover()
    {
        $id = input('id');
        $result = db('goods')->where('id',$id)->update(['delete_time' => null]);
        if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '已恢复商品展示权限']);
        } else {
            echo json_encode(['status'=> 0,'msg'=> '恢复展示权限失败']);
        }
    }

    //获取要修改的商品信息
    public function updateGoods(Good $goods,Goodpic $goodpic)
    {
    	$id = input('id');
    	//获取商品信息
    	$infoAll = $goods->where('id',$id)->select();
    	//获取封面图
    	$cover = $goodpic->where('goods_id',$id)->where('pic_type','=',2)->select();
    	//获取商品图
    	$picInfo = $goodpic->where('goods_id',$id)->where('pic_type','=',1)->select();
    	// 获取详情图
    	$details = $goodpic->where('goods_id',$id)->where('pic_type','=',0)->select();
    	$info = $infoAll[0];
    	$this->assign('details',$details);
    	$this->assign('info',$info);
    	$this->assign('cover',$cover[0]);
    	$this->assign('picInfo',$picInfo);
    	return $this->fetch();
    }

    //修改商品信息
    public function doUpdate( Good $goods)
    {
    	// 获取表单上传文件
		$goodsInfo = $_POST;
		$result = $goods->updateGoods($goodsInfo);
		//判断是否上传成功
		if ($result) {
			$this->success('修改商品信息成功');
		} else {
			$this->error('修改商品信息失败');
		}
    }

    //获取订单信息
    public function order(Orders $orders,Goodpic $goodpic,User $user)
    {
    	$user = $user->where('id','>=',1)->select();
    	$orderInfo = $orders->getOrders();
    	$page = $orderInfo->render();
    	$count = $orders->where('id','>=',1)->count();
    	$cover = $goodpic->where('pic_type','=',2)->select();
    	$this->assign('orderInfo',$orderInfo);
    	$this->assign('count',$count);
    	$this->assign('cover',$cover);
    	$this->assign('page',$page);
    	$this->assign('user',$user);
    	return $this->fetch();
    }


}