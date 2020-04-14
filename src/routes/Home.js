import React, { useState } from 'react';
import { connect } from 'react-redux';
import {login, logout} from '../store'

function Home({loginState, dlogin, dlogout}){
    const [text, setText] = useState("");
    const onChange = e => {
        setText(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        dlogin(text)
        setText("");
    }
    
    return(
        <>
            <h1>Current State</h1>
            <h4>{loginState}</h4>
            <form onSubmit={onSubmit}>
                <input type='text' value={text} placeholder="id" onChange={onChange}/>
                <button>Login</button>
            </form>
            <button onClick={dlogout}>Logout</button>
        </>
    )
}

function mapStateToProps(state, ownProps){
    // {match:{params:{id}}}
    return {loginState : state};
}

function mapDispatchToProps(dispatch){
    return {
        dlogin: text=>dispatch(login(text)),
        dlogout: ()=>dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home)