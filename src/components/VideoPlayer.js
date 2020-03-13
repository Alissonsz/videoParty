import React from 'react'
import videoIcon from '../assets/videoicon.png'

const styles = {
    icon: {
        width: '100%',
        display: 'block',
        padding: '2%'

    }
}

export default class VideoPlayer extends React.Component {
    render(){
        return(
            <img style={styles.icon} src={videoIcon} alt='videoIcon'/>
        )
    }
}