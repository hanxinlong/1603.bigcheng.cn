<?php

namespace app\index\model;
use think\Model;
use think\Db;
use think\Session;
class Link extends Model
{
	public function doLink ()
	{
		return Db::name('link')->select();
	}
}