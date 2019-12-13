import React from "react";
import "./App.css";
import Timer from "./Timer";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Button from "@material-ui/core/Button";

const defaultHrs = 2;
const defaultMins = 0;
const defaultSecs = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      hrs: defaultHrs,
      mins: defaultMins,
      secs: defaultSecs
    };
  }

  startTimerApp = () => {
    this.setState({
      status: 1,
      hrs: this.state.hrs,
      mins: this.state.mins,
      secs: this.state.secs
    });
  };

  stopTimerApp = () => {
    this.setState({
      status: null,
      hrs: defaultHrs,
      mins: defaultMins,
      secs: defaultSecs
    });
  };

  getHrsLeft = () => {
    if (this.state.hrs < 10) {
      return "0" + this.state.hrs;
    } else {
      return this.state.hrs;
    }
  };

  getMinsLeft = () => {
    if (this.state.mins < 10) {
      return "0" + this.state.mins;
    } else {
      return this.state.mins;
    }
  };

  getSecsLeft = () => {
    if (this.state.secs < 10) {
      return "0" + this.state.secs;
    } else {
      return this.state.secs;
    }
  };

  render() {
    if (!this.state.status) {
      return (
        <div className="App">
          <header className="App-header">
            <div className="timer-container">
              <div className="timer-normal">
                {this.getHrsLeft()}
                <span className="handle">h</span>
                {this.getMinsLeft()}
                <span className="handle">m</span>
                {this.getSecsLeft()}
                <span className="handle">s</span>
              </div>
              <div className="progess-container"></div>
            </div>
            <div className="button">
              <Button
                variant="contained"
                color="default"
                onClick={this.startTimerApp}
                startIcon={<ArrowForwardIosIcon />}
              >
                Start
              </Button>
            </div>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Timer
              hrs={this.state.hrs}
              mins={this.state.mins}
              secs={this.state.secs}
            />
            <div className="button">
              <Button
                variant="contained"
                color="default"
                onClick={this.stopTimerApp}
                startIcon={<RotateLeftIcon />}
              >
                Reset
              </Button>
            </div>
          </header>
        </div>
      );
    }
  }
}

export default App;
