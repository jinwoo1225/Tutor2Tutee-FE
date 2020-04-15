import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Home from '../routes/Home'
import About from '../routes/About';
import Class from '../routes/Class';
import Login from '../routes/Login';
import Register from '../routes/Register';


function App() {
  return (
    <Router>
      <Navigation />
      <Route path='/' exact component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/class/:id'component={Class}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Router>
  );
}

export default App;
