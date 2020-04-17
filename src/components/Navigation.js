import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap'
import { logout } from '../store'
import { connect } from 'react-redux';



function Navigation({loginState, dlogout}){
    console.log(loginState.id)
    return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Link to='/'><Navbar.Brand >Tutor 2 Tutee</Navbar.Brand></Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto mt-3">
        <Link to="/"><Nav.Link as="p">Home</Nav.Link></Link>
        <Link to="/about"><Nav.Link as="p">About</Nav.Link></Link>
      </Nav>
      <Nav className="mt-3">
        {loginState.id !== ""
        ?<Nav.Link as='p' onClick={dlogout}>Logout</Nav.Link>
        :<Link to="/login"><Nav.Link as="p">Login</Nav.Link></Link>}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    )
}

function mapStateToProps(state, ownProps){
    return {loginState : state,
            props:ownProps};
}

function mapDispatchToProps(dispatch){
    return {
        dlogout: ()=>dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navigation);
// export default Navigation;




// const [classID, setClassID] = useState("");
    

// const onChangeClassID = e => {setClassID(e.target.value);}

// const onClickLogout = () => {dlogout()};

// {/* <h3>This is Navigation Bar </h3>
//             <p>Hello {loginState.id}</p>
//             <form>
//                 {/* 클래스로 이동 */}
//                 {/* <input type='text' value={classID} placeholder="Class ID" onChange={onChangeClassID}/>
//                 <Link to={`/class/${classID}`}><button>Class</button></Link>
//             </form>
            
//             <button onClick={onClickLogout}>Logout</button>

//             <Link to={'/'}><button>Home</button></Link>
//             <Link to={'/about'}><button>About</button></Link>
//             <Link to={'/login'}><button>loginPage</button></Link>
//             <Link to={'/register'}><button>registerPage</button></Link>
//             <Link to={'/makeclass'}><button>MakeClass</button></Link>

//              */} */}