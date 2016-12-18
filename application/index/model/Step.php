<?php

namespace app\index\model;
use think\Model;
use think\Db;
use think\Session;
class Step extends Model
{

	public function insertData($stepData, $couRes, $data)
	{
		if (count($stepData) < 5) {
			for ($i = 0; $i < 5; $i++) {
				if (empty($stepData[$i])) {
					$stepData[$i] = '__STATIC__/images/step.png';
				} else {
					$stepData[$i] = $stepData[$i];
				}
			}
		} 
		// dump($stepData);dump($data['stepInfos']);
		
// dump($data1);die();
		for ($i = 0; $i < count($stepData); $i++) {
			
			$value = [
				'course_id' => $couRes,
				'step_pic' => $stepData[$i],
				'step_describe' => $data['stepInfos'][$i]
			];
		$res = Db::name('step')->insert($value);
		}
		return $res;
	}	
	public function stepData($data)
	{
		return Db::name('step')->where('course_id', $data)->select();
	}
	
}