import React from "react";
import { Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  SkypeLinkInput,
  MaxTutee,
  LectureNoteInput,
} from "../components/ClassContent";

function ClassEdit({
  match: {
    params: { id },
  },
  history,
  user,
  classes,
}) {
  const classInfo = classes.filter((_class) => {
    return _class._id === id;
  })[0];
  console.log(classInfo);
  return (
    <Container>
      <h1>안녕하세요! {user.nickname}</h1>

      {classInfo === undefined ? null : (
        <>
          <h2>강의 : {classInfo.className} 관리페이지입니다.</h2>
          <Form>
            <LectureNoteInput />
            {classInfo.classType === "RealtimeOnlineCourseType" ? (
              <SkypeLinkInput classID={id} />
            ) : null}
            {classInfo.maxTutee === undefined ? null : (
              <MaxTutee classID={id} classMaxTutee={classInfo.maxTutee} />
            )}
          </Form>
        </>
      )}
    </Container>
  );
}

function maptoProp(state) {
  return { user: state.user, classes: state.class };
}

export default connect(maptoProp)(ClassEdit);
