import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './page/login';
import Signup from './page/signup';
import Homepage from './page/homepage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Login} ></Route>
            <Route path='/home' component={Homepage} ></Route>
            <Route path='/signup' component={Signup}></Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
