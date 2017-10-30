/**
 * Created by wtw on 2017/10/27.
 */
var htmlWebpackPlugin = require('html-webpack-plugin');
//多文件html，js打包
module.exports = {
    context:__dirname ,//上下文环境默认值，运行脚本的目录
    entry:{
        'main':'./src/script/main.js',
        'a':'./src/script/a.js',
        'b':'./src/script/b.js',
        'c':'./src/script/c.js'
    },
    output:{
        path:__dirname+'/dist',//js
        filename:'js/[name].js',//html会到path制定目录，js文件到filename指定的js目录
       /* publicPath:'http://cdn.com'//占位符，上线时会把js路径path替换为publicPath路径*/
    },
    plugins:[//数组，重复调用对象htmlWebpackPlugin实现多页面html
        new htmlWebpackPlugin({//打包html文件，使得多个转换后js自动生成到html里引用
            filename:'a.html',//生成文件名,在path路径下
            template:'index.html',//使得根目录(context配置)下html复制到转换后html
            /*inject:'head',//<script>嵌入到<head>里*/
            inject:'body',
            title:'a',//通过根目录index.html模板语言获取，可引用
            date:new Date(),//模板可获取时间,
           /* minify:{//打包html
                removeComments:true,//删除注释
                collapseWhitespace:true,//删除空格

            }*/
           // chunks:['main','a']//数组，指定要生成的html里需引用的js，引用时将根目录对应html里scipt标签删干净
            excludeChunks:['b']//指定忽略的js
        }),
        new htmlWebpackPlugin({//打包html文件，使得多个转换后js自动生成到html里引用
            filename:'b.html',//生成文件名
            template:'index.html',//使得根目录(context配置)下html复制到转换后html
            /*inject:'head',//<script>嵌入到<head>里*/
            inject:'body',
            title:'b',//通过根目录index.html模板语言获取，可引用
            date:new Date(),//模板可获取时间,
           /* minify:{//打包html
                removeComments:true,//删除注释
                collapseWhitespace:true,//删除空格

            }*/
            chunks:['main','b']//引用时将根目录对应html里scipt标签删干净
        }),
        new htmlWebpackPlugin({//打包html文件，使得多个转换后js自动生成到html里引用
            filename:'c.html',//生成文件名
            template:'index.html',//使得根目录(context配置)下html复制到转换后html
            /*inject:'head',//<script>嵌入到<head>里*/
            inject:'body',
            title:'c',//通过根目录index.html模板语言获取，可引用
            date:new Date(),//模板可获取时间,
            /*minify:{//打包html
                removeComments:true,//删除注释
                collapseWhitespace:true,//删除空格

            }*/
            chunks:['main','c']//数组，指定要生成的html里需引用的js
        })


    ]
};