import React, { useState } from "react";
import jQuery from "jquery";
import { Form, Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login, updateUser } from "../store";
import { URL, checkAuth } from "../components/App";

function Login({ dispatchUser, history }) {
  const [userID, setUserID] = useState("");
  const [userPW, setPassword] = useState("");
  function enterKey() {
    if (window.event.keyCode === 13) {
      onClickLogin();
    }
  }

  const onClickLogin = () => {
    //ajax로 날릴 데이터
    const data = "username=" + userID + "&password=" + userPW;

    jQuery.ajax({
      type: "POST",
      url: URL + "auth/login",
      data: data,
      dataType: "text",
      success: (res) => {
        if (res === "success") {
          console.log("로그인 성공");
          checkAuth({ dispatchUser });
          history.push("/");
        } else {
          alert("로그인 실패");
        }
      },
      error: (xhr) => {
        console.log(xhr);
      },
    });
  };

  return (
    <Container>
      <Form className="mt-md-3">
        <Form.Group>
          <Form.Label>아이디</Form.Label>
          <Form.Control
            placeholder="아이디"
            onChange={(e) => {
              setUserID(e.target.value);
            }}
            onKeyUp={enterKey}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyUp={enterKey}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="비밀번호 저장" />
        </Form.Group>
        <Button className="my-md-3" onClick={onClickLogin}>
          로그인
        </Button>
        <p>
          {" "}
          아이디가 없으신가요?
          <span role="img" aria-label="sweat">
            😅
          </span>{" "}
          :{" "}
          <Link to="/user/register">
            <Button className="btn-light">회원가입</Button>
          </Link>
        </p>
      </Form>
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dlogin: (data) => dispatch(login(data)),
    dispatchUser: (data) => dispatch(updateUser(data)),
  };
}

export default connect(null, mapDispatchToProps)(Login);
