<?php
namespace app\admin\model;
use think\Model;
use think\Db;
use traits\model\SoftDelete;

/**
* 商品类
*/
class Goods extends Model
{
	use SoftDelete;
	protected $deleteTime = 'delete_time';

	//删除单个
	public function delOne($id)
	{
		return Goods::destroy($id);
	}

	//批量删除
	public function delMore($id)
	{
		$allId = $id;
		foreach ($allId as $val) {
			Goods::destroy($val);
		}
	}

	//添加商品
	public function addGoods($goodsInfo)
	{
		$data = [
			'goods_name' => $goodsInfo['goods_name'],
			'old_price' => $goodsInfo['old_price'],
			'new_price' => $goodsInfo['new_price'],
			'place' => $goodsInfo['place'],
			'amount' => $goodsInfo['amount'],
			'freight' => $goodsInfo['freight'],
			'goods_des' => $goodsInfo['goods_des'],
			'tel' => $goodsInfo['tel'],
			'afterSell' => $goodsInfo['afterSell']
		];
		return $goodsId = Db::name('goods')->insertGetId($data);
	}

	//修改商品信息
	public function updateGoods($goodsInfo)
	{
		$goods = new Goods;
		return $goods->where('id',$goodsInfo['id'])
		->update([
			'goods_name' => $goodsInfo['goods_name'],
			'old_price' => $goodsInfo['old_price'],
			'new_price' => $goodsInfo['new_price'],
			'place' => $goodsInfo['place'],
			'freight' => $goodsInfo['freight'],
			'goods_des' => $goodsInfo['goods_des'],
			'tel' => $goodsInfo['tel'],
			'afterSell' => $goodsInfo['afterSell']
		]);
	}
}