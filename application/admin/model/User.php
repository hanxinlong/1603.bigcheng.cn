<?php
namespace app\admin\model;

use think\Model;

use traits\model\SoftDelete;//软删除方法

class User extends Model
{
	use SoftDelete;
	protected $deleteTime = 'delete_time';
	public function delAdmin($id)
	{
		
		$allId = $id;
		foreach ($allId as $val) {
			User::destroy($val);
		}
	}

	 public function delOne($id)
	 {
	 	return User::destroy($id);
	 }
}