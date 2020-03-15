import React from 'react';
import { Grid, Button, Feed, Input, Form, Image } from 'semantic-ui-react'
import openSocket from 'socket.io-client';

import HeaderSite from './HeaderSite'
import VideoPlayer from './VideoPlayer'
import Chat from './Chat'
import Loading from './Loading'


import noVideoImage from '../assets/videoicon.png'

const styles = {
  root: {
    marginTop: '10px',
    width: '80%',
    marginRight: '0!important',
    marginLeft: '0!important'
  },
  auxGrid: {
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
  },
  feedStyle: {
    height: '700px',
    overflowY: 'auto'
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
        videoURL: null,
        currentPlaying: null,
        playing: false,
        roomEvents: []
      }

      this.sendMessage = this.sendMessage.bind(this);
      this.typingMessage = this.typingMessage.bind(this);
      this.changeVideoUrl = this.changeVideoUrl.bind(this);
      this.chooseVideo = this.chooseVideo.bind(this);
      this.hasPlay = this.hasPlay.bind(this);
      this.hasPause = this.hasPause.bind(this);
      this.hasSeek = this.hasSeek.bind(this);
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

      socket.on('entryRoomResponse', data => {
        this.setState({videoURL: data, currentPlaying: data});
      });

      socket.on('newEvent', data => {
        this.setState({roomEvents: [...this.state.roomEvents, data]});

      });

      socket.on('videoHasChange', data => {
        this.setState({currentPlaying: data.videoURL});
        this.setState({videoURL: data.videoURL});
      });

      socket.on('changePlay', data => {
        if(data.userName != this.state.userName){
          this.setState({playing: !this.state.playing})
        }  
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

      e.preventDefault();
    }

    typingMessage(e){
      this.setState({newMessage: e.target.value});

      e.preventDefault();
    }

    changeVideoUrl(e){
      this.setState({videoURL: e.target.value});



      e.preventDefault();
    }

    chooseVideo(e){
      let message = {
        roomURL: this.state.roomURL,
        type: 'videoHasChange',
        videoURL: this.state.videoURL
      }
    
      this.state.socket.emit('videoHasChange', message);
      
      this.setState({videoURL: ''});
      e.preventDefault();
    }

    hasPlay(){
      let data = {
        userName: this.state.userName,
        roomURL: this.state.roomURL
      }
      this.state.socket.emit('changePlay', data);
      
    }

    hasPause(){
      let data = {
        userName: this.state.userName,
        roomURL: this.state.roomURL
      }
      this.state.socket.emit('changePlay', data);
    }

    hasSeek(time){
      console.log(time);
    }

    render(){
        return (
            this.state.loading == true ? <Loading /> :
            <Grid className = 'mainGrid'style={styles.root} container fluid >
                
                <Grid container style={styles.root} >
                <Grid.Row style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                  <HeaderSite></HeaderSite>
                </Grid.Row>  
                <Grid.Row style={{justifyContent: 'center'}}>
                  
                  <Form style={{width: '75%', display: 'flex', justifyContent: 'centered'}}>
                    <Input  style={{width: '75%'}} size='large' focus  placeholder='Insira a URL do vídeo' value = {this.state.videoURL} onChange = {this.changeVideoUrl} />
                    <Button style={{width: '5%', backgroundColor: '#f5f5f5'}} fluid size = 'tiny' icon = 'right arrow' onClick = {this.chooseVideo}/>
                  </Form>
                 
                
                </Grid.Row>  
                <Grid.Row >
                   
                    <Grid.Column width={12} style={{justifyContent: 'center', display: 'flex', background: 'whitesmoke', alignItems: 'center'}}>
                      {!this.state.currentPlaying ? <Image width = '30%' height = '50%' src = {noVideoImage}></Image> :
                      <VideoPlayer url = {this.state.videoURL} playing = {this.state.playing} hasPlay = {this.hasPlay} hasPause = {this.hasPause} hasSeek = {this.hasSeek} />}
                    </Grid.Column>

                    <Grid.Column style={styles.rightColumn} width={4}>
                      <Feed style = {styles.feedStyle}>
                        {this.state.roomEvents.map( (event, i) => {
                          //console.log(this.state.roomEvents[i]);
                          return <Chat type = {this.state.roomEvents[i].type} message = {this.state.roomEvents[i].message} name = {this.state.roomEvents[i].userName} sendMessage = {this.sendMessage}/>
                        })}
                      </Feed>
                      <Form style={styles.chat}>
                        <Form style={{width: '100%', display: 'flex'}}>
                          <Input style={{width: '100%'}} focus   placeholder='Digite a sua mensagem' onChange = {this.typingMessage} value = {this.state.newMessage} />
                          <Button size = 'tiny' icon = 'right arrow' onClick = {this.sendMessage}/>
                        </Form>
                          
         
                      </Form>
  
                      
                    </Grid.Column>

                </Grid.Row>
                </Grid>
                
            </Grid>
            
        )
    }
}