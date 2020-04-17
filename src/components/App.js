import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Home from '../routes/Home'
import About from '../routes/About';
import Class from '../routes/Class';
import Login from '../routes/Login';
import Register from '../routes/Register';
import MakeClass from '../routes/MakeClass';
import Axios from 'axios';


function App() {
  Axios.get("http://tutor2tutee.ddns.net:3000/class/all")
        .then(response=>{
            console.log(response)
            console.log(response.data)
            console.log(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
        .then(()=>{
            console.log("hello");
        })
  return (
    <Router>
      <Navigation />
      <Route path='/' exact component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/class/:id'component={Class}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/makeclass' component={MakeClass}/>
    </Router>
  );
}

export default App;
