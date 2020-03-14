import React from 'react'
import { Button, Form, Grid, Segment, Header } from 'semantic-ui-react'

const LoginPage = () => (
  <Grid container textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size='large'>
          <Segment stacked>
          <Header as='h2'>Insira uma URL</Header>
            <Form.Input fluid placeholder='Nome de usuário' />
            <Form.Input fluid placeholder='URl' />

            <Button color='teal' fluid size='large'>
              Entrar
            </Button>
          </Segment>
      </Form>
      <Header as='h4'>OU</Header>
      <Form size='large'>
        <Segment stacked>
          <Header as='h2'>Crie uma nova sala</Header>
          <Form.Input fluid placeholder='Nome de usuário' />
          <Form.Input fluid placeholder='URL desejada'/>

          <Button color='teal' fluid size='large'>
            Entrar
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)

export default LoginPage