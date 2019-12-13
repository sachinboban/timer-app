import React from "react";
import "./App.css";
import Timer from "./Timer";
import TimerForm from "./TimerForm";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Button from "@material-ui/core/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      hrs: null,
      mins: null,
      secs: null
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
      hrs: this.state.hrs,
      mins: this.state.mins,
      secs: this.state.secs
    });
  };

  getFormSubmission = (hrs, mins, secs) => {
    this.setState({
      status: 1,
      hrs: hrs,
      mins: mins,
      secs: secs
    });
  };

  renderTimer = () => {
    return (
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
    );
  };

  render() {
    if (!this.state.status) {
      return (
        <div className="App">
          <header className="App-header">
            <TimerForm callback={this.getFormSubmission} />
          </header>
        </div>
      );
    } else {
      return <div className="App">{this.renderTimer()}</div>;
    }
  }
}

export default App;
