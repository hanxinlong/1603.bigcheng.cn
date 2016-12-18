<?php
namespace app\index\model;
use think\Model;
use think\Db;

class Collect extends Model
{
	public function collectUpdate($data)
	{
		// dump($data);die();
		$uid = session('user')['use_id'];
		$cour = Db::name('collect')->where('course_id', $data[1])->where('user_id', $uid)->select();
		// dump($cour);die();
		if (empty($cour[0]['course_id'])) {
			$value = [
			'author_id' => $uid,
			'user_id' => $data[0],
			'course_id' => $data[1]
			];
			return Db::name('collect')->insert($value);
		} else {
			return null;
		}

	}
	public function showCollect($id)
	{
		

		$uid = session('user')['use_id'];
		
		return Db::name('collect')->where('course_id', $id['id'])->where('user_id', $uid)->select();
	}
	public function collectDel($data)
	{
		$value = [
			'delete_time' => time()
		];
		return Db::name('collect')->where('course_id', $data[0])->update($value);
		// dump($data);die();
	}
	public function doColl()
	{
		$uid = session('user')['use_id'];
		return Db::name('collect')->where('author_id', $uid)->where('delete_time', null)->select();
	}
	public function doCollection($data)
	{
		// dump($data);die();
		return Db::name('collect')->where('course_id', $data['id'])->select();
	}
	public function quShou($id)
	{
		// dump($id);dump($uid);die();
		$uid = session('user')['use_id'];
		return Db::name('collect')->where('author_id', $uid)->where('course_id', $id['id'])->delete();
	}
}