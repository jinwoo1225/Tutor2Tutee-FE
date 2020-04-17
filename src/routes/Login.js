import React, {useState} from 'react';
import {login, logout} from '../store'
import { connect } from 'react-redux';

function Login({dlogin, dlogout}) {
    const [userID, setUserID] = useState("");
    const [userPW, setPassword] = useState("");
    const onChangeUserID = e => {setUserID(e.target.value)};
    const onChangePasswd = e => {setPassword(e.target.value)};

    const onClickLogin = () => {dlogin(userID)};

    const onSubmit = e => {
        console.log({
            userID,
            userPW
        })
        dlogin(userID)
    }
    return(
    <>
        <h1>This is Login page</h1>
        <form onSubmit={onSubmit}>
            {/* 로그인 */}
            <input type='text' value={userID} placeholder="User ID" onChange={onChangeUserID}/>
            <input type='text' value={userPW} placeholder="User Password" onChange={onChangePasswd}/>
            <button onClick={onClickLogin}>Login</button>
        </form>
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