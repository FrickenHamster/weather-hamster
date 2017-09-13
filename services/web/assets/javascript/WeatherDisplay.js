import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';

export default class WeatherDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.fetchData = this.fetchData.bind(this);
		this.handleZipChange = this.handleZipChange.bind(this);
	}

	fetchData() {
		if (!this.state.zip || this.state.zip.length < 5)
			return;
		fetch(`http://127.0.0.1:3000?zip=${this.state.zip}`, {
			method: 'get',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
		}).then(
			data => {
				data.json().then(json => {
					if (json.result === 'fail') {
						this.setState({message: 'Error getting weather'});
						return;
					}
					const temps = [];
					for (const dayTemp of json.days) {
						let minTemp = -1;
						let maxTemp = -1;
						for (const temp of dayTemp) {
							if (minTemp === -1 || temp.temp < minTemp) {
								minTemp = temp.temp;
							}
							if (maxTemp === -1 || temp.temp > maxTemp) {
								maxTemp = temp.temp;
							}
						}
						temps.push({
							dt: dayTemp[0].dt,
							maxTemp,
							minTemp
						});
					}
					this.setState({days: temps, cityName: json.cityName});
				})
			}
		)
			.catch(e => {
				this.setState({message: 'Could not connect to service'});
			})
	}

	handleZipChange(e) {
		this.setState({zip: e.target.value})
	}

	render() {
		if (this.state.days) {
			const days = [];
			for (let i = 0; i < this.state.days.length; i++) {
				const dayTemp = this.state.days[i];
				days.push(
					<WeatherDay
						key={i}
						dt={dayTemp.dt}
						minTemp={dayTemp.minTemp}
						maxTemp={dayTemp.maxTemp}
					/>);
			}
			return (
				<div className={"days-container border-around p-2 "}>
					<h3 className={'text-center'}>Weather Forecast for {this.state.cityName}</h3>
					<div className='d-flex flex-row flex-wrap justify-content-center'>
						{days}
					</div>
				</div>
			)
		}
		else {
			let message = null;
			if (this.state.message)
				message = (<div className={'center-text'}>{this.state.message}</div>);
			return (
				<div className={"days-container border-around p-2 "}>
					{message}
					<div className='d-flex flex-row flex-wrap justify-content-center'>
						<div className={'zip-input m-4'}>
							<FormControl
								placeholder="Zip Code"
								onChange={this.handleZipChange}
								maxLength={5}
							/>
						</div>
						<Button
							onClick={this.fetchData}
						>
							Fetch
						</Button>
					</div>
				</div>
			)
		}

	}

}

const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class WeatherDay extends Component {
	render() {
		const date = new Date();
		date.setTime(this.props.dt * 1000);
		const dayOfWeek = Days[date.getDay()];
		return (
			<div>
				<div className={"day-container border-around d-flex flex-column justify-content-center"}>
					<h4 className={"text-center"}>{dayOfWeek}</h4>
					<h4 className={"text-center"}>{this.props.minTemp} / {this.props.maxTemp}</h4>
				</div>
			</div>);
	}
}
