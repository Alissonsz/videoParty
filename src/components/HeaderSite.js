import React from 'react'
import { Header } from 'semantic-ui-react'

const styles = {
    header: {
      display: 'block',
      width: '100%',
    }
   
  }

export default class HeaderSite extends React.Component {
    render(){
        return(
            <Header as='h1' block color='red'  content='Video Party' textAlign = 'center' style={styles.header}>

            </Header>
        )
    }
}

  