<?php
namespace app\index\model;
use think\Model;
use think\Db;

class Category extends Model
{

	public function classFind()
	{
		return Db::name('category')->select();
	}
	public function doClass()
	{
		$data =  Db::table('douguo_category')
				->alias('cat')
				->join('__CLASSIFY__ c', 'cat.id = c.cate_id')
				->select();
		return $data;
	}
}