import React, { useState } from "react";
import CardComp from "../components/CardComp";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { checkClass } from "../components/App";
import { updateClass } from "../store";
import WhatIs from "../components/WhatIs";
import CurrentClass from "../components/CurrentClass";

function Home({ user, dispatchClass }) {
  // 홈화면, 유저가 처음 로그인하면 보는 컴포넌트/ 라우트
  const [updated, setUpdated] = useState(true);

  if (updated) {
    checkClass({ dispatchClass });
    setUpdated(false);
  }

  return (
    <Container className="pt-3">
      {user.nickname === "" ? (
        //유저가 로그인 하지않으면
        <WhatIs />
      ) : (
        //유저가 로그인에 성공했으면 현재 진행중인 강의를 표시
        <CurrentClass />
      )}
      <CardComp />
    </Container>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchClass: (classes) => dispatch(updateClass(classes)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
