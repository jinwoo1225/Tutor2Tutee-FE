import React, { useState } from "react";
import Axios from "axios";
import { Container, Card } from "react-bootstrap";
import ClassTab from "../components/ClassTab";

import { statesRaw, classTypes, classTypesRaw, URL } from "../components/App";
import ClassInfo from "../components/ClassInfo";
import ClassJoin from "../components/ClassJoin";

function Class({
  match: {
    params: { id },
  },
  history,
}) {
  const [_class, setClass] = useState({ classLoaded: false });
  const [classState, setClassState] = useState();
  const [classTypeNum, setClassType] = useState();
  const [user, setUser] = useState({ _id: undefined });

  if (_class.classLoaded === false) {
    Axios.get(URL + "class/" + id).then((response) => {
      if (response.data === "fail") {
        history.push("/");
      } else {
        setClass(response.data);
        setClassState(statesRaw.indexOf(response.data.state));
        setClassType(classTypesRaw.indexOf(response.data.classType));
      }
    });
    setClass({ classLoaded: true });
  }

  if (user._id === undefined) {
    checkAuth();
  }

  function checkAuth() {
    Axios.get(URL + "auth/isAuthenticated").then((response) => {
      response.data !== "fail" ? setUser(response.data) : setUser({ _id: "" });
    });
    setUser({ _id: "" });
  }

  function startClass() {
    Axios.get(URL + "class/" + id + "/start").then((response) => {
      alert(response.data);
      setClass({ classLoaded: false });
    });
  }

  function endClass() {
    Axios.get(URL + "class/" + id + "/end").then((response) => {
      setClass({ classLoaded: false });
    });
  }

  function joinClass() {
    Axios.get(URL + "class/" + id + "/join").then((response) => {
      if (response.data === "fail") {
        alert("문제가 있네요!");
      } else {
        alert("정상적으로 수강 신청했어요!");
        setClass({ classLoaded: false });
        checkAuth();
      }
    });
  }

  function quitClass() {
    Axios.get(URL + "class/" + id + "/quit").then(({ data }) => {
      if (data === "fail") {
        alert("문제가 있어요!!");
      } else {
        alert("정상적으로 수업에 탈퇴했어요!");
        setClass({ classLoaded: false });
        checkAuth();
      }
    });
  }

  return (
    <Container className="mt-3">
      <Card body bg="light">
        {_class._id === id && (
          <>
            <ClassInfo
              ClassInfo={_class}
              classTypeString={classTypes[classTypeNum]}
            />
            <hr></hr>
            <ClassJoin
              ClassInfo={_class}
              UserInfo={user}
              classState={classState}
              classTypeNum={classTypeNum}
              amITutor={_class.tutor === user._id}
              amIGuest={user._id === ""}
              startClass={startClass}
              endClass={endClass}
              joinClass={joinClass}
              quitClass={quitClass}
            />
            <ClassTab
              classInfo={_class}
              userInfo={user}
              classType={classTypeNum}
              amITutor={_class.tutor === user._id}
              setClass={setClass}
            />
          </>
        )}
      </Card>
    </Container>
  );
}

export default Class;
