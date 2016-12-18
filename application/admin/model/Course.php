<?php
namespace app\admin\model;
use think\Model;

use traits\model\SoftDelete;

/**
* 菜谱类
*/
class Course extends Model
{
	use SoftDelete;
	protected $deleteTime = 'delete_time';

	//删除单个
	public function delOne($id)
	{
		return Course::destroy($id);
	}

	//批量删除
	public function delMore($id)
	{
		$allId = $id;
		foreach ($allId as $val) {
			Course::destroy($val);
		}
	}
}