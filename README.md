慕课网Webpack demo
===
Webpack官网：<http://webpack.github.io/docs/>
---
 ## Webpack作用
 将所需的模块切分到不同的代码库里，按需加载这些依赖，项目用到时才会打包相应依赖，使初始化加载数更少，
 整合第三方类库，视为模块，在项目里引用。
 1. 代码分割
 2. loader
 3. 插件
 4. 模块热更新


### 注：没有热更新，此案例可完成html，scss，图片，js打包，es5/es6模块化，适用于前后端分离项目

 ## webpack支持模块化方式
 AMD，CommonJS，ES6，require是CommonJS，打包后会换成webpack内置的webpack_require语句
 参考介绍资料 <http://www.jianshu.com/p/ee88e9849a1b>




  ## webpack命令：
  + --watch  //监听，实时更新
  + --progress   //显示打包过程，进度
  + --dispaly-modules         //打包模块
  + --display-reasons        //打包原因
  + --webpack      //打包

  ## 配置
   ### 1. entry
  + 字符串
 ```
 entry:'./main.js'
 ```
  + 数组，互相平行
  ```
  entry:['./main.js','./app.js']

  ```
  + 对象
  ```
  entry:{
  'main':'./main.js',
 'app':'./app.js'
  }
  ```
  对应的output：
  ```
  output:{
  path:__dirname+'/dist/js';
  filename:'[name].js';//name为占位符，这样，entry里js各自打包，打包后文件名为对象的属性值
  }
  ```



  ###  2. plugins
  webpack支持js打包，对应html打包压缩，需要借助于插件html-webpack-plugin
  网站：<https://www.npmjs.com/package/html-webpack-plugin>
  详见工程 ./webpackProject
  ### 3. loaders
  处理webpack不支持的资源文件（css，图片，coffeejavascript）参考webpack3/
  将内容打包到js中
   #### css
   对css打包，需要<strong>css-loader</strong>,让打包后的css渲染到页面需要<strong>style-loader</strong>（将css插入到\<style\>标签内，放在header里）
对浏览器不完全兼容的css，可安装包<strong>postcss-loader</strong>,对css后处理，再安装<strong>autoprefixer</strong>,自动加浏览器前缀  参考：<https://www.npmjs.com/package/postcss-loader>
postcss-loader功能很强大，可以对less,sass处理
#### less
 安装<strong>less-loader</strong>,在postcss-loader前处理
####    html
用html-loader，把html打包为字符串
 #### babel-loadel
 es6-es5
 指定解析版本给loader传参方法，
 1. 在loader名加?接字符串，
 2. query里写
3. use里加options写，
 4. packjson里写

 #### 模板文件 .tpl
 .ejs   安装ejs-loader ,.ejs可直接写为.tpl
 .jsx    vue/React,babel可支持.jsx文件，不用引用loader处理
 #### 图片
 + 安装   file-loader    css/less/scss引用图片，html引用（相对路径）可以转换，组件模板里相对路径图片要用${require()}才能转换  --http请求加载出来，可被浏览器缓存，第二次载入快
 + 安装 url-loader    与file-loader类似，不同：处理文件/图片，设置一个值，大于该值交给file-loader,小于就把url处理为base64编码，即把图片信息编码加入引用的jcss,html里，--编码得到，不用http请求，代码冗余，
 + 安装img-loader,与url/file一起使用，压缩图片//未实现



 ## 问题
 1. 在webpack.config.js里配置libraryTarget:'amd'，只能在node里用，浏览器会报错，define is not defined
 2. 对于：webpack2，webpack.config.js里输出的path要绝对路径，webpack1可以是相对路径
                 <http://www.cnblogs.com/dh-dh/p/5165372.html>
    注意_ _dirname:当前项目的位置
 3. Cannot find module 'webpack/lib/node/NodeTemplatePlugin'
             是因为全局安装webpack,导致的。
              解决方法：可以在本项目中安装，npm install webpack
 4.  Module build failed: Error: No PostCSS Config found in:     C:\myProject\webpack3\src\components\layer
 解决：根目录下建立postcss.config.js文件，里面写
 module.exports={};

 ## webpack与gulp区别：
gulp强调自动化流程，有很多包，支持压缩，转义，监听，es5自动化流程；
webpack里支持将es6转为es5，更注重模块化开发，用到才打包，代码分块，es6比如vue，react小应用可单用webpack
但es6大项目两者结合起来用方便