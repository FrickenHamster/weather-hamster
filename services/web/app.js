"use strict";

const express = require('express');
const logger = require('morgan');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require ('webpack-dev-middleware');
const webpackHotMiddleware = require ('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();

app.use(logger('dev'));

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {colors: true}
}));
app.use(webpackHotMiddleware(compiler, {
	log: console.log
}));

/*
app.get('/', (req, res) => {
	
});*/
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3001, () => {
	console.log('Weather Backend listening on port 3001');
});
