import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';


//importing components
import Header from './components/header';
import Weather from './components/weather';
//rendering components
//header
ReactDOM.render(<Header/>, document.getElementById('hello'));
//Weather board
ReactDOM.render(<Weather/>, document.getElementById('app'));

