import React from 'react';
import ReactDOM from 'react-dom';

// Importing CSS files
import './index.css';

// Importing components
import App from './App';
import FacebookButton from './components/facebookButton';

console.log("Running index.js");

// console.log("FB is: ", FB);

ReactDOM.render(<FacebookButton/>, document.getElementById('root'));
