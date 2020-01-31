import React from 'react'

import Order from './Order'

class OrderList extends React.Component {
	state = {
		openOrderId: null,
		error: null,
		isLoaded: false,
		details: []
	}

	handleClick(openOrderId) {
		if (this.state.openOrderId !== openOrderId) {
			fetch(`http://127.0.0.1:8080/api/order/${openOrderId}`)
				.then(response => response.json())
				.then(
					json => {
						this.setState({
							isLoaded: true,
							details: json
						})
					},
					error => {
						this.setState({
							isLoaded: true,
							error
						})
					}
				)
		} else {
			this.setState({
				isLoaded: true,
				details: []
			})
		}
		this.setState({
			openOrderId:
				this.state.openOrderId === openOrderId ? null : openOrderId
		})
	}

	componentWillReceiveProps(newProps) {
		if (newProps.orders !== this.props.orders) {
			this.setState({
				openOrderId: null
			})
		}
	}

	render() {
		const { orders } = this.props
		const orderFetchState = {
			error: this.state.error,
			isLoaded: this.state.isLoaded,
			details: this.state.details
		}
		return (
			<div>
				<ul className='ul-orders'>
					{orders.map(order => (
						<li key={order.id} className='li-orders'>
							<Order
								order={order}
								orderFetchState={orderFetchState}
								isOpen={this.state.openOrderId === order.id}
								onButtonClick={this.handleClick.bind(
									this,
									order.id
								)}
							/>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default OrderList
