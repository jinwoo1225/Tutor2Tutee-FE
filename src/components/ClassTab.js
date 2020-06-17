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
import Axios from "axios";
import NewChat from "./newChat";
import Rating from "./Rating";

const EditClass = ({ classInfo, tabName, amITutor }) => {
  return (
    amITutor && (
      <Button
        block
        href={"/#/class/id/" + classInfo._id + "/edit"}
        className="mb-3"
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        {tabName} 추가하기
      </Button>
    )
  );
};

function ClassTab({ classInfo, userInfo, classType, amITutor }) {
  //클래스의 탭부분 컴포넌트
  const [key, setKey] = useState("overview");
  return (
    <Card body>
      {userInfo._id === "" ||
      (classInfo.state !== "InProgress" && [0, 1, 3].includes(classType)) ? (
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
            {[0, 3].includes(classType) && (
              <Tab eventKey="attendance" title="출석">
                <Attendance
                  classType={classType}
                  amITutor={amITutor}
                  classID={classInfo._id}
                />
              </Tab>
            )}
            {[0, 2, 3].includes(classType) && (
              <Tab eventKey="lectureNote" title="수업 노트">
                <EditClass
                  classInfo={classInfo}
                  tabName="수업 노트"
                  amITutor={amITutor}
                />
                <LectureNote LectureNotes={classInfo.lectureNotes} />
              </Tab>
            )}
            <Tab eventKey="QnA" title="Q&A">
              <QnA classInfo={classInfo} amITutor={amITutor} />
            </Tab>
            {[0].includes(classType) && (
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
            )}
            {[1].includes(classType) && (
              //온라인 동영상에 한해서 비디오 링크 생성
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
            )}
            {[2].includes(classType) && (
              //온라인 질의응답에 한해서 채팅방 생성
              <Tab eventKey="realTimeChat" title="실시간 채팅방">
                {classInfo.chattingRoom === undefined ? (
                  amITutor ? (
                    <Button
                      block
                      onClick={() => {
                        Axios.get(
                          URL + "class/" + classInfo._id + "/attendance"
                        ).then(({ data }) => {
                          data !== "fail"
                            ? alert("채팅방 개설에 성공했어요!")
                            : alert(
                                "채팅방 개설에 실패했어요, 출석시간이나, 수업을 마감했는지 확인해주세요."
                              );
                        });
                      }}
                    >
                      채팅방 개설
                    </Button>
                  ) : (
                    <h5>아직 채팅방이 개설되지 않았어요!</h5>
                  )
                ) : (
                  <NewChat classInfo={classInfo} userInfo={userInfo} />
                )}
              </Tab>
            )}
            <Tab eventKey="rating" title="평가하기">
              <Rating classInfo={classInfo} amITutor={amITutor} />
            </Tab>
          </Tabs>
        </>
      )}
    </Card>
  );
}

export default ClassTab;
