<?php
namespace app\admin\controller;

use app\admin\model\User;
use app\admin\model\Category;
use app\admin\model\Classify;
use think\Controller;
use think\Model;
use think\Session;
use traits\model\SoftDelete;
use app\admin\model\Link;
use think\Db;
class Admin extends Controller
{
    use SoftDelete;
    protected $deleteTime = 'delete_time';
    //登录
    public function login()
    {
        return $this->fetch();

    }
    //退出登录
    public function loginOut()
    {
        Session::clear();
        return $this->fetch('login');
    }
    //登录验证
    public function doLogin()
    {
        $code = $_REQUEST['code'];
        if(captcha_check($code)){
            $username = $_REQUEST['username'];
            $password = md5($_REQUEST['password']);
            $u =Db::name('user')->where('phone_number', $username)->value('phone_number');
            $p = Db::name('user')->where('phone_number', $username)->value('password');
            if (isset($u)) {
                if ($password) {
                    if ($p == $password) {
                        $t = Db::name('user')->where('phone_number', $username)->value('user_type');
                        if ($t === 0 || $t ===1 ) {
                            $id = Db::name('user')->where('phone_number', $username)->value('id');
                            session('name', [
                                'id' => $id,
                                'username' => $u,
                                'user_type' => $t
                            ]);
                            echo 1;
                            die();
                        } else {
                            echo 2;
                            die();
                        }
                    } else {
                        echo 3;
                        die();
                    }
                } else {
                    echo 4;
                    die();
                }
            } else {
                echo 5;
                die();
            }
        }else{
        	echo 6;
        	die();
        }
    }

