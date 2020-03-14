import React from 'react';
import openSocket from 'socket.io-client';

import { 
	BrowserRouter as Router, 
	Route, 
	Switch,
	Redirect 
} from "react-router-dom";


import MainPage from './MainPage'
import LoginPage from './LoginPage'
import Error from './Error'

const styles = {
  root: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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


function App() {
  const socket = openSocket('http://localhost:8000');

  return (
    <Switch>
      <Route path = '/' component = {LoginPage} exact />
      <Route path = '/room' component = {MainPage} />
      <Route component = {Error} />
    </Switch>
  )  
}

export default App;
