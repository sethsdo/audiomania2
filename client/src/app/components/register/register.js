import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './register.css'

import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';


import { user } from '../../utils/models'
import { register } from '../../state/actions/authActions';
import { Header, Footer } from "../../components"
import {attemptAuth} from '../../state/actions/authActions';
import { SIGNING_IN_SUCCESS, SIGNING_IN_ERROR } from '../../state/actions/types';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formValid: false,
            user,
            newUser: {},
            redirect: false
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        //console.log(this.state.newUser);
        this.props.attemptRegistry(this.state.newUser)

    }

    handleChange(key, previousState, newValue) {
        console.log(key, newValue)
        let valid;
        const newUser = { ...this.state.newUser }
        if (key === "passwordConfirmation") {
            console.log(this.state.user.password.value)
            valid = this.state.user[key].validate(newValue, this.state.user.password.value)
            console.log(valid)
        }
        else valid = this.state.user[key].validate(newValue);
        if(valid) {
            newUser[key] = newValue;
            this.setState({newUser: newUser})
        }
        this.formCheck()
    }

    formCheck() {
        let valid = true;
        for (let i in this.state.user) {
            valid = valid && this.state.user[i].valid
        }
        this.setState({formValid: valid})
    }

    render() {
        return (
            <div>
                <Avatar class="fa fa-user-plus avatar" aria-hidden="true" size={150} color="black" backgroundColor="white"/>
                <div className='login-container'>
                    <form>
                        <h1>Sign Up</h1>
                        <Input
                            floatingLabelText="First Name"
                            name="firstName"
                            ref="firstName"
                            fullWidth='true'
                            errorText={this.state.user.firstname.err}
                            onChange={this.handleChange.bind(this, 'firstname')} />
                        <Input
                            floatingLabelText="Last Name"
                            name="lastName"
                            ref="lastName"
                            fullWidth='true'
                            errorText={this.state.user.lastname.err}
                            onChange={this.handleChange.bind(this, 'lastname')} />
                        <Input
                            floatingLabelText="Email"
                            name="email"
                            ref="email"
                            fullWidth='true'
                            errorText={this.state.user.email.err}
                            onChange={this.handleChange.bind(this, 'email')} />
                        <Input
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            ref="password"
                            fullWidth='true'
                            errorText={this.state.user.password.err}
                            onChange={this.handleChange.bind(this, 'password')} />
                        <Input
                            floatingLabelText="Confirm Password"
                            type="password"
                            name="passwordConfirmation"
                            ref="passwordConfirmation"
                            fullWidth='true'
                            errorText={this.state.user.passwordConfirmation.err}
                            onChange={this.handleChange.bind(this, 'passwordConfirmation')} />
                        <RaisedButton
                            type="submit"
                            label="Submit"
                            fullWidth='true'
                            primary={true}
                            disabled={!this.state.formValid}
                            onClick={this.handleSubmit.bind(this)} />
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        attemptRegistry(body) {
            register(body)
                .then(data => {
                    console.log("Register Event occurred and succeeded!", data);
                    dispatch({ type: SIGNING_IN_SUCCESS, payload: data })
                    props.history.push('/dashboard')
                })
                .catch(err => {
                    console.error("Registration event occurred and failed :(.", err);
                    dispatch({ type: SIGNING_IN_ERROR, payload: err })
                    console.log(props);
                })
        }
    }
}

function attemptRegistry(body) {
    console.log(body)
    register(body)
        .then(data => {
            console.log("registered", data)
            attemptAuth.authenticate();
            console.log(attemptAuth.isAuenticated)
            window.location.href = '/Dashboard';
        })
        .catch(err => {
            console.log("error", err)
        })
}

export default Register;