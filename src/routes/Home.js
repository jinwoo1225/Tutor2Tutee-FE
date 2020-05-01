import React, { useState } from "react";
import CardComp from "../components/CardComp";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { checkClass } from "../components/App";
import { updateClass } from "../store";

// checkClass({dispatchClass})
function Home({ loginState, history, dispatchClass }) {
  const [updated, setUpdated] = useState(true);
  if (updated) {
    checkClass({ dispatchClass });
    setUpdated(false);
  }

  return (
    <Container className="pt-3">
      {loginState.user.nickname === "" ? (
        <div className="text-center">
          로그인을 하시면 서비스를 이용할수있어요!
          <Link to="/user/login">
            <Button className="ml-3">로그인하러가기</Button>
          </Link>
        </div>
      ) : (
        <>
          <h4>안녕하세요! {loginState.user.nickname}</h4>
          지금 수강중인 강의 : ...
          <br />
          지금 가르치는 강의 : ...
        </>
      )}
      <CardComp />
    </Container>
  );
}

function mapStateToProps(state, ownProps) {
  return { loginState: state, props: ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchClass: (classes) => dispatch(updateClass(classes)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
