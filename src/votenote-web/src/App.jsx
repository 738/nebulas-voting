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
import { I18nextProvider } from "react-i18next";
import i18n from "./common/util/i18n";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <I18nextProvider i18n={i18n}>
            <div className="App">
              <HeaderView title="Votestagram"></HeaderView>
              <Switch>
                <Route exact={true} path="/" component={VotingListView} />
              </Switch>
              <FooterView />
            </div>
          </I18nextProvider>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
