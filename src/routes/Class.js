import React, { useState } from "react";
import Axios from "axios";
import { Container, Button, Card } from "react-bootstrap";
import ClassTab from "../components/ClassTab";

import {
  states,
  statesRaw,
  classTypes,
  classTypesRaw,
  URL,
} from "../components/App";
import { Link } from "react-router-dom";

const joinClass = (id, setClass) => {
  Axios.get(URL + "class/" + id + "/join").then((response) => {
    if (response.data === "fail") {
      alert("문제가 있네요!");
    } else {
      alert("정상적으로 수강 신청했어요!");
      setClass({ classLoaded: false });
    }
  });
};

function Class({
  match: {
    params: { id },
  },
  history,
}) {
  const [_class, setClass] = useState({ classLoaded: false });
  const [tutorName, setTutorName] = useState("");
  const [classState, setClassState] = useState();
  const [classTypeNum, setClassType] = useState();
  const [user, setUser] = useState({ _id: undefined });

  if (_class.classLoaded === false) {
    Axios.get(URL + "class/" + id).then((response) => {
      response.data === "fail" ? history.push("/") : setClass(response.data);
    });
    setClass({ classLoaded: true });
    setTutorName("");
  }

  if (_class._id === id && tutorName === "") {
    Axios.get(URL + "user/" + _class.tutor).then((response) => {
      setTutorName(response.data.nickname);
    });
    setTutorName("Loading");
    setClassState(statesRaw.indexOf(_class.state));
    setClassType(classTypesRaw.indexOf(_class.classType));
  }

  if (user._id === undefined) {
    Axios.get(URL + "auth/isAuthenticated").then((response) => {
      response.data !== "fail" ? setUser(response.data) : setUser({ _id: "" });
    });
    setUser({ _id: "" });
  }
  return (
    <Container className="mt-3">
      <Card bg="light">
        <Card.Body>
          {_class._id === id ? (
            <>
              <h1>{_class.className}</h1>
              <p>
                ClassType : {classTypes[classTypeNum]} Category :{" "}
                {_class.category}
                <br />
                Tutor : {tutorName}
                <br />
                State : {states[classState]}
                <br />
                User : {user._id}
                <br />
                Current / Max : {_class.tutees.length} / {_class.maxTutee}
              </p>
              <Link to={_class._id + "/edit"}>
                <Button>설정하기</Button>
              </Link>
              {_class.tutor === user._id ? (
                <Link>
                  <Button>설정하기</Button>
                </Link>
              ) : classState === 1 ? (
                //강의를 개설할 준비가 되면
                <>
                  <p>내가 튜티네요!</p>
                  <Button
                    onClick={() => {
                      joinClass(_class._id, setClass);
                    }}
                  >
                    참가하기
                  </Button>
                </>
              ) : (
                <Button disabled>완료되었습니다.</Button>
              )}
              <ClassTab
                classInfo={_class}
                userInfo={user}
                classType={classTypeNum}
              />
            </>
          ) : null}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Class;
