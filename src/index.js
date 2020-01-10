import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.sass';


//importing components
import Header from './components/header';
import Weather from './components/weather';
//rendering components
//header
ReactDOM.render(<Header/>, document.getElementById('hello'));
//Weather board
ReactDOM.render(<Weather/>, document.getElementById('app'));

