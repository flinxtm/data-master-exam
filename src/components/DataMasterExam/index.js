import React from 'react'

import './style.css'

import Loader from './Loader'
import OrderList from './OrderList'

class DataMasterExam extends React.Component {
	state = {
		error: null,
		isLoaded: false,
		orders: []
	}

	getOrders = event => {
		const filter = event
			? '?filter=' + event.target.value.substr(0, 10)
			: ''
		fetch(`http://127.0.0.1:8080/api/order${filter}`)
			.then(response => response.json())
			.then(
				json => {
					this.setState({
						isLoaded: true,
						orders: json
					})
				},
				error => {
					this.setState({
						isLoaded: true,
						error
					})
				}
			)
	}

	componentDidMount() {
		this.getOrders()
	}

	render() {
		const { error, isLoaded, orders } = this.state
		const body = (error && <div>Ошибка: {error.message}</div>) ||
			(!isLoaded && <Loader />) || <OrderList orders={orders} />
		return (
			<div>
				<div class='input-group mb-3'>
					<div class='input-group-prepend'>
						<span class='input-group-text' id='basic-addon3'>
							Orders Search:
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						id='filter'
						aria-describedby='basic-addon3'
						onChange={this.getOrders.bind(this)}
					/>
				</div>
				{body}
			</div>
		)
	}
}

export default DataMasterExam
