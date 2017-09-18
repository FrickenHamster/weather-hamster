const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		default: [
			'./assets/javascript/default.js',
			'./assets/styles/index.scss'
		],
	},
	output: {
		path: path.resolve('public/'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{test: /\.scss/, loaders: 'style-loader!css-loader!sass-loader'},
			/*{test: /\.scss/, use: ExtractTextPlugin.extract([
				{loader: 'css-loader'},
				{loader: 'sass-loader'}
			])},*/
			//{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader!css-loader', 'css-loader')},//'style-loader!css-loader'},
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			"window.jQuery": "jquery",
			Tether: "tether",
			Popper: ['popper.js', 'default'],
			Util: "exports-loader?Util!bootstrap/js/dist/util",
			Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
		})/*,
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: false,
			allChunks: true,
		})*/
	]
};
