import React, { Component } from "react";
import "./App.css";
import { Spin } from "react-loading-io";
import {
  Card,
  CardBody,
} from "reactstrap";

class Weather extends Component {
  state = {
    tempChange: false
  };

  handleChange = () => {
    this.setState((prevState, props) => {
      return {
        tempChange: !prevState.tempChange
      };
    });
  };

  render() {
    let celsius = Math.floor((this.props.temp - 32) * (5 / 9));
    return (
      <div className="background container-fluid">
        <div className="row justify-content-sm-center">
          <div className="col-xs-12 col-sm-6 col-md-4 mt-5 pt-5">
              <h1 className='text-white'>Today's Weather</h1>
            {
                this.props.summary === "" ? 
                <div className='mt-5'>
                    <Spin size={75} color={"white"} />
                </div>
                : 
                <Card>
                    <CardBody>
                        <h2 className='my-3'>
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {this.props.time}
                        </h2>
                        <h4 className='my-4'>{this.props.summary}</h4>
                        <h4>
                            <i className="fas fa-wind"></i> {this.props.wind} km/h
                        </h4>
                    {
                        this.state.tempChange ? (
                            <h3 onClick={this.handleChange}>
                                <i className="fas fa-thermometer-half"></i>{" "}
                                {Math.round(this.props.temp)} &deg;F
                            </h3>
                        ) : (
                            <h3 onClick={this.handleChange}>
                                <i className="fas fa-thermometer-half"></i> {celsius}{" "}
                                &deg;C
                            </h3>
                        )
                    }
                    </CardBody>
                </Card>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
