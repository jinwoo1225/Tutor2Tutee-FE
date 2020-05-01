import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Tab,
  Tabs,
  ProgressBar,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  states,
  statesRaw,
  classTypes,
  classTypesRaw,
  URL,
} from "../components/App";
import Axios from "axios";

function Class({
  match: {
    params: { id },
  },
  history,
}) {
  const [key, setKey] = useState("overview");
  const [_class, setClass] = useState({ classLoaded: false });
  const [tutorName, setTutorName] = useState("");
  const [classState, setClassState] = useState();

  if (_class.classLoaded === false) {
    Axios.get(URL + "class/" + id).then((response) => {
      response.data === "fail" ? history.push("/") : setClass(response.data);
    });
    setClass({ classLoaded: true });
  }

  if (_class._id === id && tutorName === "") {
    Axios.get(URL + "user/" + _class.tutor).then((response) => {
      setTutorName(response.data.nickname);
    });
    setTutorName("Loading");
    setClassState(statesRaw.indexOf(_class.state));
  }

  return (
    <Container>
      <div>
        {_class._id === id ? (
          <>
            <h1>{_class.className}</h1>
            <p>
              ClassType : {classTypes[classTypesRaw.indexOf(_class.classType)]}{" "}
              Category : {_class.category}
              <br />
              Tutor : {tutorName}
              <br />
              State : {states[classState]}
            </p>
            {classState === 1 ? (
              //강의를 개설할 준비가 되면
              <Button>참가하기</Button>
            ) : (
              <Button disabled>완료되었습니다.</Button>
            )}
            <Tabs
              id="controlled-tab"
              activeKey={key}
              onSelect={(e) => setKey(e)}
            >
              <Tab eventKey="overview" title="개요">
                <h2>개요</h2>
                <p>{_class.studyAbout}</p>
                <ul>
                  {_class.courses.map((course) => {
                    return <li key={course._id}> {course.description} </li>;
                  })}
                </ul>
              </Tab>

              {_class.classType !== classTypesRaw[2] ? (
                <Tab eventKey="attendance" title="출결">
                  <h2>현재 진행 상황(60%)</h2>
                  <ProgressBar now={60} />
                </Tab>
              ) : null}

              {_class.classType === classTypesRaw[0] ? (
                //출결
                <Tab eventKey="skypeLink" title="스카이프 링크">
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="스카이프 링크를 이곳에 입력하세요!"
                      aria-label="스카이프 링크를 이곳에 입력하세요!"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary">접수</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Tab>
              ) : null}

              {_class.classType === classTypesRaw[1] ||
              _class.classType === classTypesRaw[2] ? (
                //출결
                <Tab eventKey="realtimeChat" title="실시간 채팅방">
                  <h1>This is Real time chat</h1>
                </Tab>
              ) : null}

              <Tab eventKey="note" title="강의노트">
                <h2>강의노트</h2>
                <p>{_class.lectureNote}</p>
              </Tab>

              <Tab eventKey="question" title="질의응답">
                <h2>질의응답</h2>
                <p>{_class.qna}</p>
              </Tab>
            </Tabs>
          </>
        ) : null}
      </div>
    </Container>
  );
}
function mapStateToProps(state) {
  return { classState: state.class };
}

export default connect(mapStateToProps, null)(Class);
