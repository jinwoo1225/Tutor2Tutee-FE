import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { URL, checkAuth } from "../components/App";
import Axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen, faKey } from "@fortawesome/free-solid-svg-icons";

function LoginForm({ dispatchUser, history }) {
  const [userID, setUserID] = useState("");
  const [userPW, setPassword] = useState("");
  function enterKey() {
    if (window.event.keyCode === 13) {
      onClickLogin({ dispatchUser, history });
    }
  }

  const onClickLogin = (dispatchUser, history) => {
    //ajax로 날릴 데이터
    Axios.post(URL + "auth/login", { id: userID, password: userPW }).then(
      (res) => {
        console.log(res.data);
        if (res.data === "success") {
          console.log("로그인 성공");
          checkAuth({ dispatchUser });
          history.push("/");
        } else {
          alert("로그인 실패");
        }
      }
    );
  };
  return (
    <Card className="mt-3" bg="light">
      <Card.Body
        className="mt-3 mx-auto text-center"
        style={{ maxWidth: "400px" }}
      >
        <h4 className="text-center">로그인</h4>
        <Form className="mt-md-3">
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelopeOpen} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="이메일"
                onChange={(e) => {
                  setUserID(e.target.value);
                }}
                onKeyUp={enterKey}
              />
              <InputGroup.Append>
                <InputGroup.Text>@hknu.ac.kr</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faKey} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="password"
                placeholder="비밀번호"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyUp={enterKey}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="비밀번호 저장" />
          </Form.Group>
          <Button
            block
            className="my-md-3"
            onClick={() => {
              onClickLogin(dispatchUser, history);
            }}
          >
            로그인
          </Button>
          <p>
            {" "}
            아이디가 없으신가요?
            <span role="img" aria-label="sweat">
              😅
            </span>{" "}
            : <Link to="/user/register">회원가입</Link>
          </p>
        </Form>
      </Card.Body>
    </Card>
  );
}

function mapDispatchToProps(dispatch) {
  return { dispatchUser: (data) => dispatch(updateUser(data)) };
}
export default connect(null, mapDispatchToProps)(LoginForm);
