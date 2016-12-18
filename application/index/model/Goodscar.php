<?php

namespace app\index\model;
use think\Model;
use think\Db;
use think\Session;
class Goodscar extends Model
{

	public function doAdd($data)
	{
		// $uid = session('user')['use_id'];
		// $value = [
		// 	'gamount' => $data['num'],
		// 	'u_id' => $uid,
		// 	'goodcar_id' => $data['gid']
		// ];
		// return Db::name('goodscar')->insert($value);


		$uid = session('user')['use_id'];
		$good = Db::name('goodscar')
		           ->where('goodcar_id', $data['gid'])
		           ->where('u_id', $uid)
		           ->select();
		// dump($good);die();
		if (!empty($good[0]['goodcar_id'])) {
				$data = Db::name('goodscar')
				->where('u_id', $uid)
				->where('goodcar_id', $data['gid'])
				->setInc('gamount', $data['num']);
				return $data;
		} else {
			$value = [
				'gamount' => $data['num'],
				'u_id' => $uid,
				'goodcar_id' => $data['gid']
			];
			return Db::name('goodscar')->insert($value);
		}
		// if (!empty($cour[0]['course_id'])) {
		// 	$value = [
		// 	'author_id' => $uid,
		// 	'user_id' => $data[0],
		// 	'course_id' => $data[1],
		// 	'delete_time' => null
		// 	];
		// 	return Db::name('collect')->where('course_id', $data[1])->update($value);
		// } else {
		// 	$value = [
		// 	'author_id' => $uid,
		// 	'user_id' => $data[0],
		// 	'course_id' => $data[1]
		// 	];
		// 	return Db::name('collect')->insert($value);
		// }
	}
	public function doCar() {
		$uid = session('user')['use_id'];
		return Db::name('goodscar')
			->alias('car')
			->join('__GOODS__ g', 'g.id=car.goodcar_id')
			->join('__GOODPIC__ gpc', 'gpc.goods_id=car.goodcar_id')
			->where('u_id', $uid)
			->where('pic_type', 2)
			->select();
	}
}