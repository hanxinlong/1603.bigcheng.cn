<?php

namespace app\index\model;
use think\Model;
use think\Db;
use think\Session;
class Comment extends Model
{
	public function doComm ($data)
	{
		$uid = session('user')['use_id'];
		$value = [
			'user_id' => $uid,
			'course_id' => $data['id'],
			'comment_type' => 1,
			'content' => $data['comment_content']
		];
		return Db::name('comment')->insert($value);
			
	}
	public function commData($data)
	{
		$data = Db::name('user')
			->alias('user')
			->join('__COMMENT__ comm', 'comm.user_id = user.id')
			->where('comm.course_id', $data)
			->select();
		return $data;
	}
	public function commDel($data)
	{
		$value = [
			'delete_time' => time()
		];
		return Db::name('comment')->where('id', $data)->update($value);
	}
}