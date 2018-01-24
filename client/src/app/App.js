import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch} from 'react-router-dom'
import GridList from 'material-ui/GridList';

import { connect } from 'react-redux';

import { Header, Footer, Login, Register, Dashboard, Landing, NotFound, Authenticate, Audio } from './components';

import './App.css';
import { attemptAuth } from './state/actions/authActions';
import { PrivateRoute } from './components/authenticate/authenticate';
import { SIGNING_IN_ERROR, SIGNING_IN_SUCCESS } from "./state/actions/types"
//import { history } from './helper/history'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    console.log(this.props, 'from component will mount');
    if (this.props.isAuthenticated) {
      console.log('props is authenticated');
      if (this.props.match.path === '/') {
        return this.props.history.push('/home');
      }
      return
    }
    this.props.attemptAuthentication()
      .then(_ => { })
      .catch(_ => this.props.history.replace('/'));

  }
  

  render() {
    console.log(this.props.isAuthenticated, "main check")
    return (
      <div className="App">
        <Router>
          <div>
            <Header isAuthenticated={this.props.isAuthenticated}/>
            <Switch>

              <Route exact path="/" render={() => (
                console.log(this.props.isAuthenticated, "second check"),
                this.props.isAuthenticated ?
                  <Redirect to="/dashboard" /> : <Redirect to="/Auth" />
              )} />
              <Route path="/Auth" component={Landing} />
              <PrivateRoute path="/home" isAuthenticated={this.props.isAuthenticated} component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.authenticationReducer.user)
  return {
    user: state.authenticationReducer.user,
    isAuthenticated: state.authenticationReducer.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    attemptAuthentication() {
      return new Promise((resolve, reject) => {
        attemptAuth()
          .then(data => {
            console.log(data.data)
            if (data.data) {
              console.log("passed if");
              dispatch({ type: SIGNING_IN_SUCCESS, payload: data })
              resolve();
            }
            console.log(data, "error");
            // dispatch({ type: SIGNING_IN_ERROR })
            //reject();
          })
          .catch(err => {
            console.log(`Not authenticated ${err}`);
            dispatch({ type: SIGNING_IN_ERROR })
          })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);