import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react'
import HeaderSite from './HeaderSite'
import VideoPlayer from './VideoPlayer'
import Chat from './Chat'
import VideoName from './VideoName'

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
    posiiton: 'relative'
  }
}

export default class MainPage extends React.Component{
    render(){
        return (
            <Grid container style={styles.root} >
                <HeaderSite></HeaderSite>
                <Grid container style={styles.auxGrid} >
                <Grid.Row >
                    <Grid.Column width={11}>
                      <VideoPlayer/>
                    </Grid.Column>
                    <Grid.Column style={styles.rightColumn} color='blue' width={5}>
                      <Chat/>
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