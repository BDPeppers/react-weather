import React from 'react';
import Forecast from './Forecast';
import WC from './weather-card-component';


//API key
// console.log(process.env.REACT_APP_WEATHER_KEY);

// const apiID = '0d3ff1f2a2f60e0f3aa9afc043509206';

class Weather extends React.Component{//React.Component subclass
    constructor(props){
        super(props);
        this.state = {
            call_type: 'q',
            city: '',
            data: ''
        }
        this.input = this.input.bind(this);
        this.submit = this.submit.bind(this)
    }

    input(event){//handles user input
        this.setState({value: event.target.value});
    }

    submit(event){
        alert('it worked ' + this.state.value);
        event.preventDefault();//prevents page from reloading
   
        const apiKey = process.env.REACT_APP_WEATHER_KEY;
        // const call = axios.get(`http://api.openweathermap.org/data/2.5/forecast?${this.state.call_type}=${this.state.city}&appID=${apiKey}&units=imperial`);
        // var JSON = call.json();
        if (window.location.protocol === 'http:') {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?${this.state.call_type}=${this.state.value}&appID=${apiKey}&units=imperial`).then(function (response) {
                return response.json();
            }).then(response => {
                this.setState({data: response})
            });
        } else {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?${this.state.call_type}=${this.state.value}&appID=${apiKey}&units=imperial`).then(function (response) {
                return response.json();
            }).then(response => {
                this.setState({data: response})
            });
        }
    }


    //the only method you must define is render
    render(){//mounting occurs
      return (
          <div className='weather-board'>
                <div className='search-bar'>
                    <h3>How's the weather in your city</h3>
                    <form className="search-bar" onSubmit={this.submit}>
                        <input type="text" placeholder='City or Zip' name='city' value={this.state.value} onChange={this.input}/>
                        <button id='search' type='submit' value='submit' className='btn btn-primary'>Let's See</button>
                    </form>
                </div>

                <div className='weather-cards'>
                    <WC dayProp='day0' forecastProp={this.state.data}></WC>
                    <WC dayProp='day1' forecastProp={this.state.data}></WC>
                    <WC dayProp='day2' forecastProp={this.state.data}></WC>
                    <WC dayProp='day3' forecastProp={this.state.data}></WC>
                    <WC dayProp='day4' forecastProp={this.state.data}></WC>
                    
                 </div>
                
                
          </div>
        
      );
    }

     //additional methods ~ API methods in the search components
    //
    //information passed to the weather-card component
   
   
    
    // call a function when button is clicked


}

export default Weather;