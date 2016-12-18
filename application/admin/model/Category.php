<?php 
namespace app\admin\model;
use think\Model;

use traits\model\SoftDelete;

/**
* 栏目类表
*/
class Category extends Model
{
	use SoftDelete;
	protected $deleteTime = 'delete_time';
	
	public function delProgram($id)
	{
		return Category::destroy($id);
	}

}