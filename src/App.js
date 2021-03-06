// create component that accepts main and intermediate goal... done
// save both goals... done
// have them displayed at all times... done

// clicking submit re-render screen based on state (input main => input intermediate => timer => Q&A => break)... done
// create/import countdown timer... done
// alarm sounds when times up ... done
// Q&A ... done
// with the 8 min timer... done

import React from "react";
import Countdown from "react-countdown";
import alarm from "./alarm.wav";

class App extends React.Component {
  render() {
    const {
      finishedGoal,
      showMain,
      showInt,
      showTimer,
      showBreakTimer,
    } = this.state;

    if (finishedGoal === false && showBreakTimer === false) {
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
            <Countdown date={Date.now() + 1320000} renderer={this._22Timer} />
          )}
        </div>
      );
    }
    if (showBreakTimer === true && finishedGoal === false) {
      return (
        <div>
          Main Goal: {this.state.mGoal}
          <p />
          Intermediate Goal: {this.state.iGoal}
          <p />
          <Countdown date={Date.now() + 480000} renderer={this._8Timer} />
          <Question
            showInt={() => this.hideComponent("showInt2")}
            showTimer={() => this.hideComponent("showTimer")}
            isFinished={this._isFinished}
            breakOver={this._breakOver}
            onClick={() => this.hideComponent("showInt")}
            iGoal={this.state.iGoal}
            onChange={this._intChange}
          />
        </div>
      );
    }
    if (finishedGoal === true) {
      return <div>Good Job! Enjoy the rest of your day!</div>;
    }
  }
  constructor(props) {
    super(props);
    this.audio = new Audio(alarm);
    this.state = {
      finishedGoal: false,

      showMain: true,
      showInt: false,
      showTimer: false,
      showBreakTimer: false,
      break: true,
      mGoal: "",
      iGoal: "",
    };
    this._isFinished = this._isFinished.bind(this);
    this._showQuestion = this._showQuestion.bind(this);
    this._mainChange = this._mainChange.bind(this);
    this._intChange = this._intChange.bind(this);
    this._breakOver = this._breakOver.bind(this);
    this._8Timer = this._8Timer.bind(this);
    this._22Timer = this._22Timer.bind(this);
  }

  _mainChange(event) {
    this.setState({ mGoal: event.target.value });
  }

  _intChange(event) {
    this.setState({ iGoal: event.target.value });
  }

  _showQuestion() {
    this.audio.pause();
    this.setState({
      showQA: true,
      showTimer: false,
      showBreakTimer: true,
    });
  }

  _breakOver() {
    this.audio.pause();
    this.setState({
      showBreakTimer: false,
      showTimer: true,
    });
  }

  _isFinished() {
    this.setState({ finishedGoal: true });
  }

  _22Timer({ minutes, seconds, completed }) {
    if (completed) {
      this.audio.play();
      return (
        <span>
          Times up! Click to continue...
          <p></p>
          <input type="Submit" value="Continue" onClick={this._showQuestion} />
        </span>
      );
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  }

  _8Timer({ minutes, seconds, completed }) {
    if (completed) {
      this.audio.play();
      return (
        <span>
          Break time is up! Click to continue working...
          <p></p>
          <input type="Submit" value="Continue" onClick={this._breakOver} />
        </span>
      );
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  }
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
      case "showTimer":
        this.setState({ showQA: !this.state.showQA });
        this.setState({ showTimer: !this.state.showTimer });
        break;
      default:
        return;
    }
  }
}
export default App;

class Question extends React.Component {
  render() {
    const { showQuestion, showMet, showDone, newGoal, breakTime } = this.state;

    if (showQuestion) {
      return (
        <div>
          <p></p>
          Was Intermediate Goal relevant?
          <p></p>
          <input
            type="Submit"
            value="Yes"
            onClick={() => this.hideComponent("rGoal")}
          />
          <input
            type="Submit"
            value="No"
            onClick={() => this.hideComponent("newGoal")}
          />
        </div>
      );
    }

    if (showMet) {
      return (
        <div>
          Has Intermediate Goal been met?
          <p></p>
          <input
            type="Submit"
            value="Yes"
            onClick={() => this.hideComponent("met")}
          />
          <input
            type="Submit"
            value="No"
            onClick={() => this.hideComponent("break")}
          />
        </div>
      );
    }

    if (showDone) {
      return (
        <div>
          Would you like to set a new Intermediate Goal or are you done with the
          Main Goal?
          <p></p>
          <input
            type="Submit"
            value="New Intermediate Goal"
            onClick={() => this.hideComponent("newGoal")}
          />
          <input
            type="Submit"
            value="Done with Main goal"
            onClick={this.props.isFinished}
          />
        </div>
      );
    }

    if (newGoal) {
      return (
        <div>
          Please tell me your intermediate goal:
          <input
            type="text"
            value={this.props.iGoal}
            onChange={this.props.onChange}
          />
          <input
            type="Submit"
            value="Submit"
            onClick={() => this.hideComponent("break")}
          />
        </div>
      );
    }

    if (breakTime) {
      return <div>Take a break for the remaining time.</div>;
    }
  }

  constructor() {
    super();
    this.audio = new Audio(alarm);

    this.state = {
      showQuestion: true,
      showMet: false,
      showDone: false,
      newGoal: false,
      BreakTime: false,
    };
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
      case "newGoal":
        this.setState({
          showQuestion: false,
          showMet: false,
          showDone: false,
          newGoal: true,
        });
        break;
      case "break":
        this.setState({
          showMet: false,
          showDone: false,
          newGoal: false,
          breakTime: true,
        });
        break;
      default:
        return;
    }
  }
}

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
