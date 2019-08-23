import React from 'react';
import um from '../pics/thinking.svg';
import greet from 'greeting-time';
import WC from './weather-card-component';

class Weather extends React.Component{//React.Component subclass
    constructor(props){
        super(props);
        this.state = {//initial states
            call_type: '',
            city: '',
            data: '',
            Wdisplay: 'none',
            Edisplay: 'none',
            Hdisplay: ''
        }
        this.input = this.input.bind(this);
        this.submit = this.submit.bind(this)
    }

    input(event){//handles user input
        this.setState({value: event.target.value});
        this.city_zip(event.target.value);
    }

    city_zip(location){
         //search by zip code
        if (location.length === 5 && Number.parseInt(location) + '' === location) {
            this.setState({call_type: 'zip'});
        } else { //call by city
            this.setState({call_type: 'q'});
        }
    }

    submit(event){
        event.preventDefault();//prevents page from reloading
   
        const apiKey = process.env.REACT_APP_WEATHER_KEY;
        // const call = axios.get(`http://api.openweathermap.org/data/2.5/forecast?${this.state.call_type}=${this.state.city}&appID=${apiKey}&units=imperial`);
        // var JSON = call.json();
        if (window.location.protocol === 'http:') {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?${this.state.call_type}=${this.state.value}&appID=${apiKey}&units=imperial`).then(function (response) {
                return response.json();
            }).then(response => {
                if(response.cod !== '200'){
                    console.log(response);
                    this.setState({
                        city: this.state.value, 
                        Edisplay: '',
                        Wdisplay: 'none',
                        Hdisplay: 'none'

                    })
                }else{
                    this.setState({
                        data: response,
                        Edisplay: 'none',
                        Wdisplay: '',
                        Hdisplay: 'none'
                    })
                }
            });
        } else {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?${this.state.call_type}=${this.state.value}&appID=${apiKey}&units=imperial`).then(function (response) {
                return response.json();
            }).then(response => {
                if(response.cod !== '200'){
                    console.log(response);
                    this.setState({
                        city: this.state.value, 
                        Edisplay: '',
                        Wdisplay: 'none',
                        Hdisplay: 'none'
                    })
                }else{
                    this.setState({
                        data: response,
                        Edisplay: 'none',
                        Wdisplay: '',
                        Hdisplay: 'none'
                    })
                }
            });
        }
    }
    //the only method you must define is render
    render(){//mounting occurs
      return (
          <div className='weather-board'>
                <div className='search-bar'>
                    <form className="search-bar" onSubmit={this.submit}>
                        <input type="text" placeholder='City or Zip' name='city' value={this.state.value} onChange={this.input}/>
                        <button id='search' type='submit' value='submit' className='btn btn-primary'>Let's See</button>
                    </form>
                </div>

                <div className='weather-cards'>
                    <Hello styleProp={this.state.Hdisplay}/>
                    <WC dayProp='day0' forecastProp={this.state.data} styleProp={this.state.Wdisplay}/>
                    <WC dayProp='day1' forecastProp={this.state.data} styleProp={this.state.Wdisplay}/>
                    <WC dayProp='day2' forecastProp={this.state.data} styleProp={this.state.Wdisplay}/>
                    <WC dayProp='day3' forecastProp={this.state.data} styleProp={this.state.Wdisplay}/>
                    <WC dayProp='day4' forecastProp={this.state.data} styleProp={this.state.Wdisplay}/>
                    <Hmm locationProps={this.state.city} styleProp={this.state.Edisplay}/>
                 </div>
          </div>
        
      );
    }

}//end weather class

class Hmm extends React.Component{
    render(){
        return(
            <div className="error-box" style={{display: (this.props.styleProp)}}>
                <h1>{this.props.locationProps}?</h1>
                <h1>{this.props.styleProp}</h1>
                <img className="face" src={um} alt="confused"/>
            </div> 
        )
    }
}//end Hmm class

class Hello extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            greeting: greet(new Date())
        }
    }
    componentDidMount(){//updating greeting every 30min
        setInterval( () => {
            this.setState({
              greeting: greet(new Date())
            })
          },1800000 )
    }
    render(){
        return(
            <h1 className='greeting' style={{display: (this.props.styleProp)}}>{this.state.greeting}</h1>
        );
    }

}




export default Weather;