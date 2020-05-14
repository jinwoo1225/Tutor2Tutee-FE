import React from "react";

function CurrentClass({ nickname, classesAsTutor, classesAsTutee }) {
  return (
    <>
      <h4>안녕하세요! {nickname}</h4>
      지금 수강중인 강의 :
      <br />
      지금 가르치는 강의 : ...
    </>
  );
}

export default CurrentClass;
