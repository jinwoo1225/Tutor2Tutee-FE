import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import { URL } from "../components/App";

function User({ history }) {
  const [user, setUserInfo] = useState({ isDataQuerried: false, nickname: "" });
  const [classes, setClasses] = useState([]);
  if (user.isDataQuerried === false) {
    Axios.get(URL + "auth/isAuthenticated").then((response) => {
      if (response.data === "fail") {
        alert("잘못된 접근입니다.");
        history.push("/");
      } else {
        setUserInfo(response.data);
        console.log(response.data);
      }
    });
    Axios.get(URL + "class/name/all").then((response) => {
      setClasses(response.data);
      console.log(response.data);
    });
    setUserInfo({ isDataQuerried: true });
  }

  if (classes.length) {
    user.classesAsTutor.map((classID) => {
      const className = classes.filter((_class) => {
        return _class._id === classID;
      });
      console.log(className[0].className);
    });
  }

  return (
    <Container>
      {user.nickname === "" ? null : (
        <>
          <h1>안녕하세요! {user.nickname}님!</h1>
          <h2>이메일 : {user.webmail}</h2>
          <h2>현재 나의 포인트 : {user.point}</h2>
          <p>classesAsTutor</p>
          {classes.length && user.classesAsTutor.length ? (
            <ol>
              {user.classesAsTutor.map((classID) => {
                const _class = classes.filter((_class) => {
                  return _class._id === classID;
                });
                return <li>{_class[0].className}</li>;
              })}
            </ol>
          ) : (
            <p>개설한 수업이 없네요! 개설하시겠어요? Button</p>
          )}
          <p>classesAsTutee</p>
          {classes.length && user.classesAsTutee.length ? (
            <ol>
              {user.classesAsTutee.map((classID) => {
                const _class = classes.filter((_class) => {
                  return _class._id === classID;
                });
                return <li>{_class[0].className}</li>;
              })}
            </ol>
          ) : (
            <p>수강하시는 수업이 없네요? 수강하시겠어요? Button</p>
          )}
        </>
      )}
    </Container>
  );
}
export default User;
