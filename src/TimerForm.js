import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

class TimerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hrs: "00", mins: "05", secs: "00" };
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    console.log(this.state);
    this.props.callback(
      parseInt(this.state.hrs),
      parseInt(this.state.mins),
      parseInt(this.state.secs)
    );
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <input
            name="hrs"
            type="text"
            value={this.state.hrs}
            onChange={this.handleChange}
          />
          <span className="handle">h</span>
          <input
            name="mins"
            type="text"
            value={this.state.mins}
            onChange={this.handleChange}
          />
          <span className="handle">m</span>
          <input
            name="secs"
            type="text"
            value={this.state.secs}
            onChange={this.handleChange}
          />
          <span className="handle">s</span>
        </form>
        <div className="progess-container"></div>
        <div className="button">
          <Button
            variant="contained"
            color="default"
            onClick={this.handleSubmit}
            startIcon={<ArrowForwardIosIcon />}
          >
            Start
          </Button>
        </div>
      </div>
    );
  }
}

export default TimerForm;
