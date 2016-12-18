<?php
namespace app\admin\model;
use think\Model;
use think\Db;
/**
* 订单类表
*/
class Orders extends Model
{	
	public function getOrders()
	{
		return Db::name('orders')->where('id','>=','1')->paginate(5);
	}
	
}