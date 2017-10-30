/**
 * Created by wtw on 2017/10/28.
 */
import Layer from './components/layer/layer.js';
import './css/common.css';//每个文件看作一个模块，可以打包进来

const  App = function(){

    var dom = document.getElementById('app');
    var layer = new Layer();
    dom.innerHTML = layer.tpl({
        name:'john',
        arr:['a','b']

    });

};
new App();