var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, './public')
	},
	devtool: 'cheap-module-source-map',
	resolve: {
		alias: {
			src: path.resolve('./src')
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				exclude: /node_modules/,
			},{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{ loader: 'css-loader', options: { importLoaders: 1 } },
					'less-loader']
				})
			},{
				test: /\.hbs$/, 
				loader: "handlebars-loader"
			},{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			}, {
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			}, {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/octet-stream"
			}, {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader"
			}, {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=image/svg+xml"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("app.css"),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new webpack.ProvidePlugin({
			_: "underscore",
		}),
		new webpack.ProvidePlugin({
			Bb: "backbone",
		}),
		new webpack.ProvidePlugin({
			Mn: "backbone.marionette",
		})
	]
};
