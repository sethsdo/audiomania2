import React, { Component } from 'react';
import {Header, Footer, Audio} from "../../components"
import styles from './dashboard.css';
import { connect } from 'react-redux';
import {history} from '../../helper/history'
import {attemptAuth} from '../../state/actions/authActions';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        attemptAuth()
            .then(data => {
                console.log(data.data)
                if (data.data) {
                    console.log("passed if");
                    this.setState({user: data.data})
                    
                }
                console.log(data, "error");
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        console.log(this.state.user)
        return (
            
            <div className={styles.container}>
                <Header className="App-header" data={this.state.user}/>
                Dashboard Goes Here
                <Audio/>
                <Footer/>
            </div>
        )
    }
}

export default connect(null)(Dashboard);