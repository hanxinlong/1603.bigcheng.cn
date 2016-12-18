<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
class Forget extends Controller
{
	public function forget()
	{
		$this->view->engine->layout(false);
		return $this->fetch();
	} 
	public function reforget()
	{
		$this->view->engine->layout(false);
		return $this->fetch();
	} 
	public function doForget()
	{
	
	}
}