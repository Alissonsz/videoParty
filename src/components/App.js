import React from 'react';

import { 
	BrowserRouter as Router, 
	Route, 
	Switch,
	Redirect 
} from "react-router-dom";


import MainPage from './MainPage'
import LoginPage from './LoginPage'
import Error from './Error'


function App() {

  return (
    <Switch>
      <Route path = '/' component = {LoginPage} exact />
      <Route path = '/room/:roomURL' component = {MainPage} />
      <Route component = {Error} />
    </Switch>
  )  
}

export default App;
