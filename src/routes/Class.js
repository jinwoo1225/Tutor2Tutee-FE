import React, { useState } from "react";
import Axios from "axios";
import { Container, Button, Card, Form, InputGroup } from "react-bootstrap";
import ClassTab from "../components/ClassTab";

import {
  states,
  statesRaw,
  classTypes,
  classTypesRaw,
  URL,
} from "../components/App";
import { Link } from "react-router-dom";

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
  const [attenCode, setAttenCode] = useState("");

  if (_class.classLoaded === false) {
    Axios.get(URL + "class/" + id).then((response) => {
      if (response.data === "fail") {
        history.push("/");
      } else {
        setClass(response.data);
        setClassState(statesRaw.indexOf(response.data.state));
        console.log(response.data);
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

  function startAttendance() {
    Axios.get(URL + "class/" + id + "/attendance").then((response) => {
      setAttenCode(response.data);
      alert("출석이 시작되었습니다!" + response.data);
    });
  }

  function getAttendance() {
    Axios.post(URL + "class/" + id + "/attendance", { auth: attenCode }).then(
      (response) => {
        alert(response.data);
      }
    );
  }

  function startClass() {
    Axios.get(URL + "class/" + id + "/start").then((response) => {
      alert(response.data);
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
                Tutor : {_class.tutorNickName}
                <br />
                State : {states[classState]}
                <br />
                User : {user._id}
                <br />
                Current / Max : {_class.tutees.length} / {_class.maxTutee}
              </p>

              {_class.tutor === user._id ? (
                // 내가 튜터 이면
                <>
                  <Link to={_class._id + "/edit"}>
                    <Button>설정하기</Button>
                  </Link>
                  <Button onClick={startAttendance}>출석하기</Button>
                  {[1].includes(classState) ? (
                    <Button onClick={startClass}>강의 마감하기</Button>
                  ) : null}
                </>
              ) : user._id === "" ? null : [3].includes(classState) ? ( //게스트인 경우
                // 내가 튜티이면
                //강의를 개설할 준비가 되면
                <>
                  <p>내가 튜티네요!</p>
                  {user.classesAsTutee.includes(_class._id) ? (
                    //유저가 수강 중인 수업일 경우
                    classTypeNum !== undefined &&
                    [0, 3].includes(classTypeNum) ? (
                      //온라인 실시간 수업 || 오프라인 일 경우의 인증번호받는 시스템이 필요
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>인증번호</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          placeholder="인증번호는 튜터에게 물어보세요!!"
                          onChange={(e) => setAttenCode(e.target.value)}
                        ></Form.Control>
                        <InputGroup.Append>
                          <Button onClick={getAttendance}>출석 시작</Button>
                        </InputGroup.Append>
                      </InputGroup>
                    ) : null
                  ) : null}
                </>
              ) : (
                <>
                  <p>내가 튜티네요!</p>
                  {user.classesAsTutee.includes(_class._id) ? null : (
                    <Button onClick={joinClass}>
                      {_class.className} 참가하기
                    </Button>
                  )}
                </>
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
