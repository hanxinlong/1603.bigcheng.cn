<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
 /**
    * 设置发送邮件
    * @access public
    * @param string $email 收件人地址
    * @param string $subject 邮件主题
    * @param string $body 邮件内容
    * @param string(array) $copyTo
    *        抄送人(多个抄送人发送数组，单个string)
    * @param string(array) $secret 
    *        秘密抄送人(多个秘密抄送人发送数组，单个string)
    * @return boolean
    */
function send($email,$subject,$body,$copyTo=false,$secret=false){
		 vendor('phpmail.MySendMail');
         $mail = new MySendMail();//这个不输出具体信息
        // vendor('phpmail.Email');
        // $mail = new Email();//这个输出每一步操作是否成功
        $mail->setServer(config('MAIL_HOST'), config('MAIL_USER'),config('MAIL_PASS'),config('MAIL_PORT'));
        $mail->setFrom(config('MAIL_FROM'));
        $mail->setReceiver($email);
        $mail->setMailInfo($subject,$body);
        //抄送人
        if ($copyTo) {
            //多个抄送人
            if (is_array($copyTo)) {
                foreach ($copyTo as $value) {
                    $mail->setCc($value);
                }
            } else {
                $mail->setCc($copyTo);
            }
        }

        //秘密抄送人
        if ($secret) {
            //多个秘密抄送人
            if (is_array($secret)) {
                foreach ($secret as $value) {
                    $mail->setBcc($value);
                }
            } else {
                $mail->setBcc($secret);
            }
        }

        $status = $mail->sendMail();
        if ($status) {
            return true;
        } else {
            return false;
        }
}
