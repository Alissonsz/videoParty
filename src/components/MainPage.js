import React from 'react';

import { Grid, Button, Feed, Input, Form, Image } from 'semantic-ui-react'
import openSocket from 'socket.io-client';

import HeaderSite from './HeaderSite'
import VideoPlayer from './VideoPlayer'
import Chat from './Chat'
import Loading from './Loading'

import '../css/index.css'


import noVideoImage from '../assets/videoicon.png'

const styles = {
  root: {
    width: '100%!important',
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
    overflowY: 'auto',
    marginBottom: '15%'
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
        playState: 'pause',
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
        this.setState({roomEvents: [...this.state.roomEvents, data]},
          () => {
            this.scrollToBottom();
          });

      });

      socket.on('videoHasChange', data => {
        this.setState({currentPlaying: data.videoURL});
        this.setState({videoURL: data.videoURL});
      });

      socket.on('changePlay', data => {
        if(this.state.playState != data.event){
          this.setState({playState: data.event});
          this.setState({playing: !this.state.playing});
        
        }  
      });

      this.scrollToBottom();
      
    }

    scrollToBottom = () => {
      var scrollingElement = document.getElementById("feedDiv");
      if(scrollingElement != undefined)
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
    };

    scrollToBottom() {
      var scrollingElement = (document.scrollingElement || document.body); /* you could provide your scrolling element with react ref */
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
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
      //this.setState({playState: 'play'});
      let data = {
        userName: this.state.userName,
        roomURL: this.state.roomURL,
        event: 'play'
      }
      this.state.socket.emit('changePlay', data);
      
    }

    hasPause(){
      //this.setState({playState: 'pause'});
      let data = {
        userName: this.state.userName,
        roomURL: this.state.roomURL,
        event: 'pause'
      }
      this.state.socket.emit('changePlay', data);
    }

    hasSeek(time){
      console.log(time);
    }

    render(){
        return (
            this.state.loading == true ? <Loading /> :
            <div className = "mainGrid" >
                
                <Grid  style={styles.root} >
                <Grid.Row style={{justifyContent: 'center', paddingBottom: '0'}}>
                  <Grid.Column width={4}>
                    <HeaderSite></HeaderSite>
                  </Grid.Column>
                  <Grid.Column width={12} style={{display: 'flex',alignItems: 'center', justifyContent: 'centered'}}>
                    <Form style={{width: '100%', display: 'flex'}}>
                      <Input  style={{width: '75%'}} size='large' focus  placeholder='Insira a URL do vídeo' value = {this.state.videoURL} onChange = {this.changeVideoUrl} />
                      <Button style={{width: '5%', backgroundColor: '#f5f5f5'}} fluid size = 'tiny' icon = 'right arrow' onClick = {this.chooseVideo}/>
                    </Form>
                  </Grid.Column>
                </Grid.Row>  
                <Grid.Row>
                   
                    <Grid.Column className = "leftColumn" style={{justifyContent: 'center', display: 'flex', background: 'whitesmoke', alignItems: 'center'}}>
                      {!this.state.currentPlaying ? <Image width = '30%' height = '50%' src = {noVideoImage}></Image> :
                      <VideoPlayer url = {this.state.videoURL} playing = {this.state.playing} hasPlay = {this.hasPlay} hasPause = {this.hasPause} hasSeek = {this.hasSeek} />}
                    </Grid.Column>

                    <Grid.Column className= "rightColumn" style={styles.rightColumn} >
                      <Feed id = "feedDiv" style = {styles.feedStyle}>
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
                
            </div>
            
        )
    }
}