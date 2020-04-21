import React, {useState} from 'react';
import { login, logout } from '../store'
import { connect } from 'react-redux';
import Axios from 'axios';

function Login({dlogin, dlogout}) {
    const [userID, setUserID] = useState("");
    const [userPW, setPassword] = useState("");
    const onChangeUserID = e => {setUserID(e.target.value)};
    const onChangePasswd = e => {setPassword(e.target.value)};

    const onClickLogin = () => {
        dlogin(userID)
        Axios.post('http://tutor2tutee.ddns.net:3000/auth/login',{
            username:userID,
            password:userPW,
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
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