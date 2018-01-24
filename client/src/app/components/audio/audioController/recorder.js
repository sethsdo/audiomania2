import React, { Component } from 'react';

import {connect} from 'react-redux';
import {createClip} from '../actions/index'
//import styles from './audio.css';
//import Main from './main'


class AudioPage extends Component {

    constructor() {
        super()
        navigator.getUserMedia = ( navigator.getUserMedia || 
                                   navigator.webkitGetUserMedia ||
                                   navigator.mozGetUserMedia ||
                                   navigator.msGetUserMedia );

        const audioCtx = new (window.AudioContext )();
        const analyser = audioCtx.createAnalyser();   
        
        this.state = {
            audioCtx: audioCtx,
            analyser: analyser,
            chunks: []
        }

        this.draw = this.draw.bind(this);
        this.visualize = this.visualize.bind(this);
        this.recordOnClick = this.recordOnClick.bind(this);
        this.stopOnClick = this.stopOnClick.bind(this);
        this.mediaRecorderOnStop = this.mediaRecorderOnStop.bind(this);
        this.mediaRecorderOnDataAvailable = this.mediaRecorderOnDataAvailable.bind(this);
    
    }

    draw() {
        let canvasCtx = this.state.canvas.getContext("2d");
        let dataArray = new Uint8Array(this.state.analyser.frequencyBinCount);
        let bufferLength = this.state.analyser.frequencyBinCount;
        const WIDTH = this.state.canvas.width;
        const HEIGHT = this.state.canvas.height;

        requestAnimationFrame(this.draw);
        this.state.analyser.getByteTimeDomainData(dataArray);
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();

        let sliceWidth = WIDTH * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            let v = dataArray[i] / 128.0;
            let y = v * HEIGHT / 2;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        canvasCtx.lineTo(this.state.canvas.width, this.state.canvas.height/2);
        canvasCtx.stroke();
    }

    visualize(stream) {
        let source = this.state.audioCtx.createMediaStreamSource(stream);

        this.state.analyser.fftSize = 2048;
        let bufferLength = this.state.analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        source.connect(this.state.analyser);
        //analyser.connect(audioCtx.destination);
        this.draw()
    }

    componentDidMount() {
        this.setState({
            canvas: this.refs.canvas
        })

        if (navigator.getUserMedia) {
            console.log('getUserMedia supported.');

            let constraints = { audio: true };

            var onSuccess = function(stream) {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.onstop = this.mediaRecorderOnStop;
                mediaRecorder.ondataavailable = this.mediaRecorderOnDataAvailable;
                this.setState({ mediaRecorder });
                this.visualize(stream);
            }
            const onError = (err) => {
                console.log(`${'The Following error occured:' + err}`)
            }
            navigator.getUserMedia(constraints, onSuccess.bind(this), onError);
        } else {
            alert("getUserMedia not supported in this browser")
        }
    }

    recordOnClick() {
        this.state.mediaRecorder.start();
        console.log(this.state.mediaRecorder.state);
        console.log("recorder started");
        this.refs.record.style.background = "red";

        this.refs.stop.disabled = false;
        this.refs.record.disabled = true;
    }

    stopOnClick = function () {
        this.state.mediaRecorder.stop();
        console.log(this.state.mediaRecorder.state);
        console.log("recorder stopped");
        this.refs.record.style.background = "";
        this.refs.record.style.color = "";
        // mediaRecorder.requestData();

        this.refs.stop.disabled = true;
        this.refs.record.disabled = false;
    }

    mediaRecorderOnStop() {
        console.log("data available after MediaRecorder.stop() called.");
        const clipName = prompt('Enter a name for your sound clip?', 'My unnamed clip')

        const blob = new Blob(this.state.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.props.createClip(blob, clipName)

        this.setState({
            chunks: []
        })

        console.log("recorder stopped");
    }

    mediaRecorderOnDataAvailable(e) {
        this.setState({
            chunks: [...this.state.chunks, e.data]
        })
    }

    render() {
        return (
            <sction ref="main-controls" className="main-controls">
                <canvas ref="canvas" className="visulizer" height="60px"></canvas>
                <div class="buttons">
                    <button ref="record" className="record" onClick={this.recordOnClick}>Record</button>
                    <button ref="stop" className="stop" onClick={this.stopOnClick}>Stop</button>
                </div>
                <section ref="soundClips" className="sound-clips"></section>
            </sction>

        )
    }
}

export default connect(null, { createClip })(AudioPage);