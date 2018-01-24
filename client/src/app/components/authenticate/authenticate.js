import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import {Dashboard} from "../index"

export const PrivateRoute = ({ component: ComposedComponent, isAuthenticated,  ...rest  }) => {
    console.log('from protected route', { component: ComposedComponent, isAuthenticated, ...rest })
    return (
        <Route {...rest} render={props => (
            isAuthenticated ?
                <ComposedComponent auth={isAuthenticated} {...props} /> :
                <Redirect to='/' />
        )} />
)}
