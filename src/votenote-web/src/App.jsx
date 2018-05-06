import React, { Component } from 'react';
import './App.css';
import HeaderView from './main/view/HeaderView';
import VotingListView from './main/view/VotingListView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votingItems: [],
    }
  }
  dappAddress = "n22db3WJchN6sWSnKK2AnuzxMj5BCAgUUp4";

  componentDidMount() {
    var func = "getVotingList";
    window.postMessage({
      "target": "contentscript",
      "data": {
        "to": this.dappAddress,
        "value": "0",
        "contract": {
          "function": func,
          "args": "",
        }
      },
      "method": "neb_call"
    }, "*");

    window.addEventListener('message', function (e) {
      if (e.data.data.neb_call) {
        var result = e.data.data.neb_call.result;
        if (result === 'null') {
          console.log('result is null');
        } else {
          try {
            result = JSON.parse(e.data.data.neb_call.result)
            console.log(result);
            this.setState({
              ...this.state,
              votingItems: result,
            })
          } catch (err) {
            console.log(err);
          }
        }
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="App">
        <HeaderView title="Vote Note"></HeaderView>
        <VotingListView votingItems={this.state.votingItems}></VotingListView>
      </div>
    );
  }
}

export default App;
