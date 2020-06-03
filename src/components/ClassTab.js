import React, { useState } from "react";
import { Tabs, Tab, Card, Button } from "react-bootstrap";
import {
  Overview,
  Attendance,
  SkypeLink,
  VideoLinks,
  LectureNote,
} from "./ClassContent";
import QnA from "./QnA";
import Chat from "./Chat";
import { Link } from "react-router-dom";

const EditClass = (classInfo, tabName, amITutor) => {
  return amITutor ? (
    <Link to={"./" + classInfo._id + "/edit"}>
      <Button block>{tabName} 링크 추가하기</Button>
    </Link>
  ) : null;
};

function ClassTab({ classInfo, userInfo, classType, amITutor }) {
  //클래스의 탭부분 컴포넌트
  const [key, setKey] = useState("overview");

  return (
    <Card body>
      {userInfo._id === "" ||
      (!userInfo.classesAsTutee.includes(classInfo._id) &&
        classInfo.state !== "InProgress" &&
        [0, 3].includes(classType) &&
        !amITutor) ? (
        //유저가 로그인 되어있지 않다면 || 수강하지 않았다면 ||
        //강의가 시작되지 않았다면 && 온라인실시간 또는 오프라인 질의응답 && 내가 튜터가 아니라면
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
            {[0, 3].includes(classType) ? (
              <Tab eventKey="attendance" title="출석">
                <Attendance
                  classType={classType}
                  amITutor={amITutor}
                  classID={classInfo._id}
                />
              </Tab>
            ) : null}
            {[0, 2, 3].includes(classType) ? (
              <Tab eventKey="lectureNote" title="수업 노트">
                <EditClass
                  classInfo={classInfo}
                  tabName="강의 노트 추가"
                  amITutor={amITutor}
                />
                <LectureNote LectureNotes={classInfo.lectureNotes} />
              </Tab>
            ) : null}
            <Tab eventKey="QnA" title="Q&A">
              <QnA classInfo={classInfo} amITutor={amITutor} />
            </Tab>
            {[0].includes(classType) ? (
              <Tab
                eventKey="skypeLink"
                title="스카이프링크"
                className="text-center"
              >
                <EditClass
                  classInfo={classInfo}
                  tabName="스카이프 링크"
                  amITutor={amITutor}
                />
                <SkypeLink
                  classType={classType}
                  skypeLink={classInfo.skypeLink}
                />
              </Tab>
            ) : null}
            {[1].includes(classType) ? (
              <Tab eventKey="videoLink" title="비디오 링크">
                <EditClass
                  classInfo={classInfo}
                  tabName="비디오 링크"
                  amITutor={amITutor}
                />
                <VideoLinks
                  classID={classInfo._id}
                  participations={classInfo.participations}
                  VideoLinks={classInfo.courses}
                  userID={userInfo._id}
                />
              </Tab>
            ) : null}
            {[2].includes(classType) ? (
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
