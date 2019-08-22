import React from 'react';
import WC from './weather-card-component';

class Forecast extends React.Component{//React.Component subclass
    //the only method you must define is render
    render(){
      return (
       <div className="weather-board">
          <div className='weather-cards'>
              <WC dayProp='day0'></WC>
              <WC dayProp='day1'></WC>
              <WC dayProp='day2'></WC>
              <WC dayProp='day3'></WC>
              <WC dayProp='day4'></WC>
          </div>
        </div>
      );
    }

  //parsing weather forecast data
  //parsing temp and weather icon for each day
    


}

export default Forecast;