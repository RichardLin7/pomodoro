// create component that accepts main and intermediate goal... done
// save both goals... done
// have them displayed at all times... done

// clicking submit re-render screen based on state (input main => input intermediate => timer => Q&A => break)... done
// create/import countdown timer... done
// alarm sounds when times up ... done
// Q&A ...
// with the 8 min timer...

import React from "react";
import Countdown from "react-countdown";
import alarm from "./alarm.wav";

class App extends React.Component {
  render() {
    const { showMain, showInt, showTimer, showQA } = this.state;

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
          <Countdown date={Date.now() + 2000} renderer={this._22Timer} />
        )}
        {showQA && <Question showInt={() => this.hideComponent("showInt2")} />}
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      showMain: true,
      showInt: false,
      showTimer: false,
      showQA: false,
      mGoal: "",
      iGoal: "",
    };
    this._playAudio = this._playAudio.bind(this);
    this._mainChange = this._mainChange.bind(this);
    this._intChange = this._intChange.bind(this);
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
      return (
        <span>
          Times up! Click to continue
          <input
            type="Submit"
            value="Continue"
            onClick={() => this.hideComponent("showQ&A")}
          />
        </span>
      );
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
      case "showQ&A":
        this.setState({ showTimer: !this.state.showTimer });
        this.setState({ showQA: !this.state.showQA });
        break;
      case "showInt2":
        this.setState({ showInt: !this.state.showInt });
        this.setState({ showQA: !this.state.showQA });
        break;
      default:
        return;
    }
  }
  _playAudio() {
    var audio = new Audio(alarm);
    audio.play();
  }
}
export default App;

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

class Question extends React.Component {
  render() {
    const { showQuestion, showMet, showDone } = this.state;
    if (showQuestion) {
      return (
        <div>
          Was Intermediate Goal relevant?
          <input
            type="Submit"
            value="Yes"
            onClick={() => this.hideComponent("rGoal")}
          />
          <input type="Submit" value="No" onClick={this.props.showInt} />
        </div>
      );
    }
    if (showMet) {
      return (
        <div>
          Has Intermediate Goal been met?
          <input
            type="Submit"
            value="Yes"
            onClick={() => this.hideComponent("met")}
          />
          <input type="Submit" value="No" />
        </div>
      );
    }
    if (showDone) {
      return (
        <div>
          Would you like to set a new Intermediate Goal or are you done?
          <input type="Submit" value="New Intermediate Goal" />
          <input type="Submit" value="Done" />
        </div>
      );
    }
  }
  constructor() {
    super();
    this.state = { showQuestion: true, showMet: false, showDone: false };
  }

  hideComponent(name) {
    switch (name) {
      case "rGoal":
        this.setState({
          showQuestion: !this.state.showQuestion,
          showMet: !this.state.showMet,
        });
        break;
      case "met":
        this.setState({
          showMet: !this.state.showMet,
          showDone: !this.state.showDone,
        });

        break;
      default:
        return;
    }
  }
}
