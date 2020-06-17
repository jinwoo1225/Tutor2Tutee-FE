import React, { useState } from "react";
import Axios from "axios";
import { Button, Form, Row, Col, Card, ButtonGroup } from "react-bootstrap";
import { URL, dateToString } from "./App";

function QnA({ classInfo, amITutor }) {
  const [questionBox, setQuestionBox] = useState(false);
  const [question, setQuestion] = useState("");
  const [_class, setClass] = useState(classInfo);

  const sendQuestion = () => {
    Axios.post(URL + "class/" + _class._id + "/question", {
      content: question,
    }).then(({ data }) => {
      alert("질문 등록이 완료되었습니다.");
      getCurrentClasses();
    });
    setQuestionBox(false);
  };

  const getCurrentClasses = () => {
    Axios.get(URL + "class/" + _class._id).then(({ data }) => {
      setClass(data);
    });
  };

  getCurrentClasses.bind(this);

  return questionBox ? (
    <div className="text-center" style={{ maxWidth: "600px", margin: "auto" }}>
      <h3 className="text-center">질문 작성</h3>
      <Form.Control
        as="textarea"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button onClick={sendQuestion} block>
        제출하기
      </Button>
    </div>
  ) : (
    <div className="text-center" style={{ maxWidth: "600px", margin: "auto" }}>
      {amITutor ? null : (
        <Button
          className="my-3"
          block
          onClick={() => {
            setQuestionBox(true);
          }}
        >
          질문하기
        </Button>
      )}
      {_class.qnas.length ? ( //불러오기에 성공하면 //
        <>
          {_class.qnas.map(({ question, _id, answer }, index) => {
            return (
              <div key={question._id}>
                <Row>
                  <Card body as={Col}>
                    <Row>
                      <Col>
                        <p>
                          Q{index + 1}:{question.content}
                          <br />
                          질문자 : <Nickname userID={question.Writer} />
                          <br />
                          작성일 : {dateToString(new Date(question.createdAt))}
                        </p>
                      </Col>
                      {amITutor ? (
                        <Answer
                          isAnswered={answer === undefined}
                          qid={_id}
                          _class={_class}
                          getCurrentClasses={getCurrentClasses}
                        />
                      ) : null}

                      <Col md="12">
                        <hr />
                        {answer === undefined ? (
                          <p>아직 답변이 없습니다.</p>
                        ) : (
                          <p>
                            A : {answer.content}
                            <br />
                            작성일 : {dateToString(new Date(answer.createdAt))}
                          </p>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </Row>
              </div>
            );
          })}
        </>
      ) : (
        <h5 className="text-center">아직 등록된 질문이 없습니다.</h5>
      )}
    </div>
  );
}

function Answer({ qid, _class, getCurrentClasses, isAnswered }) {
  const [isClicked, setIsClicked] = useState(false);
  const [answer, setAnswer] = useState("");

  const sendAnswer = (qid) => {
    Axios.post(URL + "class/" + _class._id + "/question/" + qid, {
      qid,
      content: answer,
    }).then(({ data }) => {
      alert("답변이 등록 완료되었습니다.");
      getCurrentClasses();
      setIsClicked(false);
    });
  };

  return isClicked ? (
    <Col md="12">
      <Form.Control as="textarea" onChange={(e) => setAnswer(e.target.value)} />
      <ButtonGroup className="mt-md-3">
        <Button onClick={() => sendAnswer(qid)}>답변완료</Button>
        <Button onClick={() => setIsClicked(false)}>취소</Button>
      </ButtonGroup>
    </Col>
  ) : (
    <Col md="3">
      <Button
        block
        style={{ height: "100%" }}
        onClick={() => setIsClicked(true)}
      >
        {isAnswered ? "답변하기" : "답변수정"}
      </Button>
    </Col>
  );
}

function Nickname({ userID }) {
  const [nickname, setNickname] = useState(undefined);

  if (nickname === undefined) {
    Axios.get(URL + "user/" + userID).then(({ data }) => {
      setNickname(data.nickname);
    });
  }

  return nickname === undefined ? "Loading" : nickname;
}

export default QnA;
