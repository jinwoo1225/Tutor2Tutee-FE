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


function App({dispatchClass}) {
  updateClass({dispatchClass})
  // setInterval(() => {
  //   updateClass(dispatchClass)
  
  // }, 10000);
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

export function updateClass({dispatchClass}){
  Axios.get("http://tutor2tutee.ddns.net:3000/class/all")
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
