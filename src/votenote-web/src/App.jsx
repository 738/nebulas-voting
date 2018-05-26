import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import HeaderView from './main/view/HeaderView';
import FooterView from './main/view/FooterView';
import VotingListView from './main/view/VotingListView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
        <div className="App">
          <HeaderView title="Votestagram"></HeaderView>
          <Switch>
            <Route exact={true} path="/" component={VotingListView} />
          </Switch>
          <FooterView />
        </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
