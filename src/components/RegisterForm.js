import React, { useState, useEffect } from "react";

import { URL } from "../components/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEnvelopeOpenText,
  faKey,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { InputGroup, Form, Button, Card, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

function RegisterForm({ history }) {
  const [MAJORLIST, setMAJORLIST] = useState(undefined);
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState("");
  const [reAuthTime, setReAuthTime] = useState(180);
  const [sented, setSented] = useState(false);
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    Axios.get(URL + "search/list/category")
      .then(({ data }) => {
        console.log(data);
        setMAJORLIST(() => {
          return data;
        });
      })
      .catch(({ error }) => console.log(error));
  }, []);

  function sendEmail() {
    Axios.post(URL + "auth/sendEmail", { email }).then((response) => {
      alert("이메일을 확인해주세요!" + response.data);
    });

    setSented(true);
    setTimer();
  }

  function checkEmail() {
    Axios.post(URL + "auth/authEmail", { email, authNum }).then((res) => {
      res.data === "fail"
        ? alert("인증에 실패했어요.")
        : alert("인증에 성공했습니다.");
    });
  }

  const setTimer = () => {
    let a = reAuthTime - 1;
    setReAuthTime(a);
    const timer = setInterval(() => {
      setReAuthTime(a);
      if (a === 0) {
        setReAuthTime(180);
        clearInterval(timer);
      }
      a--;
    }, 1000);
  };
  function sendRegisterInfo() {
    Axios.post(URL + "user", { id: email, password, nickname, major }).then(
      (res) => {
        if (res.data === "fail") alert("오류가 발생했어요.");
        else {
          console.log("회원가입에 성공했습니다. 홈으로 돌아갑니다.");
          history.push("/");
        }
      }
    );
  }

  return (
    <Card className="mt-3" bg="light">
      <Card.Body
        className="mt-3 mx-auto text-center"
        style={{ maxWidth: "400px" }}
      >
        <h4>회원가입</h4>
        <Form>
          <FormGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="이메일을 알려주세요"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>@hknu.ac.kr</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            {email.length === 0 || reAuthTime !== 180 ? (
              <Button block disabled>
                {reAuthTime === 180
                  ? "메일 인증"
                  : reAuthTime + "초 후에 다시 시도해주세요!!"}
              </Button>
            ) : (
              <Button block onClick={sendEmail}>
                메일 인증
              </Button>
            )}
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelopeOpenText} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="인증번호 확인"
                type="text"
                onChange={(e) => setAuthNum(e.target.value)}
              />
              <InputGroup.Append>
                {sented ? (
                  <Button onClick={checkEmail}>확인</Button>
                ) : (
                  <Button disabled>확인</Button>
                )}
              </InputGroup.Append>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faKey} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="비밀번호는 영문과 숫자를 섞어주세요. 😄"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUserGraduate} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <select
                className="custom-select"
                onChange={(e) => 
                  setMajor(MAJORLIST[e.target.value].cID)
                }
              >
                <option>학과를 골라주세요.</option>
                {MAJORLIST === undefined
                  ? null
                  : MAJORLIST.map((major, index) => {
                      return (
                        <option key={index} value={index}>
                          {major.representation}
                        </option>
                      );
                    })}
              </select>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUserTie} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="별명을 골라주시겠어요? 😎"
                type="text"
                onChange={(e) => setNickname(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Button block onClick={sendRegisterInfo}>
              회원 가입
            </Button>
          </FormGroup>
          <p className="text-center">
            계정이 있으신가요?<Link to="/user/login"> 로그인 </Link>
          </p>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RegisterForm;
