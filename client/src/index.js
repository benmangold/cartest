import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/App.jsx';

const element = <App name='encoding client woo woo' />;

// logVersion()

ReactDOM.render(element, document.getElementById('root'));

function logVersion() {
  fetch('http://127.0.0.1:80/api/version')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    })
    .catch(err =>
      console.log(`Error Pinging Server\n ${JSON.stringify(err, undefined, 4)}`)
    );

}