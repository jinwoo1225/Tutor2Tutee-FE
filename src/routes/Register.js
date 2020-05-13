import React, { useState } from "react";
import { Container, Row, InputGroup, Form, Button } from "react-bootstrap";
import { URL } from "../components/App";
import Axios from "axios";

function Register({ history }) {
  const [webmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = () => {
    const data =
      "username=" +
      username +
      "&password=" +
      password +
      "&nickname=" +
      nickname +
      "&webmail=" +
      webmail +
      "@hknu.ac.kr";
    Axios.post(URL + "user", data).then((response) => {
      if (response.data === "Create Successfully") {
        alert("등록에 성공했어요!!");
        history.push("/user/login");
      } else {
        alert("등록에 실패했어요.. 잘못된게 있나 확인해주세요!");
      }
    });
  };

  return (
    <Container>
      <h1>This is Register Page</h1>
      <Row>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="아이디 정해주세요!"
            aria-label="아이디 정해주세요!"
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호는 임의로 정해주세요."
            aria-label="비밀번호는 임의로 정해주세요."
          />
        </Form.Group>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>이메일</Form.Label>
          <InputGroup>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="이메일 입력해주세요!"
              aria-label="이메일 입력해주세요!"
              aria-describedby="email-addon"
            />
            <InputGroup.Append>
              <InputGroup.Text id="email-addon">@hknu.ac.kr</InputGroup.Text>
              <Button>이메일 인증</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>별명</Form.Label>
          <Form.Control
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="별명 정해주세요!"
            aria-label="별명 정해주세요!"
          />
        </Form.Group>
      </Row>
      <Button onClick={() => onSubmit()}>회원가입</Button>
    </Container>
  );
}

export default Register;
