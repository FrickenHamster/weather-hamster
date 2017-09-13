const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = [
	{
		loader: 'css-loader',
		options: {
			modules: true
		}
	},
	{
		loader: 'postcss-loader'
	},
	{
		loader: 'sass-loader'
	}
]

module.exports = {
	entry: {
		default: [
			'webpack/hot/dev-server',
			'webpack-hot-middleware/client',
			'./assets/javascript/default.js',
			'./assets/styles/index.scss'
		],
	},
	output: {
		path: '/',//path.resolve('public/javascripts'),
		filename: '[name].js'
	},
	module: {
		rules: [
			//{test: /\.scss/, loaders: 'style-loader!css-loader!sass-loader'},
			{test: /\.scss/, use: ExtractTextPlugin.extract([
				{loader: 'css-loader', options: {sourceMap:true}},
				{loader: 'sass-loader', options: {sourceMap:true}}
			])},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader!css-loader', 'css-loader')},//'style-loader!css-loader'},
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
			/*{
				test: /\.png$/,
				loader: 'url-loader?limit=100000'
			},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }*/
		]
	},
	devtool: 'source-map',
	devServer: {
		contentBase: "./src/www",
		noInfo: true,
		hot: true,
		inline: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			"window.jQuery": "jquery",
			Tether: "tether",
			Popper: ['popper.js', 'default'],
			Util: "exports-loader?Util!bootstrap/js/dist/util",
			Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: false,
			allChunks: true,
		})
	]
};
