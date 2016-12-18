<?php
namespace app\admin\model;
use think\Model;
use think\Db;
use traits\model\SoftDelete;


class Goodpic extends Model
{
	use SoftDelete;
	protected $deleteTime = 'delete_time';

	//添加商品图片
	public function addPic($picInfo,$goodsId)
	{
		$goodPic =new Goodpic;
		$pic = '__WEBSITE__/'.str_replace('\\','/',$picInfo);
		$data = [
			'goods_id' => $goodsId,
			'goods_path' => $pic
		];
		return Db::name('goodpic')->insert($data);
	}
	//	添加详情页图片
	public function detail($detPic,$goodsId)
	{
		$goodPic = new Goodpic;
		$pic = '__WEBSITE__/'.str_replace('\\','/',$detPic);
		$data = [
			'goods_id' => $goodsId,
			'goods_path' => $pic,
			'pic_type' => 0
		];
		return Db::name('goodpic')->insert($data);
	}

	//添加封面图片
	public function cover($covPic,$goodsId)
	{
		$goodPic = new Goodpic;
		$pic = '__WEBSITE__/'.str_replace('\\','/',$covPic);
		$data = [
			'goods_id' => $goodsId,
			'goods_path' => $pic,
			'pic_type' => 2
		];
		return Db::name('goodpic')->insert($data);
	}
}