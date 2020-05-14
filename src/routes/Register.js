import React, { useState } from "react";
import { Container } from "react-bootstrap";

import { URL } from "../components/App";
import RegisterForm from "../components/RegisterForm";
import Axios from "axios";

function Register() {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
}

export default Register;
