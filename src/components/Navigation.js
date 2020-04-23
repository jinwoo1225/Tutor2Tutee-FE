import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap'
import { logout } from '../store'
import { connect } from 'react-redux';



function Navigation({loginState, dlogout}){
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
        {loginState.user.nickname !== ""
          ?<>
            <Link to="/class/new"><Nav.Link as="p">NewClass</Nav.Link></Link>
            <Link to="/user"><Nav.Link as='p'>Hello, {loginState.user.nickname}</Nav.Link></Link>
            <Nav.Link as='p' onClick={dlogout}>Logout</Nav.Link>
          </>
          :<>
            <Link to="/user/register"><Nav.Link as="p">Register</Nav.Link></Link>
            <Link to="/user/login"><Nav.Link as="p">Login</Nav.Link></Link>
          </>
        }
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