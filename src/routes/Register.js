import React from "react";
import { Container } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";

function Register({ history }) {
  return (
    <Container>
      <RegisterForm history={history} />
    </Container>
  );
}

export default Register;
