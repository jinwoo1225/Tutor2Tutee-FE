import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {login, logout} from '../store'
import { connect } from 'react-redux';

function Navigation({loginState, props, dlogin, dlogout}){
    const [classID, setClassId] = useState("");

    const onChangeClassID = e => {
        setClassId(e.target.value);
    }

    const onSubmitClassID = e =>{
        e.preventDefault();
        
        setClassId("");
    }
    const onClickLogin = () => {dlogin("Hello")}
    const onClickLogout = () => {dlogout()}
    

    return(<>
            <h1>This is Navigation Bar</h1>
            <h2> user.id : {loginState.id}</h2>
            <form onSubmit={onSubmitClassID}>
                {/* 클래스로 이동 */}
                <input type='text' value={classID} placeholder="Class ID" onChange={onChangeClassID}/>
                <Link to={`/class/${classID}`}><button>Class</button></Link>
            </form>
            <Link to={'/about'}><button>About</button></Link>

            {/* 로그인 */}
            <button onClick={onClickLogin}>Login</button>
            <button onClick={onClickLogout}>Logout</button>
        </>
    )
}

function mapStateToProps(state, ownProps){
    return {loginState : state,
            props:ownProps};
}

function mapDispatchToProps(dispatch){
    return {
        dlogin: text=>dispatch(login(text)),
        dlogout: ()=>dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navigation);