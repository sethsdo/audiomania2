import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Router, Redirect, Route, withRouter } from 'react-router-dom';
import {Dashboard} from "../index"
import { attemptAuth } from '../../state/actions/authActions';
import { history } from '../../helper/history';

export const PrivateRoute = ({isAuthenticated}) => {
    console.log(isAuthenticated)
    
    return (
        
        <Route render= {() => (
            isAuthenticated ?
                <Dashboard/> : <Redirect to="/Auth" />
        )} />
    )

        //<Route {...rest} render={props => (
        //     isAuthenticated ?
        //         <ComposedComponent auth={isAuthenticated} {...props} /> :)
}
