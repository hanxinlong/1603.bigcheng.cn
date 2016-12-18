<?php

namespace app\index\model;
use think\Model;
use think\Db;
use traits\model\SoftDelete;
 class Classify extends Model
 {
 	use SoftDelete;
 	protected $deleTime = 'delete_time';
 }
