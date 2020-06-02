import React, { useState } from "react";
import { Tabs, Tab, Card } from "react-bootstrap";
import {
  Overview,
  Attendance,
  QnA,
  SkypeLink,
  VideoLink,
  LectureNote,
  RealTimeChat,
} from "./ClassContent";
    
function ClassTab({ classInfo, userInfo, classType }) {
  const [key, setKey] = useState("overview");
  return (
    <Card>
      <Tabs
        className="my-3 mx-3"
        variant="pills"
        activeKey={key}
        onSelect={(e) => setKey(e)}
      >
        <Tab eventKey="overview" title="개요">
          {/* 개요 */}
          <Overview
            studyAbout={classInfo.studyAbout}
            courses={classInfo.courses}
          />
        </Tab>
        <Tab eventKey="attendance" title="출석">
          <Attendance classType={classType} />
        </Tab>
        <Tab eventKey="lectureNote" title="수업 노트">
          <LectureNote LectureNotes={classInfo.lectureNotes} />
        </Tab>
        <Tab eventKey="QnA" title="Q&A">
          <QnA />
        </Tab>
        {[0].includes(classType) ? (
          <Tab
            eventKey="skypeLink"
            title="스카이프링크"
            className="text-center"
          >
            <SkypeLink classType={classType} skypeLink={classInfo.skypeLink} />
          </Tab>
        ) : null}
        {[1].includes(classType) ? (
          <Tab eventKey="videoLink" title="비디오 링크">
            <VideoLink classType={classType} VideoLinks={classInfo.courses} />
          </Tab>
        ) : null}
        {[1, 2].includes(classType) ? (
          <Tab eventKey="realTimeChat" title="실시간 채팅방">
            <RealTimeChat classInfo={classInfo}/>
          </Tab>
        ) : null}
      </Tabs>
    </Card>
  );
}

export default ClassTab;
