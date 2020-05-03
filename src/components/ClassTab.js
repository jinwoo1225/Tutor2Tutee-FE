import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import { classTypes } from "./App";
import {
  Overview,
  Attendance,
  QnA,
  SkypeLink,
  SkypeLinkInput,
  LectureNote,
  RealTimeChat,
} from "./ClassTabContent";

const classTabTypes = [
  "개요",
  "출석",
  "수업노트",
  "스카이프 링크",
  "비디오 시청",
  "비디오 업로드",
  "Q&A",
  "실시간 채팅방",
  "스카이프 링크 입력",
];
const filteredType = [
  ["개요", "출석", "수업노트", "스카이프 링크", "Qna", "스카이프 링크 입력"],
  ["개요", "출석", "수업노트", "비디오 시청", "비디오 업로드", "Q&A"],
  ["개요", "QnA", "수업노트", "실시간 채팅방"],
  ["개요", "QnA", "수업노트"],
];

function ClassTab({ classInfo, userInfo, classType }) {
  const [key, setKey] = useState("overview");
  const tabType = classTabTypes.filter((classTab) => {
    return filteredType[classType].indexOf(classTab) !== -1;
  });

  console.log(tabType);
  return (
    <>
      <h1>{classTypes[classType]}</h1>
      <Tabs id="controlled-tab" activeKey={key} onSelect={(e) => setKey(e)}>
        <Tab eventKey={classTabTypes[0]} title={classTabTypes[0]}>
          {/* 개요 */}
          <Overview
            studyAbout={classInfo.studyAbout}
            courses={classInfo.courses}
          />
        </Tab>
        <Tab eventKey={tabType[1]} title={tabType[1]}>
          {/* 출석 */}
          <Attendance />
        </Tab>
        <Tab eventKey={tabType[2]} title={tabType[2]}>
          {/* 수업노트 */}
          <LectureNote />
        </Tab>
        <Tab eventKey={tabType[3]} title={tabType[3]}>
          {/* 스카이프 링크 */}
          <SkypeLink />
        </Tab>
        <Tab eventKey={tabType[4]} title={tabType[4]}>
          {/* 비디오 시청 */}
          <SkypeLinkInput />
        </Tab>
        <Tab eventKey={tabType[5]} title={tabType[5]}>
          {/* 비디오 업로드 */}
          <SkypeLinkInput />
        </Tab>
        <Tab eventKey={tabType[6]} title={tabType[6]}>
          {/* 질의응답 게시판 */}
          <QnA />
        </Tab>
        <Tab eventKey={tabType[7]} title={tabType[7]}>
          {/* 실시간 채팅방 */}
          <RealTimeChat />
        </Tab>
        <Tab eventKey={tabType[8]} title={tabType[8]}>
          {/* 스카이프 링크 입력 */}
          <SkypeLinkInput />
        </Tab>
      </Tabs>
    </>
  );
}

export default ClassTab;
