import React from "react";
import Axios from "axios";
import { URL } from "./App";
import { useState } from "react";
import CardForTutor from "./CardClass/CardForTutor";
import { Row } from "react-bootstrap";
import CardForTutee from "./CardClass/CardForTutee";

function CurrentClass({ nickname, user }) {
  const [clAsTutee, setCATutee] = useState(undefined);
  const [clAsTutor, setCATutor] = useState(undefined);
  if (clAsTutee === undefined && clAsTutor === undefined) {
    Axios.get(URL + "user/class/tutee").then((response) => {
      setCATutee(response.data);
    });
    Axios.get(URL + "user/class/tutor").then((response) => {
      setCATutor(response.data);
    });
  }
  return (
    <>
      <h4>안녕하세요! {nickname}</h4>
      지금 수강중인 강의 :
      {clAsTutee === undefined || clAsTutee.length === 0 ? (
        <h1>수강하는 강의가 없네요!!</h1>
      ) : (
        <Row>
          {clAsTutee.map((_class) => {
            return <CardForTutee key={_class._id} _class={_class} />;
          })}
        </Row>
      )}
      <br />
      지금 가르치는 강의 :
      {clAsTutor === undefined || clAsTutor.length === 0 ? (
        <h1>수강하는 강의가 없네요!!</h1>
      ) : (
        <Row>
          {clAsTutor.map((_class) => {
            return <CardForTutor key={_class._id} _class={_class} />;
          })}
        </Row>
      )}
    </>
  );
}

export default CurrentClass;
