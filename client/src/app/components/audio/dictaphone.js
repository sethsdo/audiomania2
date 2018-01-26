import React, { Component } from 'react';
import Recorder from './audioController/recorder';
import Clips from './audioController/clips';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export default class Dictaphone extends Component {
    render() {
        return (
            <div>
                <div className="">
                    <Recorder />
                    <Clips />
                </div>
            </div>
        )
    }
}