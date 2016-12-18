<?php

namespace app\index\model;
use think\Model;
use think\Db;

class Ingredient extends Model
{

	public function insertData($data, $couRes)
	{

		$zhuliao = $data['zhuliao'];
		$fuliao = $data['fuliao'];
		$zlValue = $data['zhuliaoValue'];
		$flValue = $data['fuliaoValue'];
		$zhu = array_combine($zhuliao, $zlValue);
		$fu = array_combine($fuliao, $flValue);

		foreach ($zhu as $key => $val) {
			
			if (!empty($key)) {

				$value = [
				'course_id' => $couRes,
				'ing_type' => 1,
				'name' => $key,
				'dosage' => $val
				];
				Db::name('ingredient')->insert($value);
			}
		}

		foreach ($fu as $key => $vals) {
			if (!empty($key)) {
				$values = [
				'course_id' => $couRes,
				'ing_type' => 0,
				'name' => $key,
				'dosage' => $vals
				];
				Db::name('ingredient')->insert($values);
			}
		}
		return true;
	}
	public function zhuFuData($data)
	{
		return Db::name('ingredient')->where('course_id', $data)->select();
	}
}