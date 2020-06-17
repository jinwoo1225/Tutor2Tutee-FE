import React from "react";

function ClassInfo({ ClassInfo, classTypeString }) {
  return (
    <div className="text-center">
      <h1>{ClassInfo.className}</h1>
      <h3>{ClassInfo.tutorNickName}</h3>
      <h5>{ClassInfo.basicInfo.description}</h5>
      <hr></hr>
      <p>
        강의타입 : {classTypeString} | 분야 : {ClassInfo.category} | 강의 포인트
        : {ClassInfo.price}포인트
      </p>
      <p>
        현재 수강 중 {ClassInfo.maxTutee && " / 최대 튜티수 "}:
        {" " + ClassInfo.tutees.length}
        {ClassInfo.maxTutee && " / " + ClassInfo.maxTutee}
      </p>
    </div>
  );
}

export default ClassInfo;
