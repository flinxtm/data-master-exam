import React from 'react'

import 'bootstrap/dist/css/bootstrap.css'

import DataMasterExam from './DataMasterExam'

function App() {
	return (
		<div className='container'>
			<div className='jumbotron'>
				<h1 className='display-4'>Data Master Exam</h1>
			</div>
			<DataMasterExam />
		</div>
	)
}

export default App
