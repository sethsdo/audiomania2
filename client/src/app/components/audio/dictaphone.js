import React, { Component } from 'react';
import Recorder from './audioController/recorder';
import Clips from './audioController/clips';

export default class Dictaphone extends Component {
    render() {
        return (
            <div>
                <div className="">
                    <h1>Web Dictaphone</h1>
                    <Recorder />
                    <Clips />
                </div>
            </div>
        )
    }
}