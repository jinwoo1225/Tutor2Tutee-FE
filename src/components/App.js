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
import User from '../routes/User';
import { addClass, updateUser } from '../store';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

//서버주소
export const URL = "http://tutor2tutee.ddns.net:3000/";

function App({dispatchClass, dispatchUser}) {
  //초기 시작되면 구동되는 코드
  updateClass({dispatchClass})
  checkAuth({dispatchUser});
  return (
    <Router>
      <Navigation />
      <Route path='/' exact component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/user' exact component={User}/>
      <Route path='/user/login' component={Login}/>
      <Route path='/user/register' component={Register}/>
      <Route path='/class/id/:id' exact component={Class}/>
      <Route path='/class/new' exact component={MakeClass}/>
    </Router>
  );
}

//현재 세션이 유효한지 확인하는 function
export const checkAuth = ({dispatchUser}) => {
  Axios.get(URL + 'auth/isAuthenticated')
  .then( response => {
    response.data === 'fail'
    ? console.log('failed to auth')
    : dispatchUser(response.data)
  })
  .catch( error => {
    console.log(error);
    alert('failed to get authentication');
  })
}

//받아온 Class를 업데이트하는 function
export function updateClass({dispatchClass}){
  Axios.get(URL + "class/name/all")
          .then( async response=>{
              console.log(response.data)  
              await dispatchClass(response.data)        
          })
          .catch(error=>{
              console.log(error)
          })
}

//store.js
function mapDispatchToProps(dispatch) {
  return {
    dispatchClass: classes => dispatch(addClass(classes)),
    dispatchUser: data => dispatch(updateUser(data)),
  }
}



export default connect(null, mapDispatchToProps) (App);
