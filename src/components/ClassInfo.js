import React from "react";

function ClassInfo({ ClassInfo, classTypeString }) {
  return (
    <div className="text-center">
      <h1>{ClassInfo.className}</h1>
      <h3>{ClassInfo.tutorNickName}</h3>
      <h5>{ClassInfo.basicInfo.description}</h5>
      <hr></hr>
      <p>
        강의타입 : {classTypeString} | 분야 : {ClassInfo.category}
      </p>
      <p>
        현재 수강 중{" "}
        {ClassInfo.maxTutee === undefined ? null : " / 최대 튜티수"} :{" "}
        {ClassInfo.tutees.length}
        {ClassInfo.maxTutee === undefined ? null : " / " + ClassInfo.maxTutee}
      </p>
    </div>
  );
}

export default ClassInfo;
