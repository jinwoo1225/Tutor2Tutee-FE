import React, { useState } from "react";
import Axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import { URL } from "./App";

function QnA({ classInfo, amITutor }) {
  const [questionBox, setQuestionBox] = useState(false);
  const [question, setQuestion] = useState("");
  const [_class, setClass] = useState(classInfo);

  const sendQuestion = () => {
    Axios.post(URL + "class/" + _class._id + "/question", {
      content: question,
    }).then(({ data }) => {
      alert(data);
    });
    getCurrentClasses();
    setQuestionBox(false);
  };

  const getCurrentClasses = () => {
    Axios.get(URL + "class/" + _class._id).then(({ data }) => {
      console.log(data);
      setClass(data);
    });
  };

  getCurrentClasses.bind(this);

  return questionBox ? (
    <>
      <h3 className="text-center">질문 작성</h3>
      <Form.Control
        as="textarea"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button onClick={sendQuestion} block>
        제출하기
      </Button>
    </>
  ) : (
    <>
      {amITutor ? null : (
        <Button
          block
          onClick={() => {
            setQuestionBox(true);
          }}
        >
          질문하기
        </Button>
      )}
      {_class.qnas.length ? ( //불러오기에 성공하면 //
        <ol>
          {_class.qnas.map(({ question, _id, answer }) => {
            return (
              <li key={question._id}>
                <Row>
                  <Col>
                    <p>
                      {question.content}
                      <br />
                      {question.Writer}
                      <br />
                      {question.createdAt}
                    </p>
                  </Col>
                  {amITutor ? (
                    <Answer
                      qid={_id}
                      _class={_class}
                      getCurrentClasses={getCurrentClasses}
                    />
                  ) : null}
                  {answer === undefined ? null : (
                    <Col md="12">
                      <p>
                        {answer.content}
                        <br />
                        {answer.createdAt}
                      </p>
                    </Col>
                  )}
                </Row>
              </li>
            );
          })}
        </ol>
      ) : (
        <h1>아직 등록된 질문이 없습니다.</h1>
      )}
    </>
  );
}

function Answer({ qid, _class, getCurrentClasses }) {
  const [isClicked, setIsClicked] = useState(false);
  const [answer, setAnswer] = useState("");
  const sendAnswer = (qid) => {
    Axios.post(URL + "class/" + _class._id + "/question/" + qid, {
      qid,
      content: answer,
    }).then(({ data }) => {
      alert(data);
      getCurrentClasses();
      setIsClicked(false);
    });
  };

  return isClicked ? (
    <Col md="12">
      <Form.Control as="textarea" onChange={(e) => setAnswer(e.target.value)} />
      <Button onClick={(e) => sendAnswer(qid)}>답변완료</Button>
    </Col>
  ) : (
    <Col md="3">
      <Button block onClick={(e) => setIsClicked(true)}>
        답변하기
      </Button>
    </Col>
  );
}

export default QnA;
