// create component that accepts main and intermediate goal... done
// save both goals... done
// have them displayed at all times... done

// clicking submit re-render screen based on state (input main => input intermediate => timer => Q&A => break)... done
// create/import countdown timer...

import React from "react";
import Countdown from "react-countdown";
import alarm from "./alarm.wav";

class App extends React.Component {
  render() {
    const { showMain, showInt, showTimer } = this.state;

    return (
      <div>
        Main Goal: {this.state.mGoal}
        <p />
        Intermediate Goal: {this.state.iGoal}
        <p />
        {showMain && (
          <Main
            onClick={() => this.hideComponent("showMain")}
            mGoal={this.state.mGoal}
            onChange={this._mainChange}
          />
        )}
        {showInt && (
          <Intermediate
            onClick={() => this.hideComponent("showInt")}
            iGoal={this.state.iGoal}
            onChange={this._intChange}
          />
        )}
        {showTimer && (
          <Countdown date={Date.now() + 5000} renderer={this._22Timer} />
        )}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      showMain: true,
      showInt: false,
      showTimer: false,
      mGoal: "",
      iGoal: "",
    };
    this._playAudio = this._playAudio.bind(this);
    this._mainChange = this._mainChange.bind(this);
    this._intChange = this._intChange.bind(this);
  }
  _playAudio() {
    var audio = new Audio(alarm);
    audio.play();
  }
  _mainChange(event) {
    this.setState({ mGoal: event.target.value });
  }
  _intChange(event) {
    this.setState({ iGoal: event.target.value });
  }

  _22Timer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      this._playAudio();
      return <Completionist />;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  hideComponent(name) {
    switch (name) {
      case "showMain":
        this.setState({ showMain: !this.state.showMain });
        this.setState({ showInt: !this.state.showInt });
        break;
      case "showInt":
        this.setState({ showInt: !this.state.showInt });
        this.setState({ showTimer: !this.state.showTimer });
        break;
      default:
        return;
    }
  }
}
export default App;

const Completionist = () => (
  <span>
    Times up! Click to continue
    <input type="Submit" value="Continue" />
  </span>
);

class Main extends React.Component {
  render() {
    return (
      <div>
        Please tell me your main goal:
        <input
          type="text"
          value={this.props.mGoal}
          onChange={this.props.onChange}
        />
        <input type="Submit" value="Submit" onClick={this.props.onClick} />
      </div>
    );
  }
}
class Intermediate extends React.Component {
  render() {
    return (
      <div>
        Please tell me your intermediate goal:
        <input
          type="text"
          value={this.props.iGoal}
          onChange={this.props.onChange}
        />
        <input type="Submit" value="Submit" onClick={this.props.onClick} />
      </div>
    );
  }
}
