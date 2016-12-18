<?php
namespace app\admin\model;
use think\Model;
use traits\model\SoftDelete;

/**
* 
*/
class Link extends Model
{
	use SoftDelete;
	protected $deleteTime = 'delete_time';
	//删除链接
	public function delLink($id)
	{
		return Link::destroy($id);
	}
	//	更新链接
	public function updateLink($linkInfo)
	{
		$link = new Link;

		return $link->save([
            'name' => $linkInfo['name'],
            'url' => $linkInfo['url'],
            'logo' => $linkInfo['logo'],
            'logo_describe' => $linkInfo['logo_describe']
        ],['id'=>$linkInfo['id']]);
	}
	//添加链接
	public function addLink($linkInfo)
	{
		$data = [
            'name' => $linkInfo['name'],
            'url' => $linkInfo['url'],
            'logo' => $linkInfo['logo'],
            'logo_describe' => $linkInfo['logo_describe']
        ];
        return Link::name('link')->insert($data);
	}
}