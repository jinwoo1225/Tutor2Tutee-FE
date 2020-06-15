import React from "react";
import { Button, Container } from "react-bootstrap";

function ClassJoin({
  ClassInfo,
  UserInfo,
  classState,
  classTypeNum,
  amITutor,
  amIGuest,
  startClass,
  joinClass,
  quitClass,
}) {
  return (
    <div style={{ margin: "auto", maxWidth: "400px" }}>
      {/* 내가 튜터일때! */}
      {amITutor && (
        <TutorMenu
          ClassInfo={ClassInfo}
          classState={classState}
          classTypeNum={classTypeNum}
          startClass={startClass}
        />
      )}
      {/* 내가 게스트인 경우 */}
      {amIGuest && <GuestMenu />}
      {/* 내가 튜터도 아니고 게스트도 아닐때 */}
      {!(amIGuest || amITutor) && (
        <UserMenu
          ClassInfo={ClassInfo}
          classState={classState}
          UserInfo={UserInfo}
          joinClass={joinClass}
          quitClass={quitClass}
        />
      )}
    </div>
  );
}

function TutorMenu({ ClassInfo, classState, classTypeNum, startClass }) {
  return (
    <>
      <Button
        block
        className="my-3"
        href={"#/class/id/" + ClassInfo._id + "/edit"}
      >
        강의설정하기
      </Button>

      {[1].includes(classState) && [0, 3].includes(classTypeNum) && (
        <Button className="my-3" block onClick={startClass}>
          강의 마감하기
        </Button>
      )}
    </>
  );
}

function GuestMenu() {
  return (
    <p className="text-center">
      이 강의를 듣고 싶다면 <a href="/#/user/login">로그인</a> 하세요!
    </p>
  );
}

function UserMenu({ ClassInfo, classState, UserInfo, joinClass, quitClass }) {
  return ![3].includes(classState) ? (
    UserInfo.classesAsTutee.includes(ClassInfo._id) ? (
      <Button block className="my-3" onClick={quitClass}>
        그만두기
      </Button>
    ) : (
      <Button block className="my-3" onClick={joinClass}>
        {ClassInfo.className} 참가하기
      </Button>
    )
  ) : null;
}

export default ClassJoin;
