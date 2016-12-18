<?php
namespace app\admin\model;
use think\Model;

use traits\model\SoftDelete;

/**
* 分类表
*/
class Classify extends Model
{
	use SoftDelete;
	protected $deleteTime = 'delete_time';
	
	public function delClassify($id)
	{
		return Classify::destroy($id);
	}

}
