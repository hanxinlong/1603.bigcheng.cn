<?php

namespace app\index\model;
use think\Model;
use think\Db;

class User extends Model
{
	public function doNumber($data)
	{
		// dump($data);
		return Db::name('user')->where('phone_number', $data)->select();
	}
	public function doInsert($data)
	{
		return Db::name('user')->insertGetId($data);
	}
	public function doPhone($data)
	{
		return Db::name('user')->where('phone_number', $data)->select();
	}
	public function doData($data)
	{
		return Db::name('user')->where('phone_number', $data)->select();
	}
	public function userData($data)
	{
		// dump(Db::name('user')->where('id', $data)->select());die();
		return Db::name('user')->where('id', $data)->select();
	}
	public function doUser()
	{
		
		$uid = session('user')['use_id'];
		$data =  Db::table('douguo_user')
		->alias('user')
		->join('__COURSE__ c', 'user.id = c.user_id')
		->where('user.id', $uid)
		->order('c.id', 'desc')
		->paginate(8);
		// dump($data);die();
		return $data;
	}
	public function doTime()
	{
		
		$uid = session('user')['use_id'];
		$data =  Db::table('douguo_user')
		->alias('user')
		->join('__COURSE__ c', 'user.id = c.user_id')
		->where('user.id', $uid)
		->select();
		return $data;
	}
	public function setIn($data)
	{
		// dump($data);die();
		$uid = session('user')['use_id'];
		$value = [
			'email' => 			$data['email'],
			'nickname' =>		$data['nickname'],
			'sex' =>			$data['sex'],
			'year' =>			$data['year'],
			'month' =>			$data['month'],
			'day' =>			$data['day'],
			'address' =>		$data['address'],
			'taste' =>			$data['taste'],
			'personal' =>		$data['personal']
		];
		return $data = Db::name('user')->where('id', $uid)->update($value);

	}

	public function doSet()
	{
		$uid = session('user')['use_id'];

		return Db::name('user')->where('id', $uid)->select();
	}
	public function upTou($icons)
	{
		$uid = session('user')['use_id'];
		$value = [
				'icons' => $icons['path']
		];
		return Db::name('user')->where('id', $uid)->update($value);
	}
	public function pwd()
	{
		$uid = session('user')['use_id'];
		return Db::name('user')->where('id', $uid)->select();
	}
	public function updatePwd($data)
	{
		$uid = session('user')['use_id'];
		$value = [
			'password' => md5($data)
		];
		return Db::name('user')->where('id', $uid)->update($value);
	}
	public function doAuthor($data)
	{
		return Db::name('user')->where('id', $data)->select();
	}
	
}