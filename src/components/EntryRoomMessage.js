import React from 'react'
import {Feed} from 'semantic-ui-react'


export default class EntryRoomMessage extends React.Component{
    render(){
        
        return(
            <Feed.Content style = {{maxWidth: '100%'}}>
                <Feed.Summary>
                    <Feed.User style = {{'color': '#ff0000'}}>{this.props.name}</Feed.User> &nbsp;  <a style = {{'color': '#ff0000'}}>{this.props.message }</a>
                </Feed.Summary>
            </Feed.Content>    
        )    
    }
}
