import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {login, logout} from '../store'
import { connect } from 'react-redux';

function Navigation({loginState, props, dlogin, dlogout}){
    const [classID, setClassID] = useState("");
    const [userID, setUserID] = useState("");

    const onChangeClassID = e => {setClassID(e.target.value);}
    const onChangeUserID = e => {setUserID(e.target.value)};

    const onClickLogin = () => {dlogin(userID)};
    const onClickLogout = () => {dlogout()};
    

    return(<>
            <h3>This is Navigation Bar </h3>
            <p>Hello {loginState.id}</p>
            <form>
                {/* 클래스로 이동 */}
                <input type='text' value={classID} placeholder="Class ID" onChange={onChangeClassID}/>
                <Link to={`/class/${classID}`}><button>Class</button></Link>
            </form>
            <form>
                {/* 로그인 */}
                <input type='text' value={userID} placeholder="User ID" onChange={onChangeUserID}/>
                <button onClick={onClickLogin}>Login</button>
            </form>

            <Link to={'/'}><button>Home</button></Link>
            <Link to={'/about'}><button>About</button></Link>

            
            
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