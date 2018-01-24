import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import {LOGOUT} from '../../state/actions/types';
import { logout } from '../../state/actions/authActions';


export class Logout extends Component {
    handleSignout(e) {
        this.props.logout()
    }

    render () {
        return (
            <Link onClick={this.logout.bind(this)} to="/Auth"/>
        )
        
    }
}

const mapDispatchToProps = dispatch => {
    console.log("in sign out")
    logout()
        .then(data => {
            console.log("signed out", data)
            dispatch({ type: LOGOUT})
        })
        .catch(err => {
            console.log("error", err)
        })
}