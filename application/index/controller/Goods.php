<?php
namespace app\index\controller;
use app\index\controller\Auth;
use app\index\model\Category;
use app\index\model\User;
use think\Request;
use think\Controller;
use think\Db;
use app\index\model\Orders;
use app\index\model\Course;
use app\index\model\Address;
use app\index\model\Collect;
use app\index\model\Ingredient;
use app\index\model\Step;
use app\index\model\Comment;
use app\index\model\Goodscar;
use app\index\model\Goods as Good;
use app\index\model\Goodpic as Goodpic;
class Goods extends Auth
{

    	public function details(Good $goods, Goodpic $goodpic)
    	{
       $info = $goods->allGoods();
       $page = $info->render();
        	//获取商品封面图
       $pic = $goodpic->where('id','>=',1)->where('pic_type',2)->select();
       $this->assign('pic',$pic);
       $this->assign('info',$info);
       $this->assign('page',$page);
       return $this->fetch();
     }
     public function buygoods(Good $goods, Goodpic $goodpic, $id)
     {

    // dump($id);die();

      $id = input('id');

      $infoAll = $goods->where('id',$id)->select();

      $picInfo = $goodpic->where('goods_id',$id)->where('pic_type','=',1)->select();

      $details = $goodpic->where('goods_id',$id)->where('pic_type','=',0)->select();
      $info = $infoAll[0];
      if ($id && $info && $details && $picInfo) {
        $this->assign('ids', $id);
        $this->assign('details',$details);
        $this->assign('info',$info);
        $this->assign('picInfo',$picInfo);
      }


      return $this->fetch();
    }
    public function doAdd(Goodscar $goodscar)
    {
      $request = Request::instance();
      $data = $request->param();

      $add = $goodscar->doAdd($data);
      if ($add) {
        echo json_encode(['status' => 1]);
      } else {
        echo json_encode(['ststus' => 0]);
      }
    }
    public function buy ($id, $num, Good $goods, Address $address) {
      if (!session('user')) {
        $this->error('请先登录', 'index/index');
      }
      $findAddress = $address->doFind();
      $goodsData = $goods->doGoods($id);
      $this->assign('goodsData', $goodsData[0]);
            // dump($goodsData[0]);die();
            // $this->assign('money', ($goodsData[0] * $));
      $money = $goodsData[0]['new_price'] * $num;
      $benefitMoney = ($goodsData[0]['old_price'] - $goodsData[0]['new_price']) * $num;
      $this->assign('money', $money);
      $this->assign('benefitMoney', $benefitMoney);
      $this->assign('address', $findAddress);
      $this->assign('id', $id);
      $this->assign('num', $num);
      return $this->fetch();
    }
    public function address(Address $address)
    {
      $request = Request::instance();
      $data = $request->param();
            // dump($id);dump($num);
            //dump($data);die();
      $add = $address->doAddress($data);
      if ($add) {
        return ['status' => 1, 'data' => ['realname' => $data['realname'], 'cellphone' => $data['cellphone'], 'address' => $data['address'], 'province' => $data['province'], 'id' => $add]];
      } else {
        return ['status' => 0];
      }
    }
    public function delAddr(Address $address)
    {
      $request = Request::instance();
      $data = $request->param();
      $del = $address->doDel($data);
      if ($del) {
        return ['status' => 1];
      } else {
        return ['status' => 0];
      }
    } 
    public function doAddrEditor(Address $address)
    {
      $request = Request::instance();
      $data = $request->param();
      $editor = $address->doEditor($data);
            // dump($editor[0]);die();
      if ($editor[0]) {
        return ['status' => 1,
        'data' => [
        'id' => $editor[0]['id'],
        'goods_address' => $editor[0]['goods_address'],
        'cellphone' => $editor[0]['cellphone'],
        'realname' => $editor[0]['realname']
        ]
        ];
      } else {
        return ['status' => 0];
      }
    }
    public function doUpdateAddr(Address $address)
    {
     $request = Request::instance();
     $data = $request->param();
           // dump($data);die();
     $updateAddr = $address->addrUpdate($data);
           // dump($updateAddr);die();
     if ($updateAddr) {
      return ['status' => 1, 
      'data' => [
      'id' => $data['id'],
      'goods_address' => $data['province'],
      'cellphone' => $data['cellphone'],
      'realname' => $data['realname']
      ]
      ];
    } else {
      return ['status' => 0];
    }
           // dump($updateAddr);
           // dump($data);die();
    }
    public function uPrice () {
      $request = Request::instance();
      $data = $request->param();
           // dump($data);die();
      $money = $data['num'] * $data['siglePrice'];

      $benefitPrice = $data['youhui'] * $data["num"];
      return ['status' => 1,
      'data' => [
      'money' => $money,
      'benefitPrice' => $benefitPrice
      ]
      ];
    }
    public function dPrice () {
      $request = Request::instance();
      $data = $request->param();
           // dump($data);die();
      if ($data['num'] == 1) {
       $money = $data['siglePrice'];
     } else {
       $money = ($data['num'] - 1) * $data['siglePrice'];
     }



     $benefitPrice = $data['youhui'] * ($data['num'] - 1);
           // dump($benefitPrice);die();
     return ['status' => 1,
     'data' => [
     'money' => $money,
     'benefitPrice' => $benefitPrice
     ]
     ];
    }

    public function addMount()
    {
       $request = Request::instance();
       $data = $request->param();
        dump($data);die(); 
    }
    public function paymoney($id, Orders $orders)
    {
      $orData = $orders->orderData($id);

      $this->assign('orData', $orData);
      $this->assign('id', $id);
      return $this->fetch();
    }
    public function doGoods(Orders $orders)
    {
      $request = Request::instance();
      $data = $request->param();
      // dump($data);die();
      $order = $orders->doOrder($data);
      if ($order) {
          return ['status' => 1, 'id' => $order];
      } else {
          return ['status' => 0];
      }
      // dump($order);die();  
    }
    public function delGoods (Orders $orders) 
    {
      $request = Request::instance();
      $data = $request->param();
      // dump($data);die();
      $order = $orders->doDelGoods($data);
    }
    public function pay(Orders $orders) 
    {
      $request = Request::instance();
      $data = $request->param();
      $uid = session('user')['use_id'];
      $yinfu = ltrim($data['yinfu'],'￥');
      // dump($data);
      // dump($yinfu);die();
      Db::name('user')
      ->where('id', $uid)
      ->setDec('money', $yinfu);
      // dump($a);die();
      $order = $orders->doPay($data);
      // dump($order);die();
      if ($order) {
          return ['status' => 1];
      } else {
          return ['status' => 0];
      }
    }
}