import React from 'react'
import { Container, Input, Feed, Button, Form } from 'semantic-ui-react'

import Message from './Message'
import EntryRoomMessage from './EntryRoomMessage'

const styles = {
    chat: {
        position: 'absolute',
        bottom: '5px',
        width: '100%',
        padding: '2%'
    }

    
}

export default class Chat extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            message: ''
        } 

        
    }

    render(){
        return(
            <Feed.Event style={{padding: '3%'}}>
                {this.props.type == "join" ? <EntryRoomMessage name = {this.props.name} message = {this.props.message} /> : <Message name = {this.props.name} message = {this.props.message}/>}
                
            </Feed.Event>
        )
    }
}