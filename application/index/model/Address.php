<?php

namespace app\index\model;
use think\Model;
use think\Db;
class Address extends Model{
	public function doAddress($data)
	{
		$uid = session('user')['use_id'];
		$value = [
			'realname' => $data['realname'],
			'cellphone' => $data['cellphone'],
			'goods_address' => $data['province'].$data['address'],
			'user_id' => $uid
		];
		return Db::name('address')->insertGetId($value);
	} 
	public function doFind()
	{
		$uid = session('user')['use_id'];
		return Db::name('address')->where('user_id', $uid)->select();
	}
	public function doDel($data)
	{
		$uid = session('user')['use_id'];
		return Db::name('address')
		      ->where('user_id', $uid)
		      ->where('id', $data['id'])
		      ->delete();
	}
	public function doEditor($data)
	{
		$uid = session('user')['use_id'];
		return Db::name('address')
		      ->where('user_id', $uid)
		      ->where('id', $data['id'])
		      ->select();
	}
	public function addrUpdate($data)
	{
		$uid = session('user')['use_id'];
		dump($data);die();
		$value = [
			'realname' => $data['realname'],
			'cellphone' => $data['cellphone'],
			'goods_address' => $data['province'].$data['address'],
			'user_id' => $uid,
			'id' => $data['id']
		];

		return Db::name('address')
		      ->where('id', $data['id'])
		      ->where('user_id', $uid)
		      ->update($value);
	}
}