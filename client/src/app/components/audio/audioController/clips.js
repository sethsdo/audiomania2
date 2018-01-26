import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clip from './clip';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

class Clips extends Component {
    render() {
        console.log(this.props.clips)
        const clips = this.props.clips.map(clip => {
            return (
                <div>
                <br/>
                <Card>
                    <CardMedia>
                        <Clip key={clip.id} {...clip} />
                    </CardMedia>
                </Card>
                </div>
            );
        });

        return (
            <section className="sound-clips">
                
                {clips}
                <br/>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return { clips: state.clips };
}

export default connect(mapStateToProps, null)(Clips);