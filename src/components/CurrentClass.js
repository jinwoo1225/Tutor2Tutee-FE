import React from "react";
import CardShow from "../components/CardShow";
import Axios from "axios";
import { URL } from "./App";
import { useState } from "react";

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
      {clAsTutee === undefined || clAsTutee === [] ? (
        <h1>수강하는 강의가 없네요!!</h1>
      ) : (
        <ol>
          {clAsTutee.map((_class) => {
            console.log(_class);
            return <CardShow _class={_class} col={12} />;
          })}
        </ol>
      )}
      <br />
      지금 가르치는 강의 :
      {clAsTutor === undefined || clAsTutor === [] ? (
        <h1>수강하는 강의가 없네요!!</h1>
      ) : (
        <ol>
          {clAsTutor.map((_class) => {
            console.log(_class);
            return <CardShow _class={_class} col={12} />;
          })}
        </ol>
      )}
    </>
  );
}

export default CurrentClass;
