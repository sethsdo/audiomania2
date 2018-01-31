import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch} from 'react-router-dom'
import GridList from 'material-ui/GridList';

import { connect } from 'react-redux';

import { Header, Footer, Login, Register, Dashboard, Landing, NotFound, Authenticate, Audio } from './components';

import './App.css';
import { attemptAuth } from './state/actions/authActions';
import { PrivateRoute } from './components/authenticate/authenticate';
import { SIGNING_IN_ERROR, SIGNING_IN_SUCCESS } from "./state/actions/types"
import { history } from './helper/history'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    //attemptAuth()
    //return history.location.state ? <Redirect to="/home" /> : <Redirect to="/Auth" />
    console.log(history)
    // console.log(this.props.isAuthenticated, history.location.pathname , 'from component will mount');
    // if (this.props.isAuthenticated) {
    //   console.log('props is authenticated');
    //   if (history.location.pathname === '/' || history.location.pathname === '/Auth') {
    //     console.log("Made it past")
    //     return history.go('/home');
    //   }
    //   return
    // }
    // this.props.attemptAuthentication()
    //   .then(_ => { })
    //   .catch(_ => this.props.history.replace('/Auth'));
  }
  

  render() {
    let isAuthenticated = false

    if (history.location.state !== false && history.location.state !== undefined) {
      isAuthenticated = true
    }
    console.log(isAuthenticated, history.location.state, "main check")
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              {/* <Route path="/" component={Dashboard}/> */}
              <Route exact path="/" render={() => (
                isAuthenticated ?
                  <Redirect to="/home" /> : <Redirect to="/Auth" />
              )} />
              <Route path="/Auth" component={Landing} />
              <PrivateRoute path="/home" isAuthenticated={isAuthenticated} component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.authenticationReducer.user, state.authenticationReducer.isAuthenticated)
  return {
    user: state.authenticationReducer.user,
    isAuthenticated: state.authenticationReducer.isAuthenticated
  }
}

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     attemptAuthentication() {
//       return new Promise((resolve, reject) => {
//         attemptAuth()
//           .then(data => {
//             console.log(data.data)
//             if (data.data) {
//               console.log("passed if");
//               dispatch({ type: SIGNING_IN_SUCCESS, payload: data })
//               //return history.push("/home")
//               resolve();
//             }
//             console.log(data, "error");
//             history.push('/Auth')
//             dispatch({ type: SIGNING_IN_ERROR })
//             //reject();
//           })
//           .catch(err => {
//             console.log(`Not authenticated ${err}`);
//             dispatch({ type: SIGNING_IN_ERROR })
//           })
//       })
//     }
//   }
// }
//connect(mapStateToProps, mapDispatchToProps)
export default connect(null)(App);
