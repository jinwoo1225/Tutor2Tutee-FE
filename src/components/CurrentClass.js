import React from "react";
import Axios from "axios";
import { URL } from "./App";
import { useState } from "react";
import CardForTutor from "./CardClass/CardForTutor";
import { Row, Card } from "react-bootstrap";
import CardForTutee from "./CardClass/CardForTutee";

function CurrentClass({ nickname }) {
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
    <Card body bg="light">
      {clAsTutee === undefined || clAsTutee.length === 0 ? (
        <h3 className="text-center">
          아직 수강하신 강의가 없습니다. 아래에서 골라주실까요?
        </h3>
      ) : (
        <Card body>
          <h5 className="text-center">
            지금 수강중인 강의 {clAsTutee.length}개
          </h5>
          {clAsTutee.map((_class) => {
            return <CardForTutee key={_class._id} _class={_class} />;
          })}
        </Card>
      )}
      <br></br>

      {clAsTutor === undefined || clAsTutor.length === 0 ? (
        <h3 className="text-center">
          아직 개설하신 강의가 없습니다.{"  "}
          <a href="/#/class/new">첫번째 강의, 만들어 보시겠어요?</a>
        </h3>
      ) : (
        <Card body>
          <h5>지금 가르치는 강의 {clAsTutor.length}개</h5>
          {clAsTutor.map((_class) => {
            return <CardForTutor key={_class._id} _class={_class} />;
          })}
        </Card>
      )}
    </Card>
  );
}

export default CurrentClass;
