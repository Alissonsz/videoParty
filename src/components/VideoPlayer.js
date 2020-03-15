import React from 'react'
import videoIcon from '../assets/videoicon.png'
import ReactPlayer from 'react-player'

const styles = {
    icon: {
        width: '100%',
        height: '100%',
        display: 'block',
        padding: '2%'

    }
}

export default class VideoPlayer extends React.Component {
    render(){
        return(
            <ReactPlayer url={this.props.url} loop={true} playing = {this.props.playing} onPlay={this.props.hasPlay} onPause={this.props.hasPause} youtubeConfig={{ playerVars: { origin: 'http://localhost:3000/', controls: 1 } }} width = '100%' height = '100%' />
        )
    }
}