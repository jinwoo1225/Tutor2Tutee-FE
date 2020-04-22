import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Navigation from '../components/Navigation'
import Home from '../routes/Home'
import About from '../routes/About';
import Class from '../routes/Class';
import Login from '../routes/Login';
import Register from '../routes/Register';
import MakeClass from '../routes/MakeClass';
import { addClass } from '../store';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const URL = "http://tutor2tutee.ddns.net:3000/";

function App({dispatchClass}) {
  updateClass({dispatchClass})
  return (
    <Router>
      <Navigation />
      <Route path='/' exact component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/user/login' component={Login}/>
      <Route path='/user/register' component={Register}/>
      <Route path='/class/id/:id' exact component={Class}/>
      <Route path='/class/new' exact component={MakeClass}/>
    </Router>
  );
}

export function updateClass({dispatchClass}){
  Axios.get(URL + "class/name/all")
          .then( async response=>{
              console.log(response.data)  
              dispatchClass(response.data)        
          })
          .catch(error=>{
              console.log(error)
          })
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchClass: classes => dispatch(addClass(classes)),
  }
}



export default connect(null, mapDispatchToProps) (App);
