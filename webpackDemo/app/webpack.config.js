/**
 * Created by wtw on 2017/10/27.
 */
module.exports = {
    entry:{
        'app':'./main.js',
        'app.components':'./components.js'
    },
    output: {
        filename:'[name].js',
        library:'app'
       // libraryTarget:'amd'
    },
    watch:true,

    module:{
        loaders:[{
            test:/\.css$/,
            loaders:['style-loader','css-loader']
        }]//使webpack处理css打包
    }









};
