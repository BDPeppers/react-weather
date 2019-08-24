import React from 'react';
import greet from 'greeting-time';

//weather icons
import rainy from '../pics/rainy.svg';
import cDay from '../pics/clear-day.svg';
import cNight from '../pics/clear-night.svg';
import cloudyD from '../pics/cloudy-day.svg';
import cloudyN from '../pics/cloudy-night.svg';
import snowy from '../pics/snowy.svg';
import thunder from '../pics/thunder.svg';
// import { rainy, cDay, cNight, cloudyD, cloudyN, tStorm, snow} from '../components/icon';

//a component is an independent, reusable cod block
  //divides the UI into smaller pieces ~ lego blocks

//the simplest way to define a component is to write a function
//use a function over a class if the component doesn't do much
//if components need more functionality like keeping states use a class
  //state = part of an app that can change

//function = stateless components
//class = stateful components

class WC extends React.Component{//React.Component subclass
  //the only method you must define is render
  
  render(){
    return (
      <div className="weather-card" style={{display: (this.props.styleProp)}}>
        <h1>{this.getWeekDay(this.props.dayProp)}</h1>
         <h2 class="date" id="day">{this.getDate(this.props.dayProp)}</h2>
            <div class="icon">
               <span className="weather-icon"></span>
            </div>
            <div class="temp">
                <div class="temperature"><span>Temp:</span>{this.setTemp(this.props.dayProp, this.props.forecastProp)}<span>°</span></div>
            </div>
               <div class="icon">
                  <img src={this.setIcon(this.props.dayProp, this.props.forecastProp)} alt="weather icon"/>
            </div>
      </div>
    );
  }
  //additional methods
  getDate(dayNum){//returns the date
    //expected input: day0, day1, day2,....day4
    var day = parseInt(dayNum.substring(3,4), 10);
    var today = new Date();
    var daily = this.addDays(today,day);

    return (daily.getMonth()+1) + "/" + (daily.getDate());
    // getMonth is 0 based indexing
  }

  getWeekDay(dayNum){//returns the day of the week
    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    var day = parseInt(dayNum.substring(3,4), 10);//day0, day1,...
    var today = new Date();
    var daily = this.addDays(today,day);
    var x = daily.getDay();

    return days[x];
  }

  addDays(date, days){//for daily increment
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  setIcon(day,json){//change weather icons
    if(!(json.length < 1 )){
      var item = 0;
      var daily = this.addDays(new Date(), parseInt(day.substring(3,4), 10))
      var format = this.dateString(daily)
      
       //day increment
       while (json.list[item].dt_txt.substring(0, 10).valueOf() === format) {
        item++;
       }
      var weather = json.list[item].weather[0].main;
      var icon;
      switch(weather){
          case 'Clear':
            if( greet(new Date()) === 'Good evening' ){
              icon = cNight;
            }else{
              icon = cDay;
            }
            break;
  
          case 'Clouds':
              if( greet(new Date()) === 'Good evening' ){
                icon = cloudyN;
              }else{
                icon = cloudyD;
              }
              break;
          
          case 'Rain':
          case 'Drizzle':
          case 'Mist':
            icon = rainy;
            break;
          
          case 'Thunderstorm':
            icon = thunder;
            break;
  
          case 'Snow':
            icon = snowy;
            break;
  
          default:
            break;
      }
          return icon;
    }     
  }

  setTemp(day, json){//set temperature
      if(!(json.length < 1 )){
        var item = 0;
        var daily = this.addDays(new Date(), parseInt(day.substring(3,4), 10))
        var format = this.dateString(daily)
        
         //day increment
         while (json.list[item].dt_txt.substring(0, 10).valueOf() === format) {
          item++;
         }
         return (Math.round(json.list[item].main.temp))
      }
      }

      //
  
  dateString(date) {
  //Date Formatter ~ takes in date and returns string format
  //similar to openweahterapi JSON date format
    var month;
    var day;
    if ((date.getMonth() + 1).toString().length === 1) {
        month = 0 + '' + (date.getMonth() + 1);
    } else {
        month = '' + (date.getMonth() + 1);
    }

    if ((date.getDate() + 1).toString().length === 1) {
        day = 0 + '' + (date.getDate());
    } else {
        day = '' + (date.getDate());
    }
    var DateString = date.getFullYear() + '-' + month + '-' + day;
    return DateString;
  }


}//class end

export default WC;