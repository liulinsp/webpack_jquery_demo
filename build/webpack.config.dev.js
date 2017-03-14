var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css抽取插件
var pages = require('./pages.config');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';

config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // 提取css文件
	new ExtractTextPlugin("./css/[name].[hash].css"),
    // 自动添加样式前缀
    new webpack.LoaderOptionsPlugin({
     options: {
       postcss:[
	    autoprefixer({
	      browsers: ['last 5 versions', 'ie >= 9', 'ie_mob >= 10',
	        'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 12.1',
	        'ios >= 8', 'android >= 4.4', 'bb >= 10', 'and_uc >= 9.9']
	    })
	   ]
     }
    }),
];

/*pages.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: '/'+page+'.html',
    template: path.resolve(__dirname, '../src/'+page+'/page.html'),
    chunks: [page, 'commons'],
    inject: true
  });
  config.plugins.push(htmlPlugin);
});*/
pages.forEach((page) => {
  console.log(path.resolve(__dirname, '../src/'+page+'/page.html'));
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: './'+page+'.html',
    template: path.resolve(__dirname, '../src/'+page+'/page.html'),
    chunks: [page, 'commons'],
    inject: true
  });
  config.plugins.push(htmlPlugin);
});

// 动态向入口配置中注入 webpack-hot-middleware/client
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
});

module.exports = config;