import React, { Component } from 'react';
import Weather from './Weather';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    temperature : '',
    temperatureF : '',
    summary : '',
    timezone : '',
    icon : ''
  }
  componentDidMount()
  {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( (location) =>
        {
          console.log(location);
          this.setState({
            latitude : location.coords.latitude ,
            longitude : location.coords.longitude 
          });
          const proxy = 'https://cors-anywhere.herokuapp.com/';
          const API = `${proxy}https://api.darksky.net/forecast/1028482d26eaf477cf7bd5548f61bce6/${this.state.latitude},${this.state.longitude}`;

          axios.get(API)
            .then(res=>{
              console.log(res.data);
              this.setState({
                      timezone : res.data.timezone,
                      summary : res.data.hourly.summary,
                      temperature : res.data.currently.temperature,
                      wind : res.data.currently.windSpeed,
                      icon : res.data.hourly.icon,
                    });
            })
            .catch(err=>{
              console.log(err);
            });
        });
    }
  }
  render() {
    return ( 
      <div>
        <Weather 
          time = { this.state.timezone } 
          summary = { this.state.summary } 
          temp = { this.state.temperature }
          icon = { this.state.icon } 
          wind = { this.state.wind }
        />  
      </div>
    )
  }
}

export default App;