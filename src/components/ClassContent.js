import React, { useState } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import Axios from "axios";
import { URL } from "./App";

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

function Attendance({ classType }) {
  return <h1>This is Attendance{classType}</h1>;
}

function QnA() {
  return <h1>This is Question</h1>;
}

function SkypeLink({ skypeLink }) {
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
  return (
    <>
      {LectureNotes.length === 0 ? (
        <h4>아직 수업노트가 없네요!!</h4>
      ) : (
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
      )}
    </>
  );
}

function RealTimeChat() {
  return <h1>This is RealTimeChat</h1>;
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
    <InputGroup as={Row}>
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
      <InputGroup.Append>
        <Button onClick={sendLink}>저장</Button>
      </InputGroup.Append>
    </InputGroup>
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
    <Form.Group as={Row}>
      <Form.Label column sm="2">
        스카이프 공유 링크
      </Form.Label>
      <InputGroup size="lg" as={Col} sm="10">
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setLink(e.target.value)}
        />
        <InputGroup.Append>
          <Button onClick={sendLink}>입력</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
}

function MaxTutee({ classID, classMaxTutee, history }) {
  const tuteeMaxArray = [...Array(11).keys()];
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
    <Form.Group as={Row}>
      <Form.Label column sm="2">
        최대 튜티수 변경
      </Form.Label>
      <InputGroup size="lg" as={Col} sm="10">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">
            현재 : {classMaxTutee}명
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
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
        </FormControl>
        <InputGroup.Append>
          <Button onClick={sendLink}>입력</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
}

function LectureNoteInput({ classID }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const sendLectureNote = () => {
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
    <div>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          강의노트 제목
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={(e) => setTitle(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          강의노트 내용
        </Form.Label>
        <Col sm="10">
          <InputGroup>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={(e) => setContent(e.target.value)}
            />
            <InputGroup.Append>
              <Button onClick={sendLectureNote}>완료</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Form.Group>
    </div>
  );
}

export {
  Overview,
  Attendance,
  QnA,
  SkypeLink,
  SkypeLinkInput,
  LectureNote,
  RealTimeChat,
  VideoLink,
  VideoLinkInput,
  MaxTutee,
  LectureNoteInput,
};
