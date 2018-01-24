import React, { Component } from 'react';
import { Header, Footer } from "../../components"
import { attemptAuthentication } from '../../utils/services/authhandler'
import FlatButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import Login from '../login/login';
import Register from '../register/register';
import styles from './landing.css'

const lgButton1 = () => {
    return <FlatButton fullWidth={true} label="Login" onClick={this.handleLoginClick} />
}
const lgButton2 = () => {
    return 
}


class Landing extends Component {
    // componentDidMount() {
    //     attemptAuthentication();
    // }
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.state = { switched: false }
    }
    handleLoginClick() {
        this.setState({switched: false})
        //return window.location.href = '/login';
    }
    handleRegisterClick() {
        this.setState({switched: true})
        //return window.location.href = '/signup';
    }
    render() {
        let logged = null
        let button = null
        console.log(this.state.switched, "auth button switch")
        if (!this.state.switched){
            logged = <Login/>
            button = <FlatButton fullWidth={true} label="Don't have an Account? Register!" onClick={this.handleRegisterClick} />

        } else {
            logged = <Register/>
            button = <FlatButton fullWidth={true} label="Already Registerd? Sign In!" onClick={this.handleLoginClick} />
        }

        return (

            <Card className="lg-outer-container">
                <div className="lg-container">

                    {logged}  
                    <br/>
                    {button}
                </div>
 
                <br />
            </Card>
        )
    }
}

export default Landing;