import React from 'react';
import greet from 'greeting-time';

class Header extends React.Component{
    //var hello = greet(new Date());
    constructor(props){
        super(props);

            var DT = new Date();
        this.state = { //setting intial state
            clock: DT.toLocaleString().substring(11,16) + this.amPM(DT),
            greeting: greet(DT)
        }
    }
   
    render(){
        return(
            <div>
                <h1>How's the weather in your city?</h1>
            </div>
        );
    }
    milconversion(date){
        return (date.getHours() + 24) % 12 || 12;
    }
    amPM(date){
        if(date.getHours() < 12){return ' AM';}
        if(date.getHours() >= 12){return ' PM';}
    }

    componentDidMount(){//updating clock every 10 seconds
        setInterval( () => {
            this.setState({
              clock : ((new Date()).toLocaleString().substring(11,16)).replace(/:$/ , "") + this.amPM(new Date())
            })
          },1000)
    }
}

export default Header;





