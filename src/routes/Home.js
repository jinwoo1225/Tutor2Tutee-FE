import React, { useState } from "react";
import JoinableClass from "../components/JoinableClass";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { checkClass } from "../components/App";
import { updateClass } from "../store";
import WhatIs from "../components/WhatIs";
import CurrentClass from "../components/CurrentClass";
import SearchBar from "../components/SearchBar";

function Home({ user, dispatchClass, history }) {
  // 홈화면, 유저가 처음 로그인하면 보는 컴포넌트/ 라우트
  const [updated, setUpdated] = useState(true);

  if (updated) {
    checkClass({ dispatchClass });
    setUpdated(false);
  }

  return (
    <Container className="pt-3">
      <SearchBar history={history} />
      {user.nickname === "" ? (
        //유저가 로그인 하지않으면
        <WhatIs />
      ) : (
        //유저가 로그인에 성공했으면 현재 진행중인 강의를 표시
        <CurrentClass />
      )}
      <JoinableClass />
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
