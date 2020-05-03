import React from "react";

function Overview({ studyAbout, courses }) {
  return (
    <>
      <h1 className="text-center mt-3">{studyAbout}</h1>
      <ol>
        {courses.map((course) => {
          return <li key={course._id}>{course.description}</li>;
        })}
      </ol>
    </>
  );
}

function Attendance() {
  return <h1>This is Attendance</h1>;
}

function QnA() {
  return <h1>This is Question</h1>;
}

function SkypeLink() {
  return <h1>This is SkypeLink</h1>;
}

function SkypeLinkInput() {
  return <h1>This is SkypeLinkInput</h1>;
}

function LectureNote() {
  return <h1>This is LectureNote</h1>;
}

function RealTimeChat() {
  return <h1>This is RealTimeChat</h1>;
}

export {
  Overview,
  Attendance,
  QnA,
  SkypeLink,
  SkypeLinkInput,
  LectureNote,
  RealTimeChat,
};
