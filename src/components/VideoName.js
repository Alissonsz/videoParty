import React from 'react'
import {Container, Header} from 'semantic-ui-react'

const styles = {
    videoName: {
        height: '25%'
    }
}

export default class extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tittle: ''
        }
    }
    render(){
        return(
            <Header as='h2' textAlign='left' content={this.props.tittle}></Header>
        )
    }
}