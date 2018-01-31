import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import {LOGOUT} from '../../state/actions/types';
import { logout } from '../../state/actions/authActions';
import { history } from '../../helper/history';


export const Logout = (props) => {
    logout()
    history.push('/')
    history.go()
}
