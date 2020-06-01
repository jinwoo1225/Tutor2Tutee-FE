import React from "react";
import { Container } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";

function Register({ history }) {
  //회원가입시 사용되는 라우트
  return (
    <Container>
      <RegisterForm history={history} />
    </Container>
  );
}

export default Register;
