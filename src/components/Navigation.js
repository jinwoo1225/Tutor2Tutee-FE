import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {login, logout} from '../store'
import { connect } from 'react-redux';

function Navigation({loginState, dlogout}){
    const [classID, setClassID] = useState("");
    

    const onChangeClassID = e => {setClassID(e.target.value);}
    
    const onClickLogout = () => {dlogout()};

    return(<>
            <h3>This is Navigation Bar </h3>
            <p>Hello {loginState.id}</p>
            <form>
                {/* 클래스로 이동 */}
                <input type='text' value={classID} placeholder="Class ID" onChange={onChangeClassID}/>
                <Link to={`/class/${classID}`}><button>Class</button></Link>
            </form>
            
            <button onClick={onClickLogout}>Logout</button>

            <Link to={'/'}><button>Home</button></Link>
            <Link to={'/about'}><button>About</button></Link>
            <Link to={'/login'}><button>loginPage</button></Link>
            <Link to={'/register'}><button>registerPage</button></Link>
            <Link to={'/makeclass'}><button>MakeClass</button></Link>

            
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