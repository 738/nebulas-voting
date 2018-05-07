import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import './App.css';
import HeaderView from './main/view/HeaderView';
import VotingListView from './main/view/VotingListView';
import EnrollView from './main/view/EnrollView';
import VoteView from './main/view/VoteView';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderView title="Vote Note"></HeaderView>
          
        <Switch>
          <Route exact={true} path="/" component={VotingListView}/>
          <Route path="/votinglist" component={VotingListView}/>
          <Route path="/enroll" component={EnrollView} />
          <Route path="/vote/:id" component={VoteView} />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
