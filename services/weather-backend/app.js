"use strict";

const express = require('express');
const app = express();

const logger = require('morgan');

const fetch = require('node-fetch');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', false);
	next();
});

app.use(logger('dev'));


app.get('/api/v1/forecast', (req, res) => {
	fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${req.query.zip}&appid=f0de56345b0178a94e47640203ebd478&units=imperial`)
		.then(data => {
			data.json().then(json => {
				if (json.cod === '404') {
					res.json({result:'fail'})
					return;
				}
				const response = {};
				const result = [];
				response.days = result;
				response.result = 'success';
				let prevDay, dayTemp;
				for (const temp of json.list) {
					const date = new Date();
					date.setTime(temp.dt * 1000);
					if (!prevDay || prevDay !== date.getDate()) {
						prevDay = date.getDate();
						dayTemp = [];
						result.push(dayTemp);
					}
					dayTemp.push({
						dt: temp.dt,
						temp: temp.main.temp
					});
				}
				response.cityName = json.city.name;
				res.json(response);
			})
			.catch(e => {
				res.json({result:'fail'})
			})
		})
		.catch(e => {
			res.json({result:'fail'})
		});
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(`Weather Backend listening on port ${PORT}`);
});
