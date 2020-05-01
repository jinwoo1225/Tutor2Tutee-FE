import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Tab, Tabs, ProgressBar } from "react-bootstrap";
import { classTypes, classTypesRaw, URL } from "../components/App";
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
            </p>
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
                //출결
                <Tab eventKey="attendance" title="출결">
                  <h2>현재 진행 상황(60%)</h2>
                  <ProgressBar now={60} />
                </Tab>
              ) : null}

              {_class.classType === classTypesRaw[0] ? (
                //출결
                <Tab eventKey="skypeLink" title="스카이프 링크">
                  <input placeholder="스카이프 링크를 입력하세요!"></input>
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
