import React from 'react';
import { Container, Grid, GridColumn, Button, Feed, Input, Form } from 'semantic-ui-react'
import openSocket from 'socket.io-client';
import HeaderSite from './HeaderSite'
import VideoPlayer from './VideoPlayer'
import Chat from './Chat'
import VideoName from './VideoName'
import Loading from './Loading'

const styles = {
  root: {
    marginTop: 0
  },
  auxGrid: {
    paddingRight: '3px',
    paddingLeft: 0
  },
  rightColumn: {
    padding: 0,
    posiiton: 'relative',
    background: '#ffffff'
  },
  chat: {
      position: 'absolute',
      bottom: '5px',
      width: '100%',
      padding: '2%',
      display: 'flex'
  }
}

export default class MainPage extends React.Component{
    constructor(props){

      let dict = new Object();
      super(props);

      this.state = {
        loading: true,
        connected: false,
        userName: sessionStorage.getItem("userName"),
        roomURL: this.props.location.pathname, 
        socket: null,
        newMessage: '',
        roomEvents: []
      }

      this.sendMessage = this.sendMessage.bind(this);
      this.typingMessage = this.typingMessage.bind(this);
    }

    componentDidMount(){
      const socket = openSocket('http://localhost:8000');
      
      socket.on('connect', () => {
        this.setState({loading: false});
      })

      let sessionInfo = {
        userName: this.state.userName,
        roomURL: this.state.roomURL
      }

      socket.emit('entryRoom', sessionInfo);
      this.setState({'socket': socket});

      socket.on('newEvent', data => {
        this.setState({roomEvents: [...this.state.roomEvents, data]});

        console.log(data);
      });
      
    }

    sendMessage(e){
      let message = {
        userName: this.state.userName,
        roomURL: this.state.roomURL,
        message: this.state.newMessage
      }
      this.state.socket.emit('newMessage', message);

      this.setState({newMessage: ''});
    
    }

    typingMessage(e){
      this.setState({newMessage: e.target.value});

      e.preventDefault();
    }

    render(){
        return (
            this.state.loading == true ? <Loading /> :
            <Grid container style={styles.root} >
                <HeaderSite></HeaderSite>
                <Grid container style={styles.auxGrid} >
                <Grid.Row >
                   
                    <Grid.Column width={11}>
                      <VideoPlayer/>
                    </Grid.Column>

                    <Grid.Column style={styles.rightColumn} width={5}>
                      <Feed >
                        {this.state.roomEvents.map( (event, i) => {
                          //console.log(this.state.roomEvents[i]);
                          return <Chat type = {this.state.roomEvents[i].type} message = {this.state.roomEvents[i].message} name = {this.state.roomEvents[i].userName} sendMessage = {this.sendMessage}/>
                        })}
                        <Form style={styles.chat}>
                          <Form style={{width: '100%', display: 'flex'}}>
                            <Input style={{width: '100%'}} focus   placeholder='Type a message' onChange = {this.typingMessage} value = {this.state.newMessage} />
                            <Button size = 'tiny' icon = 'right arrow' onClick = {this.sendMessage}/>
                          </Form>
                          
         
                        </Form>
                      </Feed>
  
                      
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row>
                    <GridColumn>
                      <VideoName tittle='Video name'/>
                    </GridColumn>
                </Grid.Row>
                </Grid>
                
            </Grid>
            
        )
    }
}