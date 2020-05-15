import React from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

function Login({ history }) {
  return (
    <Container>
      <LoginForm history={history} />
    </Container>
  );
}

export default Login;
