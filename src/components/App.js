import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from '../routes/Home'
import About from '../routes/About';
import Class from '../routes/Class';
import Navigation from '../components/Navigation'

function App() {
  return (
    <Router>
      <Navigation />
      <Route path='/' exact component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/class/:id'component={Class}/>
    </Router>
  );
}

export default App;
