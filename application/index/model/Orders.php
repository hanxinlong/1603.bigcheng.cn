<?php

namespace app\index\model;

use think\Model;
use think\Db;
class Orders extends Model
{
	public function doOrder($data)
	{
		$uid = session('user')['use_id'];
		$value = [
			'user_id' => $uid,
			'goods_id' => $data['id'],
			'address_id' => $data['address_id'],
			'count' => $data['num'],
			'price' => $data['yinfu'],
			'goods_status' => '未付款',
			'goods_info' => $data['title'],
			'map_picture' => $data['picture'],
			'good_number' => mt_rand(10000, 90000)
		];
		return Db::name('orders')->insertGetId($value);
	}
	public function orderData($id)
	{
		$uid = session('user')['use_id'];
		$data = Db::name('orders')
			->alias('order')
			->join('__ADDRESS__ adr', 'order.address_id = adr.id')
			->where('order.user_id', $uid)
			->where('order.id', $id)
			->find();
		return $data;
	}
	public function doDelGoods($data)
	{
		// dump($data);die();
		$uid = session('user')['use_id'];
		$value = [
			'goods_status' => '待支付'
		];
		return Db::name('orders')->where('id', $data['id'])->where('user_id', $uid)->update($value);
	}
	public function doPay($data)
	{
		// dump($data);die();
		$uid = session('user')['use_id'];
		$value = [
			'goods_status' => '已支付'
		];
		return Db::name('orders')->where('id', $data['id'])->where('user_id', $uid)->update($value);
		
	}
}