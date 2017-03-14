var path = require('path');
var webpack = require("webpack");
var CleanWebpackPlugin = require('clean-webpack-plugin'); //删除文件插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css抽取插件
var autoprefixer = require('autoprefixer');
var pages = require('./pages.config');

var config = {
	entry:  {
		/*index:path.resolve(__dirname, '../src/index/index.js'),*/
		/*vendors:['jquery']*/
		commons:[path.resolve(__dirname, '../src/utils/jquery-1.8.3.js')]
	},
	output: {
		path: path.resolve(__dirname, '../target/static/js'),
		publicPath: 'static/js',
		filename: '[name].[hash].js',
	},
    module: {
	    loaders: [
	      {
	        test: /\.(css|less)$/,
	        loader: ExtractTextPlugin.extract({
	          fallback: 'style-loader',
	          use: "css-loader!less-loader!postcss-loader"
	        })
	      },
	      {
	        test: /\.(png|jpg|gif|svg)$/,
	        loader: 'url-loader',
	        options: {
	          limit: 10000,
	          name: '[name].[ext]?[hash]'
	        }
	      }
	    ]
	},
	
	plugins:[
		/*new webpack.ProvidePlugin({
		  $:"jquery",
		  jQuery:"jquery",
		  "window.jQuery":"jquery"
		}),*/
		// 删除文件
		new CleanWebpackPlugin(['target'], {
            root: path.resolve(__dirname,"../"),
            verbose: true,
            dry: false,
        }),
		//抽取公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons.js',
		}),

		// 提取css文件
	    new ExtractTextPlugin("../css/[name].[hash].css"),

	    // 自动添加样式前缀
	    new webpack.LoaderOptionsPlugin({
         options: {
           postcss:[
		    autoprefixer({
		      browsers: ['last 5 versions', 'ie >= 9', 'ie_mob >= 10',
		        'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 12.1',
		        'ios >= 8', 'android >= 4.4', 'bb >= 10', 'and_uc >= 9.9']
		    })
		   ],

		   
         }
        }),

	    /*//生成网页
        new HtmlWebpackPlugin({
            filename: '../../index.html',
            template: path.resolve(__dirname, '../src/index/index.html'),
            inject: true
        })*/
	]
};

pages.forEach((page) => {
  config.entry[page] = path.resolve(__dirname, '../src/'+page+'/entry.js');

  const htmlPlugin = new HtmlWebpackPlugin({
    filename: '../../'+page+'.html',
    template: path.resolve(__dirname, '../src/'+page+'/page.html'),
    chunks: [page, 'commons'],
    inject: true
  });
  config.plugins.push(htmlPlugin);
});

module.exports = config;