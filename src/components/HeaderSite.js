import React from 'react'
import { Image } from 'semantic-ui-react'

import Logo from '../assets/logo.png'

const styles = {
    header: {
      
    }
   
  }

export default class HeaderSite extends React.Component {
    render(){
        return(
            <Image src = {Logo} ></Image>

            /*<Header as='h1' block color='red'  content='Video Party' textAlign = 'center' style={styles.header}>

            </Header>*/
        )
    }
}

  