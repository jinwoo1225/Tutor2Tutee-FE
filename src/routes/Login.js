import React, {useState} from 'react';
import { login, logout } from '../store'
import { connect } from 'react-redux';
import Axios from 'axios';
import jquery from 'jquery'

import {URL} from '../components/App'

function Login({dlogin, dlogout}) {
    const [userID, setUserID] = useState("");
    const [userPW, setPassword] = useState("");
    const onChangeUserID = e => {setUserID(e.target.value)};
    const onChangePasswd = e => {setPassword(e.target.value)};

    const onClickLogin = () => {
        dlogin(userID);
        // failed to use axios to post
        // will be change Soon
        // Axios.post("http://tutor2tutee.ddns.net:3000/auth/login",{
        //     data:data
        // })
        // .then(response => {
        //     console.log(response)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        
        jquery.ajax({
            type: "POST",
            url: URL + "auth/login",
            data :"username=" + userID + "&password=" + userPW,
            dataType: "text",
            success: (res)=>{
                if(res === 'success'){
                    //로그인 성공
                    console.log('로그인 성공')
                }else{
                    //로그인 실패
                    alert('로그인 실패');
                }
            },
            error: (xhr, status, responseTxt)=>{
                console.log(xhr);
            }
        })

    };

    
    const CheckAuth = () => {Axios.get("http://tutor2tutee.ddns.net:3000/auth/isAuthenticated").then(response=>console.log(response))};
    return(
    <>
        <h1>This is Login page</h1>
        <form>
            {/* 로그인 */}
            <input type='text' value={userID} placeholder="User ID" onChange={onChangeUserID}/>
            <input type='text' value={userPW} placeholder="User Password" onChange={onChangePasswd}/>
            <button onClick={onClickLogin}>Login</button>
        </form>
        <button onClick={CheckAuth}>CheckAuth</button>
    </>
    )
}

function mapDispatchToProps(dispatch){
    return {
        dlogin: text=>dispatch(login(text)),
        dlogout: ()=>dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps) (Login);