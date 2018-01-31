import React, { Component } from 'react';

import {connect} from 'react-redux';
import {createClip} from '../actions/index'
//import styles from './audio.css';
//import Main from './main'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { createAudio, uploadDocumentRequest} from '../../../state/actions/audioActions';
//import {AudioRecorder} from 'react-audio-recorder';

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
        canvasCtx.lineWidth = 1;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();

        let sliceWidth = WIDTH * 1 / bufferLength;
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
        
        this.refs.stop.disabled = true;
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
        this.refs.record.style.background = "rgb(56, 212, 150)";

        this.refs.stop.disabled = false;
        console.log(this.refs.stop.disabled)
        this.refs.record.disabled = true;
    }

    stopOnClick = function () {
        this.state.mediaRecorder.stop();
        console.log(this.state.mediaRecorder.state);
        console.log("recorder stopped");
        this.refs.record.style = "";
        this.refs.record.backgroundColor = "";
        //console.log(this.state.mediaRecorder.ondataavailable);

        this.refs.stop.disabled = true;
        this.refs.record.disabled = false;
    }

    mediaRecorderOnStop() {
        console.log("data available after MediaRecorder.stop() called.");
        const clipName = prompt('Enter a name for your sound clip?', 'My unnamed clip')
        const formData = new FormData()
        formData.append("data", "data")
        console.log(formData)
        uploadDocumentRequest(formData)
        const blob = new Blob(this.state.chunks, { 'type': 'audio/ogg; codecs=opus' });
        console.log(blob)
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
                <Card>
                    {/* //<AudioRecorder /> */}
                    <div className={styles.header}>
                        <CardTitle title="Tell Your Story" subtitle="All the truth in the world can be found in Strories" />
                    </div>
                    <CardMedia>
                        <canvas ref="canvas" className="visulizer" height="40px"></canvas>
                    </CardMedia>
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardActions>
                        <div class="buttons">
                            {/* <FlatButton label="Record" primary={true} hoverColor="lightgreen" backgroundColor="" ref="record" className="record" onClick={this.recordOnClick}/> */}
                            <button ref="record" className={styles.record} onClick={this.recordOnClick}>Record</button>
                            {/* <FlatButton label="Stop" primary={true} hoverColor="#FF5722" disabled={true} backgroundColor="" ref="stop" className="stop" onClick={this.stopOnClick} /> */}
                            <button ref="stop" className={styles.stop} onClick={this.stopOnClick}>Stop</button> 
                        </div>
                    </CardActions>
                    <section ref="soundClips" className="sound-clips"></section>
                </Card>
            </sction>

        )
    }
}

const styles= {
    header: {
        'bottom': '0px',
        'right': '0px',
        'left': '0px',
        'padding-top': '8px',
        'background-color': 'rgba(0, 0, 0, 0.54)'
    },
    record: {
        background: "white"
    },
    stop:{

    }
}

export default connect(null, { createClip })(AudioPage);