<?php

namespace app\index\model;
use think\Model;
use think\Db;

class Goods extends Model
{
	public function showGoods()
	{
		return Db::name('goodpic')
		->alias('gic')
		->join('__GOODS__ goods', 'goods.id = gic.goods_id')
		->where('pic_type', 2)
		->limit(8)
		->select();
	}
	public function allGoods()
	{
		//	获取商品信息每页显示12条
		return Goods::where('id','>=',1)->paginate(12);

	}
	public function doGoods($id)
	{
		// $uid = session('user')['use_id'];
		return Db::name('goods')
			->alias('good')
			->join('__GOODPIC__ gpic', 'good.id = gpic.goods_id')
			->where('good.id', $id)
			->where('pic_type', 2)
			->select();
	}
}