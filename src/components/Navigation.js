import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { logout } from "../store";
import { connect } from "react-redux";

function Navigation({ loginState, dlogout, history }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/#/">Tutor 2 Tutee</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto my-auto">
          <Nav.Link href="/#/">홈</Nav.Link>
          <Nav.Link href="/#/about">튜터2튜티는??</Nav.Link>
        </Nav>
        <Nav className="my-auto">
          {loginState.user.nickname !== "" ? (
            <>
              <Nav.Link>나의 포인트 : {loginState.user.point}</Nav.Link>
              <Nav.Link href="/#/class/new">클래스 만들기</Nav.Link>
              <Nav.Link href="/#/user">
                Hello, {loginState.user.nickname}
              </Nav.Link>
              <Nav.Link onClick={dlogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/#/user/register/">회원가입</Nav.Link>
              <Nav.Link href="/#/user/login/">로그인</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function mapStateToProps(state) {
  return { loginState: state };
}

function mapDispatchToProps(dispatch) {
  return {
    dlogout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
