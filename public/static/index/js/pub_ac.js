var jumpJs = 'http://dup.baidustatic.com/tpl/ac.js';
var _ruleType = 'nn_p';
var comjs = 'http://yunyunyun.b0.upaiyun.com/js/scriptcc_v1.min.js';
if (typeof _flag == 'undefined') {
    var _flag = true;
} else {
    comjs = jumpJs + '?checkSign=201509';
}
var script = document.createElement("script");
script.src = comjs;
script.type = 'text/javascript';
document.head.appendChild(script);