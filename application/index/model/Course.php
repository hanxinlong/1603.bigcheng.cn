<?php

namespace app\index\model;
use think\Model;
use think\Db;

class Course extends Model
{

	public function insertData1($finData, $data, $ip)
	{
		// dump($finData['path']);
		$tagname = $data['tagname'];
		$tag = '';
		foreach ($tagname as $key => $val) {
			$tag = $tag.','.$val;
		}
		// dump($tag);die();
		$value = [
				'finish_map' => $finData['path'],
				'title' => $data['cook_name'],
				'cook_difficulty' => $data['cook_difficulty'],
				'cook_time' => $data['costtime'],
				'source' => $data['cook_level'],
				'course_describe' => $data['cookStory'],
				'user_id' => session('user')['use_id'],
				'notice' => $data['cooktips'],
				'tag' => $tag,
				'create_ip' => $ip

		];
		return Db::name('course')->insertGetId($value);
	}
	public function doCour()
	{
		$data =  Db::table('douguo_user')
				->alias('user')
				->join('__COURSE__ cour', 'cour.user_id = user.id')
				->order('create_time', 'desc')
				->paginate(8);
		
		return $data;
	}
	public function courData()
	{
		$data =  Db::table('douguo_user')
				->alias('user')
				->join('__COURSE__ cour', 'cour.user_id = user.id')
				->order('create_time', 'desc')
				->paginate(6);
			
		return $data;
	}
	public function detailsData($data)
	{
		$data1 =  Db::table('douguo_user')
				->alias('user')
				->join('__COURSE__ cour', 'cour.user_id = user.id')
				->where('cour.id', $data)
				->find();

			return $data1;
	}
	public function doIncr($data)
	{
		Db::name('course')
				->where('id', $data)
				->setInc('read_times', 1);
	}
	public function doCourse($data)
	{
		// dump($data);die();
		$values = [];
		foreach ($data as $key => $vas) {
			$value =  Db::name('user')
			->alias('user')
			->join('__COURSE__ c', 'c.user_id = user.id')
			->where('c.id', $vas)
			->select();
			foreach ($value as $v) {
				$values[$key] = $v;
			}
		}
		return $values;
	}
}