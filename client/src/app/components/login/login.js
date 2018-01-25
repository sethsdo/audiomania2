import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,

} from 'react-router-dom'

import { user } from '../../utils/models'

import { login } from '../../state/actions/authActions';
import { Header, Footer } from "../../components"
import { Authenticated } from '../authenticate/authenticate';

import styles from './login.css'
import { SIGNING_IN_SUCCESS, SIGNING_IN_ERROR } from '../../state/actions/types';

import {history} from '../../helper/history'





class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formValid: true,
            user: { email: user.email, password: user.password },
            newUser: { email: "", password: "" },
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        console.log("submitted");
        this.props.login(this.state.newUser)
    }

    handleChange(key, previousState, newValue) {
        const newUser = { ...this.state.newUser }
        newUser[key] = newValue;
        this.setState({ newUser: newUser })
    }

    render() {
        return (
            <div className="pageView">
                <Avatar class="fa fa-sign-in avatar" aria-hidden="true" size={150} color="black" backgroundColor="white"/>
                <div className='login-container'>
                    {/* <div className='lg-ontainer'> */}
                        <form >
                            <h1>Sign In</h1>
                            <Input
                                floatingLabelText="Email"
                                name="email"
                                ref="email"
                                fullWidth='true'
                                //errorText={this.state.user.email.err}
                                onChange={this.handleChange.bind(this, 'email')} />
                            <Input
                                floatingLabelText="Password"
                                name="password"
                                ref="password"
                                fullWidth='true'
                                type="password"
                                //errorText={this.state.user.email.err}
                                onChange={this.handleChange.bind(this, 'password')} />
                            <RaisedButton
                                type="submit"
                                label="Submit"
                                fullWidth='true'
                                className="submit"
                                primary={true}
                                disabled={!this.state.formValid}
                                onClick={this.handleSubmit.bind(this)} />
                        </form>
                </div>
            </div>
        )
    }
}

const mapDispatch = (dispatch, props) => {
    return {
        login(body) {
            login(body)
                .then(data => {
                    console.log(data, "here")
                    dispatch({ type: SIGNING_IN_SUCCESS, payload: data})
                    //history.push("/", {state: data})
                    return window.location.href = "/home"
                    
                    console.log(history)
                })
                .catch(err => {
                    console.log(err)
                    dispatch({ type: SIGNING_IN_ERROR, payload: err })
                })
        }
    }
}

export default connect(null, mapDispatch)(Login);