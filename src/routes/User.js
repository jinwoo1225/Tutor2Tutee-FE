import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import { URL } from "../components/App";
import CurrentClass from "../components/CurrentClass";

function User({ history }) {
  // 유저 정보를 확인할때 사용되는 컴포넌트 & 라우트

  //isDataQuerried ==> data를 요청했는지 확인하는 State.var
  const [user, setUserInfo] = useState({ isDataQuerried: false, nickname: "" });

  if (user.isDataQuerried === false) {
    Axios.get(URL + "auth/isAuthenticated").then((response) => {
      if (response.data === "fail") {
        alert("잘못된 접근입니다.");
        history.push("/");
      } else {
        setUserInfo(response.data);
      }
    });

    setUserInfo({ isDataQuerried: true });
  }
  return (
    <Container>
      {user.nickname === "" ? null : ( //유저 정보가 불러와지지 않았을때
        //유저정보가 불러와졌을때
        <>
          <h1>안녕하세요! {user.nickname}님!</h1>
          <h2>이메일 : {user.webmail}</h2>
          <h2>현재 나의 포인트 : {user.point}</h2>
          <CurrentClass />
        </>
      )}
    </Container>
  );
}
export default User;
