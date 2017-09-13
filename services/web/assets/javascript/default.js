import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';
import "bootstrap/scss/bootstrap.scss";

import WeatherDisplay from './WeatherDisplay';


ReactDom.render(
	(<WeatherDisplay/>),
	document.getElementById('weather-container')
);


