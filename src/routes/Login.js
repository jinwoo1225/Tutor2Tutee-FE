import React from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

function Login({ history }) {
  // 사용자가 로그인을 시도할때 보여지는 라우트
  return (
    <Container>
      {/* 로그인 form */}
      <LoginForm history={history} />
    </Container>
  );
}

export default Login;
