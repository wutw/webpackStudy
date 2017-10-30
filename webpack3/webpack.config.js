/**
 * Created by wtw on 2017/10/28.
 */
var htmlWebpackPlugins = require('html-webpack-plugin');
var path = require('path');//node原生的api，loaders解析路径

module.exports = {
    context:__dirname ,
    entry:'./src/app.js',
    output:{
        path:__dirname+'/dist/js',//js
      //  path:path.resolve(__dirname,'dist/js'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,//需匹配的正则表达式

             //   exclude:__dirname+'./node_modules/',//指定排除范围，不用打包,引用npm里安装的包，会优化速度
                exclude:path.resolve(__dirname,'node_modules'),//resolve表解析，把node_modules解析为绝对路径
                include:path.resolve(__dirname,'src'),//指定打包范围，优化速度
               /* loader:'babel-loader',//loader插件
                query:{
                    presets:['es2015']//babel转化的es类型，给loader传参，
                }*/
                use:[
                    {
                       loader:'babel-loader' ,
                        options:{
                            presets:['es2015']
                        }

                    }]

            },{
                test:/\.css$/,
                exclude:path.resolve(__dirname,'node_modules'),//resolve表解析，把node_modules解析为绝对路径
                include:path.resolve(__dirname,'src'),//指定打包范围，优化速度
                use:[//参考postcss-loader  api，引入autoprefixer插件,从下往上运行

                   /* {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader',
                        options:{importLoaders:'1'}

                    },*/
                    'style-loader',
                    'css-loader?importLoaders=1',//简写?后面可以直接写参数，表示允许css处理1个import进来的css，即调用postcss-loader,也可以在option里写
                    {
                        loader:'postcss-loader',//loader可串联,post-loader是对css后处理

                        options:{
                            ident:'postcss',
                            plugins:(loader)=>[
                                require('autoprefixer')({
                                    broswers:'last 5 versions'
                                })//对css自动加进行浏览器前缀
                            ]
                        }
                    }


                ]


            },
            {//less文件，sass与其相同
                exclude:path.resolve(__dirname,'node_modules'),//resolve表解析，把node_modules解析为绝对路径
                include:path.resolve(__dirname,'src'),//指定打包范围，优化速度
                test:/\.less$/,
                use:[//参考postcss-loader  api，引入autoprefixer插件,从下往上运行

                    /* {
                     loader:'style-loader'
                     },
                     {
                     loader:'css-loader'

                     },*/
                    'style-loader',
                    'css-loader',//less文件import其它文件，不用写importLoaders=1，可以自动识别
                    {
                        loader:'postcss-loader',//loader可串联,post-loader是对css后处理

                        options:{
                            ident:'postcss',
                            plugins:(loader)=>[
                                require('autoprefixer')({
                                    broswers:'last 5 versions'
                                })//对css自动加进行浏览器前缀
                            ]
                        }
                    },
                    'less-loader'


                ]
            },
            {
                test:/\.html$/,
                loader:'html-loader'

            },
            {
                test:/\.tpl/,
                loader:'ejs-loader'
            },
            /*{
                test:/\.(png|jpg|gif|svg)/i,
                loader:'file-loader',
                query:{
                    name:'assets/[name]-[hash:5].[ext]'//打包后文件名，占位符name，5位hash，还有后缀名
                }
            }*/
            {
                test:/\.(png|jpg|gif|svg)/i,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            limit:20000,//20k
                            name:'assets/[name]-[hash:5].[ext]'//打包后文件名，占位符name，5位hash，还有后缀名

                        }

                    }

                      /*  'image-webpack-loader?bypassOnDebug'*///打包不了




                ]
               /* loaders:[//从右到左
                    'url-loader?limit=20000&name=assets/[name]-[hash:5].[ext]',
                    'image-webpack-loader'
                ]*/
               /* query:{//与options作用相同
                    limit:20000,//20k
                    name:'assets/[name]-[hash:5].[ext]'//打包后文件名，占位符name，5位hash，还有后缀名
                }*/
            }
        ]
    },

    plugins:[
        new htmlWebpackPlugins({
            filename:'index.html',
            template:'index.html',
            inject:'body',

        })
    ]

};