"use strict";

const express = require('express');
const logger = require('morgan');
const path = require('path');

const webpack = require('webpack');


const app = express();

app.use(logger('dev'));


if (process.env.NODE_ENV !== 'production') {
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackConfig = require('./webpack.config');
	const compiler = webpack(webpackConfig);
	const webpackHotMiddleware = require('webpack-hot-middleware');
	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {colors: true}
	}));
	app.use(webpackHotMiddleware(compiler, {
		log: console.log
	}));
} else {
	/*const webpackConfig = require('./webpack.prod');
	const compiler = webpack(webpackConfig);
	app.use(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {colors: true}
	});*/
}

/*
app.get('/', (req, res) => {
	
});*/
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Web listening on port ${PORT}`);
});
