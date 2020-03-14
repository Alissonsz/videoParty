import React from 'react'
import { Button, Form, Grid, Segment, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

export default class LoginPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      
    }

    this.handleExistsRoomNameHasChange = this.handleExistsRoomNameHasChange.bind(this);
    this.handleExistsRoomURLHasChange = this.handleExistsRoomURLHasChange.bind(this);
    this.handleEntryRoom = this.handleEntryRoom.bind(this);
    this.handleNewRoomNameHasChange = this.handleNewRoomNameHasChange.bind(this);
    this.handleNewRoomURLHasChange = this.handleNewRoomURLHasChange.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);

  }

  handleExistsRoomNameHasChange(e){
    this.setState({alreadCreatedName: e.target.value});

    e.preventDefault();
  }

  handleExistsRoomURLHasChange(e){
    this.setState({alreadCreatedURL: e.target.value});

    e.preventDefault();
  }

  handleEntryRoom(e){
    this.props.history.push(`/room/${this.state.alreadCreatedURL}`);
    sessionStorage.setItem("userName", this.state.alreadCreatedName);
  }

  handleNewRoomNameHasChange(e){
    this.setState({newName: e.target.value});

    e.preventDefault();
  }

  handleNewRoomURLHasChange(e){
    console.log(e.target.value);
    this.setState({newURL: e.target.value});

    e.preventDefault();
  }

  handleCreateRoom(e){
    this.props.history.push(`/room/${this.state.newURL}`);
  }


  render(){
    return(
      <Grid container textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large'>
              <Segment stacked>
                <Header as='h2'>Insira uma URL</Header>
                <Form.Input fluid placeholder='Nome de usuário' onChange = { this.handleExistsRoomNameHasChange} />
                <Form.Input fluid placeholder='URL' onChange = { this.handleExistsRoomURLHasChange}/>

                <Button color='teal' fluid size='large' onClick = {this.handleEntryRoom}>
                  Entrar
                </Button>
              </Segment>
          </Form>
          <Header as='h4'>OU</Header>
          <Form size='large'>
            <Segment stacked>
              <Header as='h2'>Crie uma nova sala</Header>
              <Form.Input fluid placeholder='Nome de usuário' onChange = { this.handleNewRoomNameHasChange} />
              <Form.Input fluid placeholder='URL desejada' onChange = { this.handleNewRoomURLHasChange} />

              <Button color='teal' fluid size='large' onClick = {this.handleCreateRoom}>
                Entrar
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }

}
