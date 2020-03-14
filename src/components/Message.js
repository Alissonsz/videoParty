import React from 'react'
import {Feed} from 'semantic-ui-react'

export default class Message extends React.Component {

    render(){
        return(
            <Feed.Content style = {{maxWidth: '100%'}}>
                <Feed.Summary>
                    <Feed.User >{this.props.name} </Feed.User> &nbsp;  {this.props.message}
                </Feed.Summary>
            </Feed.Content>    
        )
    }


}