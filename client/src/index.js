/* eslint-disable no-unused-vars*/
import React from 'react'
import App from './js/App.jsx'
/* eslint-enable no-unused-vars*/

import ReactDOM from 'react-dom'
import API_URL from './config.js'

const element = <App name='encoding client woo woo' api-url={ API_URL } />

logVersion()

ReactDOM.render(element, document.getElementById('root'))

function logVersion() {
	fetch(`${API_URL}/api/version`)
		.then(function(response) {
			return response.json()
		})
		.then(function(myJson) {
			console.log(JSON.stringify(myJson))
		})
		.catch(err =>
			console.log(`Error Pinging Server\n ${JSON.stringify(err, undefined, 4)}`)
		)

}