import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from '../routes/Home'

function App() {
  return (
    <Router>
      <Route path='/' exact component={Home}/>
      <Route />
      
    </Router>
  );
}

export default App;
