import React from "react";

const weeks = ["월", "화", "수", "목", "금", "토", "일"];
const weeksRaw = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function ClassInfo({ ClassInfo, classTypeString }) {
  let startTime;
  let endTime;
  if (ClassInfo.lectureTimes.length !== 0) {
    startTime = ClassInfo.lectureTimes[0].start.toString();
    endTime = ClassInfo.lectureTimes[0].finish.toString();
  }

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
      {ClassInfo.lectureTimes.length !== 0 && (
        <p>
          강의 시간 :{" "}
          {ClassInfo.lectureTimes.map((time, index) => {
            return (
              weeks[weeksRaw.indexOf(time.day)] +
              (index === ClassInfo.lectureTimes.length - 1 ? "" : ", ")
            );
          })}
          {" | " +
            startTime.substring(0, 2) +
            "시 " +
            startTime.substring(2) +
            "분부터 " +
            endTime.substring(0, 2) +
            "시" +
            endTime.substring(2) +
            "분까지"}
        </p>
      )}
      {ClassInfo.place !== "" && <p>수업 장소 : {ClassInfo.place}</p>}
      <p>
        현재 수강 중 {ClassInfo.maxTutee && " / 최대 튜티수 "}:
        {" " + ClassInfo.tutees.length}
        {ClassInfo.maxTutee && " / " + ClassInfo.maxTutee}
      </p>
    </div>
  );
}

export default ClassInfo;
