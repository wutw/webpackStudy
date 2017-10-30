/**
 * Created by wtw on 2017/10/27.
 */
require('./mymodule.js');
require('./style.css');
//require('style-loader!css-loader!./style.css');//没有配置时，直接输出

function hello(str){
    alert(str);
}
hello('wtw');