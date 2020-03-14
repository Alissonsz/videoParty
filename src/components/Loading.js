import React from 'react'

import { Loader, Header } from 'semantic-ui-react'


function Loading(){

    return (
        <div style={{paddingTop: '15%'}}>
            <Header as='h2' textAlign='center' content='Conectando...' />
            <Loader active inline='centered' />
        </div>
        
    );

}

export default Loading