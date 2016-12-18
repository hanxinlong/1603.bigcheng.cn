<!-- {__NOLAYOUT__}<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>跳转提示</title>
    <style type="text/css">
        *{ padding: 0; margin: 0; }
        body{ background: #fff; font-family: "Microsoft Yahei","Helvetica Neue",Helvetica,Arial,sans-serif; color: #333; font-size: 16px; }
        .system-message{ padding: 24px 48px; }
        .system-message h1{ font-size: 100px; font-weight: normal; line-height: 120px; margin-bottom: 12px; }
        .system-message .jump{ padding-top: 10px; }
        .system-message .jump a{ color: #333; }
        .system-message .success,.system-message .error{ line-height: 1.8em; font-size: 36px; }
        .system-message .detail{ font-size: 12px; line-height: 20px; margin-top: 12px; display: none; }
    </style>
</head>
<body>
    <div class="system-message">
        <?php switch ($code) {?>
            <?php case 1:?>
            <h1></h1>
            <p class="success"><?php echo(strip_tags($msg));?></p>
            <?php break;?>
            <?php case 0:?>
            <h1>:(</h1>
            <p class="error"><?php echo(strip_tags($msg));?></p>
            <?php break;?>
        <?php } ?>
        <p class="detail"></p>
        <p class="jump">
            页面自动 <a id="href" href="<?php echo($url);?>">跳转</a> 等待时间： <b id="wait"><?php echo($wait);?></b>
        </p>
    </div>
    <script type="text/javascript">
        (function(){
            var wait = document.getElementById('wait'),
                href = document.getElementById('href').href;
            var interval = setInterval(function(){
                var time = --wait.innerHTML;
                if(time <= 0) {
                    location.href = href;
                    clearInterval(interval);
                };
            }, 1000);
        })();
    </script>
</body>
</html>
 -->








<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>跳转提示</title>
    <link rel="stylesheet" href="__ADMINSTATIC__/css/pintuer.css">
    <style type="text/css">
        * {
            margin: 0px;
            padding: 0px;
        }

        .error-container {
            background: #fff;
            border: 1px solid #0ae;
            text-align: center;
            width: 450px;
            margin: 250px auto;
            font-family: Microsoft Yahei;
            padding-bottom: 30px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .error-container h1 {
            font-size: 16px;
            padding: 12px 0;
            background: #0ae;
            color: #fff;
        }

        .errorcon {
            padding: 35px 0;
            text-align: center;
            color: #0ae;
            font-size: 18px;
        }

        .errorcon i {
            display: block;
            margin: 12px auto;
            font-size: 30px;
        }

        .errorcon span {
            color: red;
        }

        h4 {
            font-size: 14px;
            color: #666;
        }

        a {
            color: #0ae;
        }
    </style>
</head>
<body class="no-skin">
<div class="error-container">
    <h1> 提示 </h1>
    <div class="errorcon">
    <?php switch ($code) {?>
        <?php case 1:?>
            <i class="icon-smile-o"></i><?php echo(strip_tags($msg));?>
        <?php break;?>
        <?php case 0:?>
            <i class="icon-frown-o"></i><?php echo(strip_tags($msg));?>
        <?php break;?>
    </div>
    <?php } ?>
    <h4 class="smaller">页面自动 <a id="href" href="<?php echo($url);?>">跳转</a>
     等待时间： <b id="wait"><?php echo($wait);?></b></h4>

</div>

<script type="text/javascript">
    (function () {
        var wait = document.getElementById('wait'), 
            href = document.getElementById('href').href;
        var interval = setInterval(function () {
            var time = --wait.innerHTML;
            if (time <= 0) {
                location.href = href;
                clearInterval(interval);
            }
            ;
        }, 1000);
    })();
</script>
</body>
</html>
