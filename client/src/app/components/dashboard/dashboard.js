import React, { Component } from 'react';
import {Header, Footer, Audio} from "../../components"
//import styles from './dashboard.css';
import { connect } from 'react-redux';
import {history} from '../../helper/history'
import {attemptAuth} from '../../state/actions/authActions';

import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import 'bootstrap/dist/css/bootstrap.css';
import background from "../../../static/img/temp-background.jpeg"
import profileImg from "../../../static/img/Seth-1.jpg"

const styles = {
    outerContainer:{
        'margin-top': 30,
        'margin-left': 30,
        'margin-right': 30
    },
    paper1: {
        'height': "500px",
        'width': "96%",
        'margin': 10,
        'textAlign': 'center',
        'display': 'inline-block',
    },
    paper: {
        'height': "auto",
        'width': "96%",
        'margin': 10,
        'textAlign': 'center',
        'display': 'inline-block',
    },
    avatar: {
        'position': 'relative',
        'height': '100px',
        'width': '100px',
        'min-width': '1%',
        'box-shadow': 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    },
    backgroundImg: {
        'position': 'absalute'
    }

}


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
                //history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        console.log(this.state.user)
        return (
            
            <div>
                <Header className="App-header" data={this.state.user}/>
                <div className="containe" style={styles.outerContainer}>
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-xs-12"><RightSideBar/></div>
                        <div className="col-xl-6 col-lg-8 col-xs-12"><Audio/></div>
                        <div className="col-xl-3 col-lg-12 col-sm-12"><LeftSideBar/></div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const RightSideBar = (props) => {
    return (
        <Card>
            <CardMedia overlay={
                <CardTitle title="Seth Olmstead" subtitle="Full Stack Developer" />
            }>
                <img src={background} alt="" style={styles.backgroundImg} />
                {/* <Avatar src={profileImg} style={styles.avatar} /> */}
            </CardMedia>
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            <CardActions>

            </CardActions>
        </Card>
    )
}
const LeftSideBar = (props) => {
    return (
        <Card>
            <CardHeader
                title="URL Avatar"
                subtitle="Subtitle"
                avatar="images/ok-128.jpg"
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText>
            </CardText>
            <CardMedia

                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
            >
                <img src="images/nature-600-337.jpg" alt="" />
            </CardMedia>
            <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
            <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
            <CardActions>
                <FlatButton label="Expand" onClick={this.handleExpand} />
                <FlatButton label="Reduce" onClick={this.handleReduce} />
            </CardActions>
        </Card>

    )
}

const MainContent = (props) => {
    return (
        <audio/>
    )
}

export default connect(null)(Dashboard);