    public function index()
    {
        return $this->fetch();
    }
    //修改密码
    public function pass()
    {
        return $this->fetch();
    }
    //执行密码修改操作
    public function updatePass()
    {
        $user = new User;
        $mpass = md5($_REQUEST['mpass']);
        $newpass = md5($_REQUEST['newpass']);
        $renewpass = $_REQUEST['renewpass'];
        $pass = $user->where('password', $mpass)->find()->password;

        $id = $user->where('password', $mpass)->find()->id;
        if ($id) {
            if (!empty($mpass)) {
                if (!strcmp($pass, $mpass)) {
                    $user->save([
                        'password' => $newpass
                    ], ['id' => $id]);
                    $this->success('密码修改成功');
                } else {
                    $this->error('两次输入密码不相等');
                }
            } else {
                $this->error('原始密码不能为空');
            }
        } else {
            $this->error('原始密码输入错误');
        }
    }
    //获取食材的操作
    public function material(Classify $classify)
    {
        //获取食材并每页显示5条;
        $list = $classify->where('pid','=',1)->paginate(5);
        $page = $list->render();
        $this->assign('list',$list);
        $this->assign('page',$page);
        return $this->fetch();
    }
    //删除Classify分类表数据的操作
    public function delClassify(Classify $classify)
    {
        $id = input('id');
        $result = $classify->delClassify($id);
        if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '删除成功']);
        }else{
            echo json_encode(['status'=>0,'msg'=>'对不起,删除失败']);
        }
    }
    
    public function modClassify()
    { 
        return $this->fetch();
    }
    //修改类别的操作
    public function doModClassify(Classify $classify)
    {
        $id = input('id');
        $title = input('title');
        $content = input('content');
        $result = $classify->save([
                    'classify_name' => $title,
                    'description' => $content
                ],['id' => $id]);
        if ($result) {
            $this->success($title."信息修改成功");
        } else {
            $this->error($title."信息修改失败");
        }
    }
    //添加食材的操作
    public function addMaterial(Classify $classify)
    {   
        $title = input('title');
        $content = input('content');
        $classify->data([
          'classify_name' => $title,
          'description' => $content,
          'pid'=> 1,
          'cate_id' => 10,
          'cid' => 1
        ]);
        $result = $classify->save();
        if ($result) {
            $this->success('添加食材成功！');
        } else {
            $this->error('对不起，添加食材失败');
        }
    }
    //获取分类的操作
    public function classify(Classify $classify)
    {
        $list = $classify->where('pid','=',9)->paginate(5);
        $page = $list->render();
        $this->assign('list',$list);
        $this->assign('page',$page);
        return $this->fetch();
        return $this->fetch();
    }
    //添加分类操作
    public function addClassify(Classify $classify)
    {
        $title = input('title');
        $content = input('content');
        $classify->data([
          'classify_name' => $title,
          'description' => $content,
          'pid'=> 9,
          'cate_id' => 7,
          'cid' => 0]);

        $result = $classify->save();

        if ($result) {
            $this->success('添加分类成功！');
        } else {
            $this->error('对不起，添加分类失败');
        }
    }
    //添加栏目操作
    public function addProgram(Category $category)
    {
        $title = input('title');
        $content = input('content');
        $category->data([
          'classname' => $title,
          'description' => $content
        ]);
        $result = $category->save();
        if ($result) {
            $this->success('添加栏目成功！');
        } else {
            $this->error('对不起，添加栏目失败');
        }
    }

    //删除栏目表数据的操作
    public function delProgram(Category $category)
    {
        $id = input('id');
        $result = $category->delProgram($id);
         if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '删除成功']);
        }else{
            echo json_encode(['status'=>0,'msg'=>'删除失败']);
        }

    }

    //修改栏目表操作
    public function modProgram()
    {
        $id = input('id');
        $name = input('name');
        $content = input('content');
        $this->assign('id',$id);
        $this->assign('name',$name);
        $this->assign('content',$content);
        return $this->fetch();
    }

    //执行修改操作
    public function doModify(Category $category)
    {
        $id = input('id');
        $title = input('title');
        $content = input('content');
        $result = $category->save([
                    'classname' => $title,
                    'description' => $content
                ],['id' => $id]);
        if ($result) {
            $this->success('板块信息修改成功');
        } else {
            $this->error('板块信息修改失败');
        }
    }

    //获取站点信息
    public function link(Link $link)
    {
        $info = $link->where('id','>',0)->select();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //删除一个友情链接
    public function delLink(Link $link)
    {
        $id = input('id');
        $result = $link->delLink($id);
        if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '删除成功']);
        }else{
            echo json_encode(['status'=>0,'msg'=>'删除失败']);
        }
    }

    //添加一个友情链接
    public function addLink(Link $link)
    {
        $linkInfo = $_POST;
        $result = $link->addLink($linkInfo);
        if ($result) {
            $this->success('添加链接成功');
        }else{
            $this->error('添加链接失败');
        }
    }

    //修改一个友情链接
    public function updateLink(Link $link)
    {
        $linkInfo = $_POST;
        $result = $link->updateLink($linkInfo);
        if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '修改成功']);
        }else{
            echo json_encode(['status'=> 0,'msg'=> '修改失败']);
        }
    }

    //获取栏目信息
    public function column(Category $category)
    {
        $cateList = $category->where('id','>',0)->select();
        $this->assign('cateList',$cateList);
        return $this->fetch();
    }

    //获取用户信息
    public function user(User $user)
    {   
        //获取用户总数
        $count = $user->where('user_type','=',3)->count();
        $this->assign('count',$count);
        //获取用户数据且每页显示5条数据
        $list = $user->where('user_type','=',3)->paginate(5);
        //获取分页
        $page = $list->render();
        $this->assign('list', $list);
        $this->assign('page', $page);
        return $this->fetch();
    }

    //获取管理员信息
    public function admin()
    {
        $user = new User;   
        $count0 = $user->where('user_type','=',0)->count();
        $this->assign('count0',$count0); //多少条超级管理员
        $count1 = $user->where('user_type','=',1)->count();
        $this->assign('count1',$count1);//多少条普通管理员
        // 查询可用超管数据 并且每页显示5条数据 
        $list0 = $user->where('user_type','=',0)->paginate(5);
        // 查询可用普通管理员数据 并且每页显示5条数据 
        $list1 = $user->where('user_type','=',1)->paginate(5);
        // 获取分页显示
        $page0 = $list0->render();
        $page1 = $list1->render();
        // 模板变量赋值
        $this->assign('list0', $list0);
        $this->assign('list1', $list1);
        $this->assign('page0', $page0);
        $this->assign('page1', $page1);
        // 渲染模板输出
        return $this->fetch();
    }

    //删除一个用户
    public function delOne(User $user)
    {
        $id = input('id');
        $result = $user->delOne($id);
         if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '删除成功']);
        }else{
            echo json_encode(['status'=>0,'msg'=>'删除失败']);
        }
    }

    //删除多个用户
    public function delMore(User $user)
    {
        $id = input('id');
        $id = explode(',',$id);
        $user->delAdmin($id);
    }

    //设置管理员权限
    public function beAdmin(User $user)
    {
        $id = input('id');
        $result = $user->update(['id'=>$id,'user_type' => 1]);
        if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '已将该用户设置成管理员']);
        } else {
            echo json_encode(['status'=>0,'msg'=>'设置失败']);
        }  
    }

    //获取软删除的用户
    public function recycle(User $user)
     {
        $delCount = $user->onlyTrashed()->count();
        $this->assign('delCount',$delCount); //多少条不可用用户
        //查询不可用用户数据 并且每页显示5条数据
        $delUser = $user->onlyTrashed()->paginate(5);
        $delPage = $delUser->render();
        $this->assign('delUser',$delUser);
        $this->assign('delPage',$delPage);
        // 渲染模板输出
        return $this->fetch();
     }

    //解除管理员权限
    public function relieve(User $user)
    {
        $id = input('id');
        $result = $user->update(['id'=>$id,'user_type' => 3]);
        if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '已解除该用户管理员权限']);
        } else {
            echo json_encode(['status'=>0,'msg'=>'解除权限失败']);
        }  
    }
    
    //恢复用户权限
    public function recover()
    {
        $id = input('id');
        $result = db('user')->where('id',$id)->update(['delete_time' => null]);
        if ($result) {
            echo json_encode(['status'=> 1,'msg'=> '已恢复用户权限']);
        } else {
            echo json_encode(['status'=> 0,'msg'=> '恢复用户权限失败']);
        }
    }
}

