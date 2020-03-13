import React from 'react'
import { Container,Input } from 'semantic-ui-react'

const styles = {
    chat: {
        position: 'absolute',
        bottom: '5px',
        width: '100%',
        padding: '2%'
    }
}

export default class Chat extends React.Component {
    render(){
        return(
            
            <Input style={styles.chat} focus fluid icon='angle right' placeholder='Type a message' />
            
        )
    }
}