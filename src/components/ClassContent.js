import React, { useState } from "react";
import { InputGroup, FormControl, Button, Form, Card } from "react-bootstrap";
import Axios from "axios";
import { URL } from "./App";

//클래스 관련 컴포넌트 모음집

function Overview({ studyAbout, courses }) {
  //클래스의 개요 컴포넌트
  return (
    <>
      <h1 className="text-center mt-3">{studyAbout}</h1>
      <ol>
        {courses.map((course) => {
          //코스 정보를 표시
          return <li key={course._id}>{course.description}</li>;
        })}
      </ol>
    </>
  );
}

function Attendance({ classType }) {
  //출석 정보 표시
  return <h1>This is Attendance{classType}</h1>;
}

function SkypeLink({ skypeLink }) {
  //스카이프 링크 표시
  //온라인 실시간 강의 전용
  return (
    <>
      {skypeLink === undefined ? (
        <h4>Skype 링크가 아직 없어요! 잠시만 기다려주세요~~</h4>
      ) : (
        <a href={skypeLink}>
          <Button>Link to Skype Call</Button>
        </a>
      )}
    </>
  );
}

function LectureNote({ LectureNotes }) {
  //강의 노트
  return LectureNotes.length === 0 ? (
    <h4>아직 수업노트가 없네요!!</h4>
  ) : (
    // 수업노트가 존재할 경우
    <ol>
      {LectureNotes.map((lectureNote) => {
        return (
          <li key={lectureNote._id}>
            <h4>{lectureNote.title}</h4>
            <p>{lectureNote.content}</p>
          </li>
        );
      })}
    </ol>
  );
}

function VideoLink({ VideoLinks }) {
  return (
    <ol>
      {VideoLinks.map((link) => {
        return (
          <li>
            <a href={link.link}>{link.description}</a>
          </li>
        );
      })}
    </ol>
  );
}
function VideoLinkInput({ classID }) {
  //동영상 강의 링크 업로드
  const [description, setDesc] = useState("");
  const [link, setLink] = useState("");
  const sendLink = () => {
    Axios.post(URL + "class/" + classID + "/course", {
      link,
      description,
    }).then((response) => console.log(response));
  };
  return (
    <Card className="mt-3">
      <Card.Title className="text-center mt-3">
        <h2>온라인 강의 등록</h2>
      </Card.Title>
      <Card.Subtitle className="text-center">
        강의는 유튜브 링크로 대체해주세요
      </Card.Subtitle>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>온라인 강의 등록</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            className="col-3"
            placeholder="강의 제목"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
          <Form.Control
            className="col-9"
            placeholder="강의 링크"
            type="text"
            onChange={(e) => setLink(e.target.value)}
          />
        </InputGroup>
        <Button className="mt-3" block onClick={sendLink}>
          저장
        </Button>
      </Card.Body>
    </Card>
  );
}
function SkypeLinkInput({ classID }) {
  const [link, setLink] = useState("");
  const sendLink = () => {
    Axios.post(URL + "class/" + classID + "/skype", {
      skypeLink: link,
    }).then((response) => console.log(response));
  };
  return (
    <Card className="mt-3">
      <Card.Title className="mt-3 text-center">
        <h2>스카이프 링크 입력</h2>
      </Card.Title>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>스카이프 공유 링크</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setLink(e.target.value)}
          />
        </InputGroup>
        <Button className="mt-3" block onClick={sendLink}>
          입력
        </Button>
      </Card.Body>
    </Card>
  );
}

function MaxTuteeInput({ classID, classMaxTutee, history }) {
  const tuteeMaxArray = [...Array(10).keys()];
  const [maxTutee, setMaxTutee] = useState(classMaxTutee);
  const sendLink = () => {
    Axios.post(URL + "class/" + classID + "/max-tutee", { maxTutee }).then(
      (res) => {
        alert(res.data);
        history.push("/");
      }
    );
  };
  return (
    <Card className="mt-3">
      <Card.Title className="text-center mt-3">
        <h3>최대 튜티수 변경</h3>
      </Card.Title>
      <Card.Body>
        <InputGroup className="mt-3">
          <InputGroup.Prepend>
            <InputGroup.Text>현재 : {classMaxTutee}명</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as="select"
            onChange={(e) => {
              setMaxTutee(e.target.value);
            }}
          >
            {tuteeMaxArray.map((tuteeMax, index) => {
              return (
                <option key={index} value={tuteeMax + 3}>
                  {tuteeMax + 3}
                </option>
              );
            })}
          </Form.Control>
        </InputGroup>
        <Button className="mt-3" block onClick={sendLink}>
          완료
        </Button>
      </Card.Body>
    </Card>
  );
}

function LectureNoteInput({ classID }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const sendLectureNote = () => {
    if (title === "" || content === "") {
      alert("강의노트 모든란을 채워주세요.");
    }
    Axios.post(URL + "class/" + classID + "/lecture-note", {
      title,
      content,
    }).then((res) => {
      res.data === "success"
        ? alert("강의노트 추가에 성공했어요!")
        : alert("강의노트 추가에 실패했어요...");
    });
  };

  return (
    <Card className="mt-3">
      <Card.Title className="text-center mt-3">
        <h3>수업노트 추가</h3>
      </Card.Title>
      <Card.Subtitle className="text-center">
        수업노트의 내용 창은 우측하단을 눌러서 확장이 가능해요!!
      </Card.Subtitle>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>수업노트 제목</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            placeholder="노트 제목"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mt-3">
          <InputGroup.Prepend>
            <InputGroup.Text>수업노트 내용</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            placeholder="노트 내용"
            as="textarea"
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />
        </InputGroup>
        <Button className="mt-3" block onClick={sendLectureNote}>
          저장
        </Button>
      </Card.Body>
    </Card>
  );
}

export {
  Overview,
  Attendance,
  SkypeLink,
  SkypeLinkInput,
  LectureNote,
  VideoLink,
  VideoLinkInput,
  MaxTuteeInput,
  LectureNoteInput,
};
