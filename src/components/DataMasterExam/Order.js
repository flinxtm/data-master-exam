import React from 'react'

import Loader from './Loader'

class Order extends React.Component {
	render() {
		const { order, orderFetchState, isOpen, onButtonClick } = this.props
		const { error, isLoaded, details } = orderFetchState
		const table = (error && <div>Ошибка: {error.message}</div>) ||
			(!isLoaded && <Loader />) || (
				<table className='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>name</th>
							<th scope='col'>price</th>
							<th scope='col'>qty</th>
							<th scope='col'>sum</th>
						</tr>
					</thead>
					<tbody>
						{details.map(item => (
							<tr key={item.id}>
								<th scope='row'>{item.id}</th>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td>{item.qty}</td>
								<td>{item.sum}</td>
							</tr>
						))}
					</tbody>
				</table>
			)
		const body = isOpen && <section className='card-text'>{table}</section>
		return (
			<div className='card border-info' style={{ width: '100%' }}>
				<div className='card-header bg-transparent border-info'>
					<h4 className='justify-content-between'>
						{order.docNum}, {order.docDate}, {order.description}
						<button
							onClick={onButtonClick}
							className='btn btn-outline-info float-right'
							style={{ height: '100%' }}
						>
							{isOpen ? 'close' : 'details'}
						</button>
					</h4>
				</div>
				{body}
			</div>
		)
	}
}

export default Order
