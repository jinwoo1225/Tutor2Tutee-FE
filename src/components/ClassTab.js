import React, { useState } from "react";
import { Tabs, Tab, Card, Button } from "react-bootstrap";
import {
  Overview,
  Attendance,
  SkypeLink,
  VideoLink,
  LectureNote,
} from "./ClassContent";
import QnA from "./QnA";
import Chat from "./Chat";
import { Link } from "react-router-dom";

function ClassTab({ classInfo, userInfo, classType, amITutor }) {
  //클래스의 탭부분 컴포넌트
  const [key, setKey] = useState("overview");
  return (
    <Card>
      {userInfo._id === "" ? (
        //유저가 로그인 되어있지 않다면
        <Overview
          studyAbout={classInfo.studyAbout}
          courses={classInfo.courses}
        />
      ) : (
        //로그인 되어있으면 해당하는 컴포넌트를 보여줌
        <>
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
            {amITutor ? null : (
              <Tab eventKey="attendance" title="출석">
                <Attendance classType={classType} />
              </Tab>
            )}
            <Tab eventKey="lectureNote" title="수업 노트">
              {amITutor ? (
                <Link to={"./" + classInfo._id + "/edit"}>
                  <Button block>강의노트 추가하기</Button>
                </Link>
              ) : null}
              <LectureNote LectureNotes={classInfo.lectureNotes} />
            </Tab>
            <Tab eventKey="QnA" title="Q&A">
              <QnA classInfo={classInfo} amITutor={amITutor} />
            </Tab>
            {[0].includes(classType) ? (
              <Tab
                eventKey="skypeLink"
                title="스카이프링크"
                className="text-center"
              >
                <SkypeLink
                  classType={classType}
                  skypeLink={classInfo.skypeLink}
                />
              </Tab>
            ) : null}
            {[1].includes(classType) ? (
              <Tab eventKey="videoLink" title="비디오 링크">
                <VideoLink
                  classType={classType}
                  VideoLinks={classInfo.courses}
                />
              </Tab>
            ) : null}
            {[1, 2].includes(classType) ? (
              <Tab eventKey="realTimeChat" title="실시간 채팅방">
                <Chat classInfo={classInfo} />
              </Tab>
            ) : null}
          </Tabs>
        </>
      )}
    </Card>
  );
}

export default ClassTab;
