import React, { Component } from 'react';
import {Header, Footer, Audio} from "../../components"
import styles from './dashboard.css';


class Dashboard extends Component {
    render() {
        return (
            
            <div className={styles.container}>
                <Header className="App-header" />
                Dashboard Goes Here
                <Audio/>
                <Footer/>
            </div>
        )
    }
}

export default Dashboard;